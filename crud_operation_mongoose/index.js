const express = require('express');
let mongoose = require('mongoose');
const enquiryModel = require('./models/enquiry.model');
require('dotenv').config();

let app = express();
app.use(express.json());

app.post('/enquiry',(req,res)=>{

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

//connect to MongoDB
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,()=>{
        console.log("Server is running on Port"+process.env.PORT)
    })
})


