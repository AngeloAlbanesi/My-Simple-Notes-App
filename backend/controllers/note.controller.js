const { Note } = require('../models');

// --- 1. CREA una nuova nota (POST) ---
exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id; // Ottenuto dal middleware verifyToken

        if (!title) {
            return res.status(400).json({ message: 'Il titolo è obbligatorio.' });
        }

        const newNote = await Note.create({
            title,
            content,
            user_id: userId
        });

        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Errore nella creazione della nota.', error: error.message });
    }
};

// --- 2. LEGGI tutte le note dell'utente (GET) ---
exports.getAllNotes = async (req, res) => {
    try {
        const userId = req.user.id; // Ottenuto dal middleware

        const notes = await Note.findAll({
            where: { user_id: userId },
            order: [['updatedAt', 'DESC']] // Ordina le note dalla più recente
        });

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recupero delle note.', error: error.message });
    }
};

// --- 3. AGGIORNA una nota esistente (PUT) ---
exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params; // ID della nota da aggiornare
        const userId = req.user.id; // ID dell'utente autenticato
        const { title, content } = req.body;

        // Trova la nota assicurandoti che appartenga all'utente
        const note = await Note.findOne({ where: { id: id, user_id: userId } });

        if (!note) {
            return res.status(404).json({ message: 'Nota non trovata o non autorizzato.' });
        }

        // Aggiorna i campi
        note.title = title || note.title; // Mantieni il vecchio titolo se non ne viene fornito uno nuovo
        note.content = content !== undefined ? content : note.content;

        await note.save();

        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Errore nell\'aggiornamento della nota.', error: error.message });
    }
};

// --- 4. ELIMINA una nota (DELETE) ---
exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params; // ID della nota da eliminare
        const userId = req.user.id; // ID dell'utente autenticato

        // Trova la nota assicurandoti che appartenga all'utente
        const note = await Note.findOne({ where: { id: id, user_id: userId } });

        if (!note) {
            return res.status(404).json({ message: 'Nota non trovata o non autorizzato.' });
        }

        await note.destroy();

        res.status(200).json({ message: 'Nota eliminata con successo.' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nell\'eliminazione della nota.', error: error.message });
    }
};