const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const apiKey = "6b17288aaea97dce3043f203d50af2f4";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      console.log(temp);
      const descrip = weatherData.weather[0].description;
      console.log(descrip);
      const image = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+image+"@2x.png";
      res.write("<h1>The temperature in "+ query +" is "+temp+" Degrees Celcius.</h1>");
      res.write("<h3>Weather description is "+descrip+" .</h3>");
      res.write("<img src="+imageUrl+">");
      res.send();
      const object = {
        name: "Faisal",
        favouriteFood: "Burger"
      }
      console.log(JSON.stringify(object));
    });

  });
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
