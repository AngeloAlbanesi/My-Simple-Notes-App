import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from './hooks/useAuth'; // Importa il nostro hook

function App() {
    const { user, logout } = useAuth(); // Ottieni l'utente e la funzione di logout

    return (
        <div>
            <nav className="bg-gray-800 p-4 text-white">
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    {user ? (
                        // Se l'utente è loggato, mostra il pulsante di logout
                        <li>
                            <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Logout
                            </button>
                        </li>
                    ) : (
                        // Se l'utente non è loggato, mostra i link di login/registrazione
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Registrazione</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <main>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </main>
        </div>
    )
}

export default App;