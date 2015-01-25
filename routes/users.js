var express = require('express');
var router = express.Router();
var db = require('../modules/records').init("data/messenger.db");

// requre login middleware

var requireLogin = function(req,res,next){
	req.session.userEmail? next(): res.redirect('/login');
};

/* GET users listing. */
router.get('/dashboard', requireLogin, function (req, res){

	db.getUsers(function (error, list) {
		res.render('dashboard', {list: list, email: req.session.userEmail});
	});
});

router.get('/message/:id', requireLogin, function (req, res) {
	db.getUserName(req.params.id, function (error, name) {
		db.getConversation({friend_id: req.params.id, usr_email: req.session.userEmail}, function (err, messages){
			res.render('message', {name: req.session.userEmail, friend_name: name.email, friend_id: req.params.id, messages: messages.reverse()});
		});
	});
});

router.post('/send/:id', requireLogin, function (req, res) {
	var convoData = {
		msg: req.body.msg,
		friend_id: req.params.id,
		usr_email: req.session.userEmail,
		time: new Date().toLocaleDateString(),
		ip: 'something'
	};

	db.insertConversation(convoData, function (error) {
		res.redirect('/message/' + req.params.id);
	});
});

module.exports = router;
