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
		"create table if not exists conversation(id integer not null primary key autoincrement, user_one integer not null, user_two not null, ip varchar default null, time integer, message varchar, foreign key(user_one) references user(u_id), foreign key(user_two) references user(u_id));"
	].forEach(runQuery);
};

db.serialize(runAllQuery);