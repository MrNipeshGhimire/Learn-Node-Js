let express = require("express")
const { dbConnection } = require("./dbConnection")
const { ObjectId } = require("mongodb")

let app = express()

app.use(express.json())

app.get("/student-read",async(req,res)=>{
    let myDB = await dbConnection()
    let studentCollection = myDB.collection("students")
    let data = await studentCollection.find().toArray();
    let resObj ={
        status:1,
        msg: "Students Data",
        data
    }
    console.log(resObj)
    res.send(resObj)
})

app.post("/student-insert",async(req,res)=>{

    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")

    // let obj = {
    //     name : req.body.name,
    //     email : req.body.email,
    // }

    let {name,email}=req.body;
    let obj = {name,email};
    
    let insertRes = await studentCollection.insertOne(obj);

    let resObj = {
        status :1,
        msg : "Data Inserted Successfully",
        insertRes
    }

    console.log(resObj)

    res.send("Student Insert API")
})

app.delete("/delete/:id",async(req,res)=>{
    let {id} = req.params;
    console.log(id)
    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students")

    let deleteDate = await studentCollection.deleteOne({_id:new ObjectId(id)})

    let resObj ={
        status:1,
        msg: "Data Delete Successfully",
        deleteDate
    }
    console.log(resObj)

    res.send("Delete API")

})

app.listen("8000")
