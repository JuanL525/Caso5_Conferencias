import Conferencista from "../models/Conferencista.js";

const agregarConferencista = async(req,res) => {
    const {cedula} = req.body;
    const existeConferencista = await Conferencista.findOne({cedula});

    if(existeConferencista){
        return res.status(400).json({msg:'Ese conferencista ya existe'});
    }

    try{
        const conferencista = new Conferencista(req.body);
        await conferencista.save();
        res.json({msg: 'Conferencista registrado con exito', ...conferencista._doc});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al agregar un conferencista'});
    }
}

const verConferencistas = async(req,res) => {
    try{
        const conferencistas = await Conferencista.find();
        res.json(conferencistas);
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al ver obtener los conferencistas'});
    }
}

const verConferencista = async(req,res) => {
    const {id} = req.params;

    try{
        const conferencista = await Conferencista.findById(id);
        if(!conferencista){
            return res.status(404).json({msg:'Ese conferencista no existe'});
        }
        res.json(conferencista);
    } catch(error){
        console.log(error);
        res.status(400).json({msg: 'Error al obtener al conferencista'});
    }
}

const actualizarConferencista = async(req,res) => {
    const {id} = req.params;
    const conferencista = await Conferencista.findById(id);

    if(!conferencista){
        return res.status(404).json({msg: 'La conferencia no existe'});
    }

    if(req.body.cedula && req.body.cedula !== conferencista.cedula){
        const existeCedula = await Conferencista.findOne({cedula: req.body.cedula});
        if(existeCedula){
            return res.status(400).json({msg: 'Esa cedula pertenece a otro conferencista'});
        }
    }

    conferencista.nombre = req.body.nombre || conferencista.nombre;
    conferencista.apellido = req.body.apellido || conferencista.apellido;
    conferencista.cedula = req.body.cedula || conferencista.cedula;
    conferencista.genero = req.body.genero || conferencista.genero;
    conferencista.ciudad = req.body.ciudad || conferencista.ciudad
    conferencista.direccion = req.body.direccion || conferencista.direccion;
    conferencista.fecha_nacimiento = req.body.fecha_nacimiento || conferencista.fecha_nacimiento;
    conferencista.telefono = req.body.telefono || conferencista.telefono;
    conferencista.email = req.body.email || conferencista.email;

    try{
        const conferencistaAlmacenado = await conferencista.save();
        res.json(conferencistaAlmacenado)
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al actualizar al conferencista'});
    }
};

const eliminarConferencista = async(req,res) => {
    const {id} = req.params;
    try{
        const conferencista = await Conferencista.findById(id);
        if(!conferencista){
            return res.status(404).json({msg:'No se encontró al conferencista'});
        }
        await conferencista.deleteOne();
        res.json({msg:'Conferencista eliminado con exito'});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al eliminar conferencista'});
    }
}

export{
    agregarConferencista,
    verConferencista,
    verConferencistas,
    actualizarConferencista,
    eliminarConferencista
}