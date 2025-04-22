const { default: mongoose } = require('mongoose');
var mongooose = require('mongoose');

let userEnquirySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});

let enquiryModel = mongooose.model("enquiry",userEnquirySchema);
module.exports = enquiryModel;