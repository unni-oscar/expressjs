var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var student = require('./routes/student');
var ejs = require('ejs');
var expressValidators = require('express-validator');
//Initialize app
var app= express();

//middleware for view 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//middle ware for public folder
app.use(express.static(path.join(__dirname, 'public')));

// Make it availabe globally
app.use(function(req,res,next){
    res.locals.errors = null;
    res.locals.students = null;
    next();
})

//express validator middleware
app.use(expressValidators({
    errorFormatter:function(param,msg,value){
        var namespace = param.split('.'),
        root=namespace.shift(),
        formParam=root;
        while(namespace.length) {
            formParam+='[' + namespace.shift() + ']';
        }
        return{
            param:formParam,
            msg:msg,
            value, value 
        }; 
    }
    
}));

// Middleware for routes
app.use('/', student);

//Create port and listen on it
app.set('port', (process.env.PORT||3000));
app.listen(app.get('port'), function(err){
    if(err) throw err;
    console.log('Server is listening on port:' + app.get('port') );
});