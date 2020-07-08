const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");

process.env['NODE_TLS_REJECT_UNAUTHORIZED']= 0;

const app=express();
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server started at port 3000");
});


app.get("/",function(req,res){
    res.sendFile(__dirname+ "/signup.html");
});

// app.get("/styles.css", function (req, res) {
//   res.sendFile(__dirname + "/styles.css");
// });
// app.get("/images/baking-1293986_960_720.jpg", function (req, res) {
//   res.sendFile(__dirname + "/images/baking-1293986_960_720.jpg");
// });



app.post("/",function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const result="First Name: "+fname+"\nLast Name: " +lname+"\nEmail: "+email;
    console.log(result);
    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
              FNAME:fname,
              LNAME:lname
          }
        }
      ]
    };
    const signdetails=JSON.stringify(data);
    const url = process.env.URL;
    const options = {
      method: "POST",
      auth: process.env.API_KEY,
    };


    const request= https.request(url, options ,function(response) {
        response.on("data",function(data){
            console.log(JSON.parse(data));
          
        });
       
        
      if (response.statusCode === 200) {
       res.sendFile(__dirname+"/success.html");
      }
      else
        res.sendFile(__dirname+"/failure.html")
    });
    
    

     request.write(signdetails);
     request.end();
});


app.post("/failure",function(req,res){
  res.redirect("/");
});
// e723be00af6bd3ee6a9b6ed0ef402461 - us8;




// 