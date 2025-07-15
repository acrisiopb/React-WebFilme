'use client';

import Image from 'next/image';
import Link from 'next/link';
import "./index.scss"; // O seu ficheiro de estilos para o Navbar
import { FaHeart } from "react-icons/fa";
import { useAuth } from '@/app/context/AuthContext'; // 1. Importe o nosso hook do Contexto

export default function Navbar() {
  // 2. Use o contexto para obter os dados do utilizador, o estado de carregamento e a função de logout
  const { user, isLoading, logout } = useAuth();

  return (
    <header>
      <nav className="navbar">
        <Link href="/">
          <Image
            src="/logoCine.png"
            alt="BBG CINE"
            width={170}
            height={80}
            priority
          />
        </Link>

        <div className="nav-fav">
          <Link href="/Favorites">
            <p><FaHeart /></p>
          </Link>

          {/* 3. Lógica para mostrar o conteúdo de autenticação correto */}
          <div className="auth-section">
            {isLoading ? (
              // Enquanto verifica a sessão, mostra uma mensagem de carregamento
              <p>Carregando...</p>
            ) : user ? (
              // Se houver um utilizador logado, mostra o seu nome e um botão para sair
              <div className="user-info">
                <span>Olá, {user.name}</span>
                <button onClick={logout} className="logout-btn">Sair</button>
              </div>
            ) : (
              // Se não houver utilizador, mostra o link para a página de registo/login
              <Link href="/register">
                <p>Acessar | Cadastre-se</p>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}