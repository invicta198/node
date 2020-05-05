var mongodb=require('mongodb');
var express=require('express');

var app=express();

var router=express.Router();
var MongoClient=mongodb.MongoClient;
var url='mongodb://localhost:27017';

MongoClient.connect(url,{useUnifiedTopology: true },{useNewUrlParser:true},function(err,client){
	if(err)
		console.log('unable to connect mongodb server');
	else{
        router.post('/', (request,response)=>{
					var post_data=request.body;
    			var password=post_data.password;
    			var email=post_data.email;
					var phone=post_data.phone;
					var bankbalance=15000;
					console.log(typeof(email));
					console.log(typeof(password));
					console.log(typeof(phone));
					if(checkValidity(email,password,phone)){
							client.db('data').collection('user').find({email:email}).toArray(function(error,result){
									if(error)	console.log(error);
									else{
										if(result.length!=0)	response.json("user already exists");
										else console.log("unique email");
									}
							});
							var insertJson={
		    				'email':email,
		    				'password':password,
		    				'phone':phone,
								'name':"",
								'adhaar':"",
								'dateofbirth':"",
								'bankname':"",
								'bankaccount':"",
								'bankifsc':"",
								'bankbalance':bankbalance,
		            'group':[]
		    			};
							client.db('data').collection('user').insertOne(insertJson,function(err,res){
		    					response.json('Register success');
		    					console.log('Register sucess');
		    			});
					}
					else {
						response.json("error in credentials");
					}
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
