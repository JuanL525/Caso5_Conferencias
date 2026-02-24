import Usuario from "../models/Usuario.js";

const agregarUsuario = async(req,res) => {
    const {email} = req.params;
    const existeUsuario = await Usuario.findOne({email});
    if(existeUsuario){
        return res.status(400).json({msg: 'Ese email está usado por otro usuario'});
    }

    try{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.json({msg:'Usuario agregado con exito', ...usuario._doc});
    } catch(error){
        console.log(error);
        res.status(500).json({msg:'Error al agregar al usuario'});
    }
}

const autenticarUsuario = async(req,res) =>{
    const {email,password} = req.body;
    const usuario = await Usuario.findOne({email});

    if(!usuario){
        const error = new Error('Usuario no encontrado');
        return res.status(404).json({msg:error.message});
    }

    if(await usuario.comprobarPassword(password)){
        return res.json({
            _id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
        })
    }
    const error = new Error('Password o email incorrecto');
    return res.status(404).json({msg: error.message});
}

export{
    agregarUsuario,
    autenticarUsuario
}