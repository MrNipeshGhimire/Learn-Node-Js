const express = require("express");
const {dbConnection } = require("./dbConnection")

const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Index page")
    
})

app.post("/insert",async(req,res)=>{    //async means asynchronous , it don't finish immediately

    const db = await dbConnection();
    const studentCollection = db.collection("student");
    
    const {name, email} = req.body;  //destructuring the name and email
    console.log(name,email)

    const existEmail = await studentCollection.findOne({email})

    if(existEmail==null){
        insertData = await studentCollection.insertOne({name,email})

        let insertObj ={
            status:1,
            msg: "Data inserted successfully",
            insertData
        };
        console.log(insertObj);
        res.send(insertObj);
    }else{
        let insertObj ={
            status:0,
            msg: "Email already exists"
        };
        console.log(insertObj);
        res.send(insertObj);
    }

})


app.listen("8000")
