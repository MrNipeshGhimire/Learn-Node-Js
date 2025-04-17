let http = require("http")
const { json } = require("stream/consumers")

let server = http.createServer((req,res)=>{

    //routing in node js
    if(req.url =="/news"){
       let obj = {
        status:1,
        data :[
            {
                newsTitle:"Online Khabar",
                newsData:"This is Online Khabar news"
            },
            {
                newsTitle:"Purbeli News",
                newsData:"This is Purbeli News info"
                
            }
        ]
       }
       res.end(JSON.stringify(obj))
    }

    if(req.url == "/")

    res.end("Welcome to Node js")
    
})

server.listen("8000")  //http://localhost:8000