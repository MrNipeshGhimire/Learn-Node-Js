const express = require("express");
const {dbConnection } = require("./dbConnection");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

app.get("/",async(req,res)=>{

    const db = await dbConnection();
    const studentCollection = db.collection("student");

    const fetchData = await studentCollection.find().toArray();

    if(fetchData.length ==0){
        console.log("No student records found");
        let obj ={
            msg: "No Student records found"
        }
        res.send(obj)
    }else{
        let fetchObj = {
            status:1,
            msg: "Data",
            fetchData
        }
        console.log(fetchObj);
        res.send(fetchObj)
    }
    

    try{

    }catch(err){
        console.log(err)
        res.send(err)
    }
    
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

//update api
app.put("/update/:id",async(req,res)=>{

    const db = await dbConnection();
    const studentCollection = db.collection("student");
    const {id} = req.params;

    const objField ={}
    const {name,email} = req.body;

    if(name!=="" && name!==undefined && name!==null){
        objField["name"] = name;
    }

    if(email!=="" && email!==undefined && email!==null){
        objField["email"] = email;
    }

    updateData =await studentCollection.updateOne({_id:new ObjectId(id)},{$set:objField})
        objData ={
            status:1,
            msg: "Data updated successfully",
            updateData
        }
        console.log(objData)
        res.send(objData)
})

app.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    console.log(id)

    const db = await dbConnection();
    const studentCollection = db.collection("student");

    try{
        deleteData = await studentCollection.deleteOne({_id:new ObjectId(id)})
        const deleteObj = {
            status:1,
            msg: "Data deleted successfully",
            deleteData
        }
        console.log(deleteObj)
        res.send(deleteData)

    }catch(err){
        console.log(err);
        res.send(err);
    }
})


app.listen("8000")
