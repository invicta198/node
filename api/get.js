var mongodb=require('mongodb');
var express=require('express');

var app=express();

var router=express.Router();
var MongoClient=mongodb.MongoClient;
var url='mongodb://localhost:27017';

MongoClient.connect(url,{useUnifiedTopology:true },{useNewUrlParser:true},function(err,client){
	if(err)
		console.log('unable to connect mongodb server');
	else{
        router.get('/', (request,response)=>{
          var post_data=request.query;
    			var password=post_data.password;
    			var email=post_data.email;
					if(checkValidity(email,password,phone)){
	          var query={email:email,password:password}
						client.db('data').collection('user').findOne(query, function(error,result){
								if(error)  response.json(error);
	              else  response.json(result);
						});
					}
					else{
						response.json("error in credentials");
					}
      });
      router.get('/:getID', (request,response)=>{
        console.log(request.params.getID);
        response.send('getID success');
      });
    }
  });
function checkValidity(email,password,phone){
	if(email===undefined||email===null||email==="null"||email.length<1)	return false;
	if(password===undefined||password===null||password==="null"||password.length<1)	return false;
	if(phone===undefined||phone===null||phone==="null"||phone.length<1)	return false;
	return true;
}
module.exports=router;
