import Auditorio from "../models/Auditorio.js";

const agregarAuditorio = async(req,res) => {
    const {codigo} = req.params;
    const existeAuditorio = await Auditorio.findOne({codigo});

    if(existeAuditorio){
        return res.status(400).json({msg:'Ese codigo ya existe en otro auditorio'});
    }

    try{
        const auditorio = new Auditorio(req.body);
        await auditorio.save();
        res.status(400).json({msg: 'Auditorio registrado con exito', ...auditorio._doc});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al agregar un auditorio'});
    }
}

const verAuditorios = async(req,res) => {
    try{
        const auditorios = await Auditorio.find();
        res.json(auditorios);
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al ver obtener los auditorios'});
    }
}

const verAuditorio = async(req,res) => {
    const {id} = req.params;

    try{
        const auditorio = await Auditorio.findById(id);
        if(!auditorio){
            return res.status(404).json({msg:'Ese auditorio no existe'});
        }
        res.json(auditorio);
    } catch(error){
        console.log(error);
        res.status(400).json({msg: 'Error al obtener el auditorio'});
    }
}

const actualizarAuditorio = async(req,res) => {
    const {id} = req.params;
    const auditorio = await Auditorio.findById(id);

    if(!auditorio){
        return res.status(404).json({msg: 'El auditorio no existe'});
    }

    if(req.body.codigo && req.body.codigo !== auditorio.codigo){
        const existeCodigo = await Auditorio.findOne({codigo: req.body.codigo});
        if(existeCodigo){
            return res.status(400).json({msg: 'Ese codigo pertenece a otro auditorio'});
        }
    }

    auditorio.codigo = req.body.codigo || auditorio.codigo;
    auditorio.nombre = req.body.nombre || auditorio.nombre;
    auditorio.ubicacion = req.body.ubicacion || auditorio.ubicacion;
    auditorio.capacidad = req.body.capacidad || auditorio.capacidad;
    auditorio.descripcion = req.body.descripcion || auditorio.descripcion;

    try{
        const auditorioAlmacenado = await auditorio.save();
        res.json(auditorioAlmacenado)
    } catch(error){
        console.log(error);
        res.status(500).json({msg: 'Error al actualizar auditorio'});
    }
};

const eliminarAuditorio = async(req,res) => {
    const {id} = req.params;
    try{
        const auditorio = await Auditorio.findById(id);
        if(!auditorio){
            return res.status(404).json({msg:'No se encontró el auditorio'});
        }
        await auditorio.deleteOne();
        res.json({msg:'Auditorio eliminado con exito'});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al eliminar auditorio'});
    }
}

export{
    agregarAuditorio,
    verAuditorio,
    verAuditorios,
    actualizarAuditorio,
    eliminarAuditorio
}