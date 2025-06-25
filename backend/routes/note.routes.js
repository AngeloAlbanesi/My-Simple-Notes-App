const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Applica il middleware a tutte le route in questo file.
// Qualsiasi richiesta a /api/notes/* dovrà avere un token valido.
router.use(verifyToken);

// Route per creare una nota e per ottenere tutte le note
router.route('/')
    .post(noteController.createNote)
    .get(noteController.getAllNotes);

// Route per aggiornare ed eliminare una nota specifica
router.route('/:id')
    .put(noteController.updateNote)
    .delete(noteController.deleteNote);

module.exports = router;