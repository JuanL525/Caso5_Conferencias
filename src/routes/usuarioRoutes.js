import express from 'express';
import{
    agregarUsuario,
    autenticarUsuario
} from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/', agregarUsuario);
router.post('/login', autenticarUsuario);

export default router;

