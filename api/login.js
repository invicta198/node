var mongodb=require('mongodb');
var express=require('express');

var app=express();

var router=express.Router();
var MongoClient=mongodb.MongoClient;
var url='mongodb://localhost:27017';

MongoClient.connect(url, { useUnifiedTopology: true },{useNewUrlParser:true},function(err,client){
	if(err)
		console.log('unable to connect mongodb server');
	else{
        router.post('/', (request,response)=>{
          var post_data=request.body;
    			var password=post_data.password;
    			var email=post_data.email;
					if(checkValidity(email,password)){
	          client.db('data').collection('user').find({email:email},{projection:{email:1,password:1}}).toArray(function(error,result){
								if(error)  response.json(error);
							  else{
	                  if(result.length==0)  response.json('invalid details');
										else if(result[0]['password']!=password)  response.json('Login fail');
										else    response.json('Login success');
								}
						});
					}
					else{
						response.json("error in credentials");
					}
      });
    }
  });
function checkValidity(email,password){
	if(email===undefined||email===null||email==="null"||email.length<1)	return false;
	if(password===undefined||password===null||password==="null"||password.length<1)	return false;
	if(phone===undefined||phone===null||phone==="null"||phone.length<1)	return false;
	return true;
}
module.exports=router;
