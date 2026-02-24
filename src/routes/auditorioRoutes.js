import express from 'express';
import {
    agregarAuditorio,
    verAuditorio,
    verAuditorios,
    actualizarAuditorio,
    eliminarAuditorio
} from '../controllers/auditorioController.js';

const router = express.Router();

router
    .route('/')
    .post(agregarAuditorio)
    .get(verAuditorios)

router
    .route('/:id')
    .get(verAuditorio)
    .put(actualizarAuditorio)
    .delete(eliminarAuditorio)

export default router;