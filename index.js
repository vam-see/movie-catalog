var reqExpress = require("express");
var movieExpress = reqExpress();

var movieReq = require("request");
var queryURL = "http://www.omdbapi.com/?s=";

movieExpress.use(reqExpress.static("public"));

movieExpress.set("view engine", "ejs");

movieExpress.get("/", function(req, res){
    res.render("index.ejs");
});

movieExpress.get("/results", function(req, res){
    var mTitle = req.query.mTitle;
    var mYear = req.query.mYear;
    var url = queryURL+mTitle+"&y="+mYear;
    movieReq(url, function(error, response, body){
       if (!error && response.statusCode == 200) {
           var mData = JSON.parse(body);
           if (mData["Search"] != null) {
                res.render("results.ejs", {mData : mData});      
           }
           else{
                res.render("error.ejs");      
           }
       }
    });
});

movieExpress.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started in listening mode..."); 
});