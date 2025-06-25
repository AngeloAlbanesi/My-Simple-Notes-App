import React, { useState, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

// AuthProvider Component
// Questo componente "avvolgerà" la nostra app e fornirà i dati del context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stato per memorizzare i dati dell'utente (o null)
    const [token, setToken] = useState(localStorage.getItem('token')); // Legge il token iniziale dal localStorage
    const navigate = useNavigate();

    // Effetto che si attiva quando il token cambia
    useEffect(() => {
        if (token) {
            // Se c'è un token, lo salviamo nel localStorage
            localStorage.setItem('token', token);
            // Qui potremmo anche decodificare il token per ottenere i dati dell'utente
            // Per semplicità, consideriamo l'utente "loggato" se c'è un token.
            // Una versione più robusta verificherebbe il token con il backend.
            setUser({ token: token });
        } else {
            // Se non c'è token, lo rimuoviamo dal localStorage
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    // Funzione di login che aggiorna il token
    const login = async (username, password) => {
        try {
            const response = await authService.login(username, password);
            if (response.data.token) {
                setToken(response.data.token); // Aggiorna lo stato del token, che attiverà l'useEffect
                navigate('/'); // Reindirizza alla dashboard
            }
        } catch (error) {
            console.error("Errore di login nel context:", error);
            // Rilancia l'errore per poterlo gestire nel componente del form
            throw error;
        }
    };

    // Funzione di logout che pulisce lo stato
    const logout = () => {
        setToken(null); // Imposta il token a null, che attiverà l'useEffect
        navigate('/login'); // Reindirizza al login
    };

    // Valori che il provider renderà disponibili ai suoi figli
    const value = {
        user,
        token,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};