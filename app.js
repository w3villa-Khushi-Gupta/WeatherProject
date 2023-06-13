import { log } from 'console';
import express from 'express'
import https from 'https'
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get('/', function(req,res){
    res.sendFile('/home/khushi/node & express/WeatherProject/index.html')
    // res.send("hello")

});

app.post('/', function(req, res){
    console.log(req.body.cityName)
    const apiKey ="097e66c7c90c14339b9bf4da26ff8eb7"
    const place = req.body.cityName
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + place + "&units="+ unit
    https.get(url, function(response){
        // console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const des =  weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.write("<h1>The temperature today in " +place+ " is " + temp + "deg celcius</h1>")
            res.write("<p>Description: " + des + "</p>");
            res.write("<img src =" + iconURL + ">")
            res.send()
                    
            // console.log(temp)
            // console.log(des)
        })
    })

})

app.listen(3000, function(){
    console.log("server is running at localhost:3000")
    
})
// console.log(__dirname)
// 097e66c7c90c14339b9bf4da26ff8eb7

// // res.send("First view")
