import express from 'express';

import{
    agregarConferencista,
    verConferencista,
    verConferencistas,
    actualizarConferencista,
    eliminarConferencista
} from '../controllers/conferencistaController.js';

const router = express.Router();

router
    .route('/')
    .post(agregarConferencista)
    .get(verConferencistas)

router
    .route('/:id')
    .get(verConferencista)
    .put(actualizarConferencista)
    .delete(eliminarConferencista)

export default router;