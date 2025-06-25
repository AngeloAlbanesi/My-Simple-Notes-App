const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Importa il modello User
const jwt = require('jsonwebtoken');

// Funzione per registrare un nuovo utente
exports.register = async (req, res) => {
    try {
        // 1. Estrai username e password dal corpo della richiesta
        const { username, password } = req.body;

        // 2. Validazione base dell'input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username e password sono obbligatori.' });
        }

        // 3. Controlla se l'utente esiste già
        const existingUser = await User.findOne({ where: { username: username } });
        if (existingUser) {
            // Usiamo 409 Conflict per indicare che la risorsa esiste già
            return res.status(409).json({ message: 'Username già in uso.' });
        }

        // 4. Esegui l'hashing della password
        // Il secondo argomento (10) è il "salt rounds", un fattore di costo per l'hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Crea il nuovo utente nel database
        const newUser = await User.create({
            username: username,
            password_hash: hashedPassword
        });

        // 6. Invia una risposta di successo
        // Usiamo 201 Created per indicare che una nuova risorsa è stata creata
        res.status(201).json({
            message: 'Utente registrato con successo.',
            user: {
                id: newUser.id,
                username: newUser.username
            }
        });

    } catch (error) {
        // Gestione generica degli errori del server
        console.error('Errore durante la registrazione:', error);
        res.status(500).json({ message: 'Errore interno del server.' });
    }
};


// Funzione per il login di un utente
exports.login = async (req, res) => {
    try {
        // 1. Estrai username e password dal corpo della richiesta
        const { username, password } = req.body;

        // 2. Validazione base dell'input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username e password sono obbligatori.' });
        }

        // 3. Cerca l'utente nel database
        const user = await User.findOne({ where: { username: username } });

        // 4. Se l'utente non esiste, invia un errore di autenticazione
        // NOTA DI SICUREZZA: Non specificare se è l'username o la password a essere errata.
        if (!user) {
            return res.status(401).json({ message: 'Credenziali non valide.' });
        }

        // 5. Confronta la password fornita con l'hash salvato nel database
        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

        // 6. Se le password non corrispondono, invia un errore di autenticazione
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Credenziali non valide.' });
        }

        // 7. Se le credenziali sono corrette, genera un JWT
        const token = jwt.sign(
            { id: user.id, username: user.username }, // Payload: dati da includere nel token
            process.env.JWT_SECRET,                   // Chiave segreta dal file .env
            { expiresIn: '1h' }                        // Opzioni: il token scadrà tra 1 ora
        );

        // 8. Invia il token al client
        res.status(200).json({
            message: 'Login effettuato con successo.',
            token: token
        });

    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ message: 'Errore interno del server.' });
    }
};

// Funzione per validare un token JWT
exports.validateToken = async (req, res) => {
    try {
        // A questo punto il middleware ha già verificato il token
        // e ha aggiunto req.user con i dati decodificati
        const userId = req.user.id;

        // Cerca l'utente nel database per assicurarsi che esista ancora
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(401).json({ message: 'Utente non trovato.' });
        }

        // Restituisce i dati dell'utente
        res.status(200).json({
            message: 'Token valido.',
            user: {
                id: user.id,
                username: user.username
            }
        });

    } catch (error) {
        console.error('Errore durante la validazione del token:', error);
        res.status(500).json({ message: 'Errore interno del server.' });
    }
};