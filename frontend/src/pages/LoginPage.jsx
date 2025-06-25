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
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full mx-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Accedi al tuo Account</h2>
                <form onSubmit={handleSubmit}>
                    {/* Campo Username */}
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            required
                        />
                    </div>
                    {/* Campo Password */}
                    <div className="mb-8">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            required
                        />
                    </div>
                    {/* Pulsante di Invio */}
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full !bg-blue-600 hover:!bg-blue-700 !text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 !border-0"
                        >
                            Accedi
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-600 text-sm">
                    Non hai un account?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition duration-200">
                        Registrati
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;