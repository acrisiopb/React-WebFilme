'use client';

import Image from 'next/image';
import Link from 'next/link';
import "./index.scss";
import { FaHeart } from "react-icons/fa";
import { useAuth } from '@/app/context/AuthContext';

export default function Navbar() {
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


          <div className="auth-section">
            <Link href="/Favorites">
              <p><FaHeart /></p>
            </Link>
            {isLoading ? (
              <p>Carregando...</p>
            ) : user ? (
              <div className="user-info">
                <Link href="/Dashboard">  
                <span>OLÁ,&nbsp;{user.username} &nbsp;</span>
                </Link>
                <p onClick={logout} className='btn-exit'>SAIR</p> 
              
              </div>
            ) : (
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