var location = process.argv[2];
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(location);

var runAllQuery = function () {
	var runQuery = function (query) {
		console.log(query);
		db.run(query, function (error) {
			if(error) {
				console.log(error);
				process.exit(1);
			}
		});
	};

	[
		"create table if not exists user(u_id integer not null primary key autoincrement, email varchar not null unique, password varchar);",
		"create table if not exists conversation(id integer not null primary key autoincrement, user_one integer not null, user_two not null, ip varchar default null, time integer, foreign key(user_one) references user(u_id), foreign key(user_two) references user(u_id));",
		"create table if not exists conversation_reply(cr_id integer not null primary key autoincrement, message varchar,user_id integer not null, ip varchar not null, c_id intiger not null, foreign key(user_id) references user(u_id), foreign key(c_id) references conversation(id))"
	].forEach(runQuery);
};

db.serialize(runAllQuery);