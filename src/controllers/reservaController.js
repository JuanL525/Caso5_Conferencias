import Reserva from '../models/Reserva.js';

const agregarReserva = async(req,res) => {
    const {codigo} = req.body;
    const existeReserva = await Reserva.findOne({codigo});

    if(existeReserva){
        return res.status(400).json({msg:'Esa reserva ya existe'});
    }

    try{
        const reserva = new Reserva(req.body);
        await reserva.save();
        res.json({msg: 'Reserva registrada con exito', ...reserva._doc});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al agregar una reserva'});
    }
}

const verReservas = async(req,res) => {
    try{
        const reservas = await Reserva.find()
            .populate('id_conferencista', 'nombre apellido cedula email empresa')
            .populate('id_auditorio', 'codigo nombre capacidad descripcion');
        res.json(reservas);
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al ver obtener las reservas'});
    }
}

const verReserva = async(req,res) => {
    const {id} = req.params;

    try{
        const reserva = await Reserva.findById(id)
            .populate('id_conferencista', 'nombre apellido cedula email empresa' )
            .populate('id_auditorio', 'codigo nombre capacidad descripcion');
        if(!reserva){
            return res.status(404).json({msg:'Esa reserva no existe'});
        }
        res.json(reserva);
    } catch(error){
        console.log(error);
        res.status(400).json({msg: 'Error al obtener la reserva'});
    }
}

const actualizarReserva = async(req,res) => {
    const {id} = req.params;
    const reserva = await Reserva.findById(id);

    if(!reserva){
        return res.status(404).json({msg: 'La reserva no existe'});
    }

    if(req.body.codigo && req.body.codigo !== reserva.codigo){
        const existeCodigo = await Reserva.findOne({codigo: req.body.codigo});
        if(existeCodigo){
            return res.status(400).json({msg: 'Esa reserva ya existe'});
        }
    }

    reserva.codigo = req.body.codigo || reserva.codigo;
    reserva.descripcion = req.body.descripcion || reserva.descripcion;
    reserva.id_conferencista = req.body.id_conferencista || reserva.id_conferencista;
    reserva.id_auditorio = req.body.id_auditorio || reserva.id_auditorio;


    try{
        const reservaAlmacenada = await reserva.save();
        res.json(reservaAlmacenada)
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al actualizar la reserva'});
    }
};

const eliminarReserva = async(req,res) => {
    const {id} = req.params;
    try{
        const reserva = await Reserva.findById(id);
        if(!reserva){
            return res.status(404).json({msg:'No se encontró la reserva'});
        }
        await reserva.deleteOne();
        res.json({msg:'Reserva eliminada con exito'});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al eliminar la reserva'});
    }
}

export{
    agregarReserva,
    verReserva,
    verReservas,
    actualizarReserva,
    eliminarReserva
}