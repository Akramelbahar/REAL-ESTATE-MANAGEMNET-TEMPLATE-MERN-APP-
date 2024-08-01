import mongoose from "mongoose";

const advertismentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    surface: {
        type: Number,
        required: false,
    },
    pcs: {
        type: Number,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    adresse: {
        type: String,
        required: true,
    },
    pictures: [{
        type: String,
        required: true,
        default: []
    }],
    diagnostic: {
        type: String,
        required: false,
    },
    equipment: [{
        type: String,
        required: false,
    }],
    seen: [{
        type: String,
        required: true,
        default: []
    }], 
    createdBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true ,
        
    }

}, { timestamps: true });
const Advertisment = mongoose.model('Advertisment', advertismentSchema);
export default Advertisment ;
