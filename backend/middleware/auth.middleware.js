const jwt = require('jsonwebtoken');

// Middleware per verificare il token JWT
const verifyToken = (req, res, next) => {
    // 1. Ottieni il token dall'header della richiesta
    // Il formato standard è "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Estrae solo il token

    // 2. Se non c'è token, nega l'accesso
    if (!token) {
        return res.status(401).json({ message: 'Accesso negato. Nessun token fornito.' });
    }

    // 3. Verifica la validità del token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // Se il token non è valido (scaduto, firma errata, etc.), nega l'accesso
        if (err) {
            return res.status(401).json({ message: 'Token non valido o scaduto.' });
        }

        // 4. Se il token è valido, salva i dati dell'utente nella richiesta
        // Il payload decodificato è ora disponibile
        req.user = decoded;

        // 5. Passa il controllo al prossimo middleware o al controller della route
        next();
    });
};

module.exports = { verifyToken };