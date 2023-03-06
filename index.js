const http = require("http");
const fs = require("fs");

var requests = require("requests");

const homeFile = fs.readFileSync("index.html", "utf-8");

const replaceVal = (tempVal,orgVal) =>{
  let temperature = tempVal.replace("{%tempVal%}",orgVal.main.temp)
   temperature = tempVal.replace("{%tempMax%}",orgVal.main.temp_max)
   temperature = tempVal.replace("{%tempMin%}",orgVal.main.temp_min)
   temperature = tempVal.replace("{%location%}",orgVal.name)
   temperature = tempVal.replace("{%country%}",orgVal.sys.country)

   return temperature;
}
const server = http.createServer((req, res) => {
  if ((req.url = "/")) {
    requests("https://api.openweathermap.org/data/2.5/weather?q=VADODARA&appid=be9c1e2379822222620543461e2b4d4e")
      .on("data", function (chunk) {
        const objData = JSON.parse(chunk);
        const arrayData = [objData];
        // console.log(arrayData[0].main.temp);
        const realTimeData = arrayData.map((val) => replaceVal(homeFile,val));
          res.write(realTimeData);
        })
        .on("end", function (err) {
            if (err) return console.log("connection closed due to errors", err);
            res.end();
        });
   
  }
});

server.listen(5500,"127.0.0.1");
