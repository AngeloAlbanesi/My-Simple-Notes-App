// Carica le variabili d'ambiente dal file .env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// --- Configurazione del Database ---
// Inizializza Sequelize usando la configurazione per l'ambiente di sviluppo
// Questo assicura che l'applicazione e la CLI usino le stesse impostazioni
const config = require('./config/config.json')['development'];
const sequelize = new Sequelize({
    dialect: config.dialect,
    storage: config.storage
});

// Funzione per testare la connessione al database
const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connessione al database stabilita con successo.');
    } catch (error) {
        console.error('Impossibile connettersi al database:', error);
    }
};

// --- Configurazione di Express ---
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Abilita le richieste Cross-Origin
app.use(express.json()); // Permette al server di ricevere dati in formato JSON

// --- Integrazione delle Route ---
const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes); // Usa le route degli utenti per /api/users

//Route per le note
const noteRoutes = require('./routes/note.routes');
app.use('/api/notes', noteRoutes); // Usa le route delle note per /api/notes


// Route di test per verificare che il server sia attivo
app.get('/', (req, res) => {
    res.send('Server Express di My Simple Notes App è attivo!');
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
    // All'avvio del server, testa la connessione al DB
    testDbConnection();
});