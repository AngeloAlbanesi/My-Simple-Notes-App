import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider> {/* Avvolgi l'app con l'AuthProvider */}
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
)