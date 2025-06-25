import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Questo componente accetta 'children' come prop.
// 'children' rappresenterà il componente che vogliamo proteggere (es. <DashboardPage />)
const ProtectedRoute = ({ children }) => {
    // Usiamo il nostro custom hook per accedere allo stato di autenticazione
    const { user, loading } = useAuth();

    // Se stiamo ancora validando il token, mostriamo un indicatore di caricamento
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Caricamento...</div>
            </div>
        );
    }

    // Controlliamo se l'oggetto 'user' esiste.
    // In base alla logica in AuthProvider, 'user' è null se non si è loggati.
    if (!user) {
        // Se l'utente non è autenticato, non renderizziamo i 'children'.
        // Invece, usiamo il componente <Navigate> di react-router-dom
        // per reindirizzare l'utente alla pagina di login.
        return <Navigate to="/login" />;
    }

    // Se l'utente è autenticato, 'user' non è null, quindi
    // renderizziamo semplicemente i componenti figli che ci sono stati passati.
    return children;
};

export default ProtectedRoute;