import mongoose from "mongoose";

const reservaSchema = mongoose.Schema({
    codigo:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    descripcion:{
        type:String,
        default:null,
        trim:true
    },

    id_conferencista:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Conferencista',
        required:true
    },

    id_auditorio:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Auditorio',
        required:true
    }
},
{
    timestamps:true
});

const Reserva = mongoose.model('Reserva', reservaSchema);
export default Reserva;