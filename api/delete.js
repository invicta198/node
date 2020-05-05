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
        router.delete('/', (request,response)=>{
          var post_data=request.body;
    			var password=post_data.password;
    			var email=post_data.email;
					var query={email:email,password:password}
					client.db('data').collection('user').deleteOne(query, function(error,result){
							console.log(result);
              if(error)  response.json(error);
						  else{
								if(result.result.n==1)	response.json("delete success");
								else 	response.json("delete fail");
							}
					});
      });
    }
  });
module.exports=router;
