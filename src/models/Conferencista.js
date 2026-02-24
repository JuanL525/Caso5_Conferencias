import mongoose from "mongoose";

const conferencistaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },

    apellido:{
        type:String,
        default:null,
        trim:true
    },

    cedula:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    genero:{
        type:String,
        default:null,
        trim:true
    },

    ciudad:{
        type:String,
        default:null,
        trim:true
    },

    direccion:{
        type:String,
        default:null,
        trim:true
    },

    fecha_nacimiento:{
        type:Date,
        default:true
    },

    telefono:{
        type:String,
        default:null,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    empresa:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})

const Conferencista = mongoose.model('Conferencista', conferencistaSchema);
export default Conferencista;