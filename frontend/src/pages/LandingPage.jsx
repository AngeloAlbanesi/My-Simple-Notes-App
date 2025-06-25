import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Le tue note, sempre con te
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Organizza i tuoi pensieri, prendi appunti e accedi alle tue note da qualsiasi dispositivo. 
                        Semplice, veloce e sicuro.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/register" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-200"
                        >
                            Inizia Gratis
                        </Link>
                        <Link 
                            to="/login" 
                            className="bg-white hover:bg-gray-50 text-blue-600 font-bold py-3 px-8 rounded-lg text-lg border-2 border-blue-600 transition duration-200"
                        >
                            Accedi
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center p-6">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Scrittura Veloce</h3>
                        <p className="text-gray-600">
                            Crea e modifica le tue note con un editor semplice e intuitivo.
                        </p>
                    </div>
                    
                    <div className="text-center p-6">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Sicurezza</h3>
                        <p className="text-gray-600">
                            Le tue note sono protette e accessibili solo a te.
                        </p>
                    </div>
                    
                    <div className="text-center p-6">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Sempre Disponibili</h3>
                        <p className="text-gray-600">
                            Accedi alle tue note da qualsiasi dispositivo, ovunque tu sia.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Pronto a iniziare?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Unisciti a migliaia di utenti che già utilizzano la nostra piattaforma per organizzare le loro idee.
                    </p>
                    <Link 
                        to="/register" 
                        className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg text-lg transition duration-200 inline-block"
                    >
                        Registrati Ora
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;