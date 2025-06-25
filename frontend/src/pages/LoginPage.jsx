import React, { useState } from 'react';
//import { Link, useNavigate } from 'react-router-dom';
//import authService from '../services/auth.service';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
    // Stato locale per i campi del form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const navigate = useNavigate();
    const { login } = useAuth();

    // Gestore dell'invio del form
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Usa la funzione di login del context
            await login(username, password);
            // La navigazione è già gestita all'interno del context
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Errore durante il login.';
            alert(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Accedi al tuo Account</h2>
                <form onSubmit={handleSubmit}>
                    {/* Campo Username */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* Campo Password */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* Pulsante di Invio */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            Accedi
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs mt-6">
                    Non hai un account?{' '}
                    <Link to="/register" className="text-blue-500 hover:text-blue-700 font-bold">
                        Registrati
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;