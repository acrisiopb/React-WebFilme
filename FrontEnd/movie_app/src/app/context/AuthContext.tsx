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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    
    useEffect(() => {
        const loadUserFromStorage = async () => {
            const token = localStorage.getItem('@MovieBBG:token');

            if (token) {
                // console.log("[AuthContext] Token encontrado no localStorage. A configurar o header da API...");
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await fetchUser();
            }
            setIsLoading(false);
        };
        loadUserFromStorage();
    }, []);



const login = async (email: string, password: string) => {
    try {
        // console.log("[AuthContext] A chamar /api/login para autenticar e obter o token...");
        
        const response = await axios.post('/api/login', { email, password });
        const { token } = response.data;

        if (!token) {
            throw new Error("Token não foi recebido da rota /api/login");
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // console.log("[AuthContext] Autenticação concluída. Cookie e cabeçalho definidos.");


        await fetchUser();
        await syncLocalMoviesWithDb();
        router.push('/Dashboard');

    } catch (error) {
        // console.error("[AuthContext] Erro no processo de login:", error);
        delete api.defaults.headers.common['Authorization'];
        throw error;
    }
};


    const fetchUser = async (): Promise<User | null> => {
        if (!api.defaults.headers.common['Authorization']) {
            // console.log("[AuthContext] Nenhum token presente, não há usuário para buscar.");
            setIsLoading(false); 
            return null;
        }

        // console.log("[AuthContext] Buscando dados do usuário com token existente...");
        try {
            const response = await api.get('/api/register/me');
            setUser(response.data);
            // console.log("[AuthContext] Dados do usuário obtidos com sucesso:", response.data);
            return response.data;
        } catch (error) {
            // console.error("[AuthContext] Erro ao buscar dados do usuário. O token pode ser inválido.", error);
            return null;
        }
    };

    // FUNÇÃO DE LOGOUT
    const logout = () => {
        setUser(null);
        localStorage.removeItem('@MovieBBG:token');
        delete api.defaults.headers.common['Authorization'];
        router.push('/register');
        // console.log("[AuthContext] Usuário deslogado e token removido.");
    };

    // A função de sincronização
    const syncLocalMoviesWithDb = async () => {
        console.log("[AuthContext] Iniciando sincronização dos filmes locais...");
        const localMoviesRaw = localStorage.getItem("@MovieBBG");
        if (!localMoviesRaw) return;
        const localMovies: Movie[] = JSON.parse(localMoviesRaw);
        if (localMovies.length === 0) return;

        const moviesToSync = localMovies.map(movie => ({ movieId: movie.id, userId: 0 }));

        try {
            await api.post('/api/movie/save', moviesToSync);
            localStorage.removeItem("@MovieBBG");
            // console.log("[AuthContext] Filmes locais sincronizados e limpos.");
        } catch (error) {
            // console.error("[AuthContext] ERRO ao sincronizar filmes.", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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