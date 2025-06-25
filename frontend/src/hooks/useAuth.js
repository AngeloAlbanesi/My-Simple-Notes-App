import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

// Custom Hook per usare facilmente il context
// Invece di importare useContext e AuthContext in ogni componente, importeremo solo useAuth
export const useAuth = () => {
    return useContext(AuthContext);
};