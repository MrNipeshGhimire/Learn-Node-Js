const express = require('express');
let mongoose = require('mongoose');
const enquiryModel = require('./models/enquiry.model');
require('dotenv').config();

let app = express();
app.use(express.json());

//insert api
app.post('/api/enquiry-insert',(req,res)=>{

    const {name, email, phone, message} = req.body;

    let data = new enquiryModel({
        name:name,
        email:email,
        phone:phone,
        message:message,
    })
    data.save().then(()=>{
        res.send({status:1, msg:"Data inserted successfully"});
    }).catch((err)=>{
        res.send({status:0,msg:"Error inserting data",error:err})
        console.log("Error:"+err)
    })  
})

//view api
app.get("/api/enquiry-view",async(req,res)=>{
    let data =await enquiryModel.find();
    res.send({
        status:1,
        data
    })
})

//delete api
app.delete("/api/delete/:id",async(req,res)=>{
    // const {id} = req.params;
    const id = req.params.id;   // this is also another method for getting id

    console.log(id)
    // const fetchData =await enquiryModel.findOne({_id:id});
    const deleteData = await enquiryModel.deleteOne({_id:id})
    console.log(deleteData)
    res.send({status:1,deleteData})
})

//Update API operation
app.put("/api/enquiry-update/:id",async(req,res)=>{
    const id = req.params.id;
    //fetch the targeted data to be update
    const fetchData = await enquiryModel.findOne({_id:id})

    const reqData={}
    const {name,email,phone,message} = req.body;
    if(name){
        reqData["name"] = name;
    }
    if(email){
        reqData["email"] = email;
    }
    if(phone){
        reqData["phone"] = phone;
    }
    if(message){
        reqData["message"] = message;
    }
    const updateData = await enquiryModel.updateOne({_id:id},{$set:reqData})
    
        res.send({
            status:1,
            msg:"Data updated",
            updateData
        })
    

})

//connect to MongoDB
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,()=>{
        console.log("Server is running on Port"+process.env.PORT)
    })
})


