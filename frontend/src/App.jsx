import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import MyNotesPage from './pages/MyNotesPage';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const { user, logout } = useAuth();

    return (
        <div>
            <nav className="bg-white border-b-2 border-blue-600 p-4">
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link to="/" className="text-blue-600 font-bold py-2 px-4 rounded-lg border-2 border-blue-600 hover:bg-gray-50 transition duration-200">
                            Dashboard
                        </Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to="/my-notes" className="text-blue-600 font-bold py-2 px-4 rounded-lg border-2 border-blue-600 hover:bg-gray-50 transition duration-200">
                                    Le Mie Note
                                </Link>
                            </li>
                            <li>
                                <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="text-blue-600 font-bold py-2 px-4 rounded-lg border-2 border-blue-600 hover:bg-gray-50 transition duration-200">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="text-blue-600 font-bold py-2 px-4 rounded-lg border-2 border-blue-600 hover:bg-gray-50 transition duration-200">
                                    Registrazione
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/my-notes"
                        element={
                            <ProtectedRoute>
                                <MyNotesPage />
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