var express=require('express');
var body_parser=require('body-parser');
var getRoute=require('./api/get.js');
var registerRoute=require('./api/register.js');
var loginRoute=require('./api/login.js');
var updateRoute=require('./api/update.js');
var deleteRoute=require('./api/delete.js');

var app=express();
app.listen(3000);
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use('/user',getRoute);
app.use('/register',registerRoute);
app.use('/login',loginRoute);
app.use('/update',updateRoute);
app.use('/delete',deleteRoute);
