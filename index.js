var express = require('express'),
	port = 3000,
	knex = require('knex'),
	bookshelf = require('bookshelf'),
	app = express();

//database setup
var db_config = knex(require('./knexfile').development);
var bookshelf = bookshelf(db_config);
app.set('bookshelf', bookshelf);

// user model setup
var User = bookshelf.Model.extend({
	tableName: 'users'
});

/* app.get('/', function(req, res){
	console.log(app.get('bookshelf'));
	res.send('hello world');
}); */

app.get('/new', function(req, res){
	var user = new User({ email: 'foo@bar.com' });
	user.save().then(function(){ res.send(user); });
});

app.get('/', function(req, res){
	User.fetchAll().then(function(data){res.send(data); });
});

var server = app.listen(port, function(){
	console.log('listening on port %d ', server.address().port);
});

/* 

QUESTION: I know that when I write 'require(knex)' 
this file will go into the node_modules folder and
retrieve the 'knex' folder. My question is about 'require(bookshelf)'.
Bookshelf is a dependency of knex, and there is no bookshelf folder.
How does this file know where to access bookshelf?




*/