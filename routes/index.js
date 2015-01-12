var express = require('express');
var router = express.Router();
var db = require('../modules/records').init("data/messenger.db");
// CREATE SESSION
var loadUserFromSession = function(req,res,next){
	req.session.userEmail && function (){
		if(req.session.userEmail){
			req.user = req.session.userEmail;
			res.locals.user = req.session.userEmail;
		}else{
			delete req.session.userEmail;
		}
	};
	next();		
};

var requireLogin = function(req,res,next){
	req.session.userEmail? next(): res.redirect('/login');
};

// router.use(loadUserFromSession);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/registration', function (req, res) {
	res.render('registration');
});

router.post('/registration', function (req, res) {
	var data = {
		email: req.body.email,
		password: req.body.pwd
	};

	db.register(data, function (error) {
		res.redirect('dashboard');
	});
});

router.get('/dashboard', function (req, res){
	res.render('dashboard');
});

module.exports = router;
