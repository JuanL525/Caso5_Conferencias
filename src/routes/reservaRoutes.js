import express from 'express';

import{
    agregarReserva,
    verReserva,
    verReservas,
    actualizarReserva,
    eliminarReserva
} from '../controllers/reservaController.js';

const router = express.Router();

router
    .route('/')
    .post(agregarReserva)
    .get(verReservas)

router
    .route('/:id')
    .get(verReserva)
    .put(actualizarReserva)
    .delete(eliminarReserva)

export default router;