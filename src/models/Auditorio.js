import mongoose from "mongoose";

const auditorioSchema =  mongoose.Schema({
    codigo:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },

    nombre:{
        type:String,
        required:true,
        trim:true
    },

    ubicacion:{
        type:String,
        required:true,
        trim:true
    },

    capacidad:{
        type:Number,
        required:true,
        default:0
    },

    descripcion:{
        type:String,
        default:null,
        trim:true
    }
},
{
    timestamps:true
});

const Auditorio = mongoose.model('Auditorio', auditorioSchema);
export default Auditorio;