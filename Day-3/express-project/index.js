let express = require("express")

//assign express() method in app
let app = express()
app.use(express.json())

app.get("/",(req, res)=>{
    res.send({status:1,msg:"This is Home Page API"})
})

app.get("/news",(req,res)=>{
    res.send({status:1,msg:"News API"})
})

//using Params
app.get("/news/:id",(req,res)=>{
    let currentId = req.params.id
    res.send({status:1,Current_Id:currentId})
})

app.post("/login",(req,res)=>{
    console.log(req.body)
    console.log(req.query)
    res.send({status:1,msg:"Login API",data:req.body, QueryData:req.query})
})

app.listen("8000")

