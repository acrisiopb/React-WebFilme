'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '@/services/api'; 
import { useRouter } from 'next/navigation';
import { Movie } from '@/types/movie';
import axios from 'axios';

interface User {
    id: number;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    saveMovieToDb: (movie: Movie) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('@MovieBBG:token');
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const fetchedUser = await fetchUser();
                if (!fetchedUser) {
                    localStorage.removeItem('@MovieBBG:token');
                    delete api.defaults.headers.common['Authorization'];
                }
            }
            setIsLoading(false);
        };
        initializeAuth();
    }, []);

    const fetchUser = async (): Promise<User | null> => {
        try {
            const response = await api.get('/api/register/me');
            setUser(response.data);
            return response.data;
        } catch (error) {
            setUser(null);
            return null;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/api/login', { email, password });
            const { token } = response.data;

            if (!token) {
                throw new Error("Token não foi recebido da rota /api/login");
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            await fetchUser();
            await syncLocalMoviesWithDb();
            router.push('/Dashboard');
        } catch (error) {
            delete api.defaults.headers.common['Authorization'];
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('@MovieBBG:token');
        delete api.defaults.headers.common['Authorization'];
        router.push('/register');
    };

    const syncLocalMoviesWithDb = async () => {
        const localMoviesRaw = localStorage.getItem("@MovieBBG");
        if (!localMoviesRaw) return;
        const localMovies: Movie[] = JSON.parse(localMoviesRaw);
        if (localMovies.length === 0) return;

        const moviesToSync = localMovies.map(movie => ({ movieId: movie.id, userId: 0 }));

        try {
            await api.post('/api/movie/save', moviesToSync);
            localStorage.removeItem("@MovieBBG");
        } catch (error) {
            console.error("[AuthContext] ERRO ao sincronizar filmes.", error);
        }
    };

    const saveMovieToDb = async (movie: Movie) => {
        if (!user) {
            throw new Error("Usuário não autenticado.");
        }
        try {
            const payload = [{ movieId: movie.id, userId: 0 }]; 
            await api.post('/api/movie/save', payload); 
            console.log("[AuthContext] Filme salvo no banco de dados com sucesso via API externa.");
        } catch (error) {
            console.error("[AuthContext] ERRO ao salvar filme via API externa.", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, saveMovieToDb }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};