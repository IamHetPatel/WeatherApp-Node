// const http = require("http");
// const fs = require("fs");

// var requests = require("requests");

// const homeFile = fs.readFileSync("index.html", "utf-8");

// const replaceVal = (tempVal, orgVal) => {
//   let temperature = tempVal.replace("{%tempVal%}", orgVal.main.temp)
//   temperature = tempVal.replace("{%tempMax%}", orgVal.main.temp_max)
//   temperature = tempVal.replace("{%tempMin%}", orgVal.main.temp_min)
//   temperature = tempVal.replace("{%location%}", orgVal.name)
//   temperature = tempVal.replace("{%country%}", orgVal.sys.country)
//   temperature = tempVal.replace("{%tempstatus%}", orgVal.weather[0].main)
//   return temperature;
// };

// const server = http.createServer((req, res) => {
//   if ((req.url = "/")) {
//     requests(
//       "https://api.openweathermap.org/data/2.5/weather?q=VADODARA&appid=be9c1e2379822222620543461e2b4d4e",
//     )
//       .on('data', (chunk) => {
//         const objData = JSON.parse(chunk);
//         const arrayData = [objData];
//         // console.log(arrayData[0].main.temp);
//         const realTimeData = arrayData
//           .map((val) => replaceVal(homeFile, val))
//           .join("");
//         res.write(realTimeData);
//       })
//       .on("end", (err) => {
//         if (err) return console.log("connection closed due to errors", err);
//         res.end();
//       });
//   }
// });

// server.listen(3000, "127.0.0.1");

const http = require("http");
const fs = require("fs");
var requests = require("requests");


const homefile = fs.readFileSync("index.html", "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temperature =  tempVal.replace("{%tempVal%}", orgVal.main.temp-273.15)
    temperature =  temperature.replace("{%tempMin%}", orgVal.main.temp_min-273.15)
    temperature =  temperature.replace("{%tempMax%}", orgVal.main.temp_max-273.15)
    temperature =  temperature.replace("{%location%}", orgVal.name)
    temperature =  temperature.replace("{%country%}", orgVal.sys.country)
    temperature =  temperature.replace("{%tempstatus%",orgVal.weather[0].main)
    return temperature;
}

const server = http.createServer((req,res) => {
    if(req.url == "/"){
        requests(
            "https://api.openweathermap.org/data/2.5/weather?q=vadodara&appid=b9c4cb773ae8592fca2298cc0799f511"
        ,)
        .on('data', (chunk) => {
            const objdata = JSON.parse(chunk);
            const arrdata = [objdata];
            //console.log(Math.floor(arrdata[0].main.temp - 273));
            const realTimeData = arrdata.map((val) => replaceVal(homefile,val)).join("");
            //res.write(realTimeData);
            res.write(realTimeData);
        })
        .on('end',(err) =>{
        if (err) return console.log('connection closed due to errors', err);
        
        console.log('end');
        });
    }
    else
    {
        res.end("File not found")
    }

});

server.listen(5500);