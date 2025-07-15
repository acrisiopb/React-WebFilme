'use client';
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '@/services/api'; // Sua instância do Axios para o backend :8081
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Interface para definir a estrutura do objeto de utilizador
interface User {
    id: number;
    name: string;
    email: string;
}

// Interface para definir o que o nosso contexto irá fornecer
interface AuthContextType {
    user: User | null;     
    isLoading: boolean;
    login: (email, password) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // O estado 'user' (minúscula) está correto
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            // Adicionamos logs para depuração no console do navegador (F12)
            console.log("[AuthContext] A tentar buscar dados do utilizador...");
            setIsLoading(true);

            try {
                const response = await api.get('/api/register/me'); 
                
                console.log("[AuthContext] SUCESSO! Dados recebidos:", response.data);
                setUser(response.data);
            } catch (error) {
                console.error("[AuthContext] ERRO ao buscar dados do utilizador:", error);
                setUser(null);
            } finally {
                console.log("[AuthContext] Verificação terminada.");
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        // Chama a API do Next.js para definir o cookie
        await axios.post('/api/login', { email, password });
        // Após o sucesso, busca os dados do utilizador para atualizar o estado
        await fetchUser();
        router.push('/Dashboard');
    };

    const logout = async () => {
        await axios.post('/api/logout');
        setUser(null);
        router.push('/register');
        router.refresh(); // Força a atualização de estado
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

function fetchUser() {
    throw new Error('Function not implemented.');
}
