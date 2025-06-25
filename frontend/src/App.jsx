import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute'; // <-- 1. Importa il componente

function App() {
    const { user, logout } = useAuth();

    return (
        <div>
            <nav className="bg-gray-800 p-4 text-white">
                {/* La navigazione rimane invariata */}
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    {user ? (
                        <li>
                            <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Logout
                            </button>
                        </li>
                    ) : (
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
                    {/* 2. Modifica la route della dashboard */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </main>
        </div>
    )
}

export default App;