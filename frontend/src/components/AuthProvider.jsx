import React, { useState, useEffect } from 'react';
import { AuthContext } from '../context/auth-context';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

// AuthProvider Component
// Questo componente "avvolgerà" la nostra app e fornirà i dati del context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stato per memorizzare i dati dell'utente (o null)
    const [token, setToken] = useState(localStorage.getItem('token')); // Legge il token iniziale dal localStorage
    const [loading, setLoading] = useState(true); // Stato di caricamento per la validazione del token
    const navigate = useNavigate();

    // Effetto che si attiva quando il componente viene montato per validare il token
    useEffect(() => {
        const validateToken = async () => {
            if (token) {
                try {
                    // Valida il token con il backend
                    const response = await authService.validateToken(token);
                    if (response.data.user) {
                        localStorage.setItem('token', token);
                        setUser(response.data.user);
                    } else {
                        // Token non valido
                        localStorage.removeItem('token');
                        setToken(null);
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Token validation failed:", error);
                    // Token non valido o errore di rete
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            } else {
                // Nessun token
                setUser(null);
            }
            setLoading(false);
        };

        validateToken();
    }, [token]); // Esegue quando il token cambia

    // Effetto che si attiva quando il token cambia (per login/logout)
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
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
                
                // Validazione immediata del token per impostare l'utente
                try {
                    const validateResponse = await authService.validateToken(response.data.token);
                    if (validateResponse.data.user) {
                        setUser(validateResponse.data.user);
                        navigate('/'); // Reindirizza alla dashboard solo dopo aver impostato l'utente
                    }
                } catch (validateError) {
                    console.error("Errore nella validazione del token:", validateError);
                    // Se la validazione fallisce, pulisce il token
                    setToken(null);
                    throw new Error('Token non valido ricevuto dal server');
                }
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
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};