var sqlite3 = require("sqlite3").verbose();

var insertQueryMaker = function (tableName, data, fields) {
	var columns = fields && ' (' + fields.join(', ') + ')' || '';
	var values = '"' + data.join('", "') + '"';
	var query = 'insert into ' + tableName + columns + ' values(' + values + ');';
	return query;
};

var selectQueryMaker = function (tableName, retrivalData, where) {
	retrivalData = retrivalData || ['*'];
	var whatToGet = retrivalData.join(', ');
	var whereToGet = where && retrieveWhereToGet(where) || '';

	var query = 'select ' + whatToGet + ' from ' + tableName + whereToGet + ';';
	return query;
};

var retrieveWhereToGet = function (resource) {
	var whereToGet = Object.keys(resource).map(function (key) {
		return key + ' = "' + resource[key] + '"';
	}).join(' and ');

	return ' where ' + whereToGet;
};

var insertInto = function (db, fields, data, tableName, onComplete) {
	var query = insertQueryMaker(tableName, data, fields);
	db.run(query, onComplete);
};


var select = function (db, onComplete, tableName, retriveMethod, retrivalData, where) {
	var query = selectQueryMaker(tableName, retrivalData, where);
	db[retriveMethod](query, onComplete);
};

var _register = function (data, db, onComplete) {
	var fields = ['email', 'password'];
	var passingData = [data.email, data.password];
	insertInto(db, fields, passingData, 'user', onComplete);
};

var _getPassword = function (email, db, onComplete) {
	var whereToGet = {email: email};
	select(db, onComplete, 'user', 'get', ['password'], whereToGet);
};

var _getUsers = function (db, onComplete) {
	var retrivalData = ['email', 'u_id'];
	select(db, onComplete, 'user', 'all', retrivalData);
};

var _getUserName = function (id, db, onComplete) {
	var whereToGet = {u_id: id};
	select(db, onComplete, 'user', 'get', ['email'], whereToGet);
};

var _insertConversation = function (data, db, onComplete) {
	var query = selectQueryMaker('user', ['u_id'], {email: data.usr_email});
	var callback = function (getIdErr, id) {
		var fields = ['user_one', 'user_two', 'ip', 'time', 'message'];
		var passingData = [id.u_id, data.friend_id, data.ip, data.time, data.msg];
		insertInto(db, fields, passingData, 'conversation', onComplete);
	};

	db.get(query, callback);
};

var _getConversation = function (info, db, onComplete) {
	var idSelectQuery = selectQueryMaker('user', ['u_id'], {email: info.usr_email});
	
	var callback = function (err, data) {		
		var messageQuery = "select message, user_one, user_two, time from conversation where (user_one = '" + 
				data.u_id + "' and user_two = '" + info.friend_id + "') or (user_one = '" +
				info.friend_id + "' and user_two = '" + data.u_id + "');"
		
		db.all(messageQuery, onComplete);
	};

	db.get(idSelectQuery, callback);
};

var init = function(location){	
	var operate = function(operation){
		return function(){
			var onComplete = (arguments.length == 2)?arguments[1]:arguments[0];
			var arg = (arguments.length == 2) && arguments[0];

			var onDBOpen = function(err){
				if(err){onComplete(err);return;}
				db.run("PRAGMA foreign_keys = 'ON';");
				arg && operation(arg,db,onComplete);
				arg || operation(db,onComplete);
				db.close();
			};
			var db = new sqlite3.Database(location,onDBOpen);
		};	
	};

	var records = {
		register: operate(_register),
		getPassword: operate(_getPassword),
		getUsers: operate(_getUsers),
		getUserName: operate(_getUserName),
		insertConversation: operate(_insertConversation),
		getConversation: operate(_getConversation)
	};
	return records;
};

exports.init = init;
