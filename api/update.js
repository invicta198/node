var mongodb=require('mongodb');
var express=require('express');

var app=express();

var router=express.Router();
var MongoClient=mongodb.MongoClient;
var url='mongodb://localhost:27017';

MongoClient.connect(url,{useUnifiedTopology:true},{useNewUrlParser:true},function(err,client){
	if(err)
		console.log('unable to connect mongodb server');
	else{
        router.put('/', (request,response)=>{
					var phone="";
					var name="";
					var adhaar="";
					var dateofbirth="";
					var post_data=request.body;
          var password=post_data.password;
    			var email=post_data.email;
          phone=post_data.phone;
    			name=post_data.name;
    			adhaar=post_data.adhaar;
          dateofbirth=post_data.dateofbirth;
          var query={email:email, password:password};
          var newvalues={$set:{phone:phone,name:name,adhaar:adhaar,dateofbirth:dateofbirth}};
          client.db('data').collection('user').updateOne(query, newvalues, function(error,result){
              if(error)  response.json(error);
						  else{
                  if(result.result.nModified==1)   response.json('updation success');
									else     response.json('updation fail');
							}
					});
      });
    }
  });
module.exports=router;
