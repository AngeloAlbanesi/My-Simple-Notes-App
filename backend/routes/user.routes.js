const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Definisce la route per la registrazione
// POST /api/users/register
router.post('/register', authController.register);

// Definisce la route per il login
// POST /api/users/login
router.post('/login', authController.login);

// Route protetta di esempio
// GET /api/users/profile
// Il middleware 'verifyToken' viene eseguito prima della funzione del controller.
router.get('/profile', verifyToken, (req, res) => {
    // Grazie al middleware, ora abbiamo accesso a req.user
    res.json({
        message: 'Accesso al profilo protetto riuscito!',
        user: req.user
    });
});

module.exports = router;