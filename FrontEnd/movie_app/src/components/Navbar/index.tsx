'use client';

import Image from 'next/image';
import Link from 'next/link';
import "./index.scss";
import { FaHeart, FaTv } from "react-icons/fa";
import { useAuth } from '@/app/context/AuthContext';
import UpdatePassword from '../Password';
import { useState } from 'react';
import { MdExitToApp, MdLocalMovies } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaHouse } from 'react-icons/fa6';

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const togglePasswordModal = () => {
    setShowPasswordModal((prev) => !prev);
  };

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
            {isLoading ? (
              <p>Carregando...</p>
            ) : user ? (
              <div className="user-info">
                <Link href="/Dashboard">
                  <span>OLÁ,&nbsp;{user.username}&nbsp;</span>
                </Link>

                <p className="btn-password" onClick={togglePasswordModal}>
                  <RiLockPasswordLine size={20} />
                </p>
                <p onClick={logout} className='btn-exit'><MdExitToApp size={20} /></p>

                {showPasswordModal && (
                  <div className="password-modal">
                    <div className="modal-content">
                      <UpdatePassword onClose={togglePasswordModal} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/Favorites">
                  <p><FaHeart /></p>
                </Link>

                <Link href="/register">
                  <p>Acessar | Cadastre-se</p>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <nav>
        <div className="nav-item">
          <Link href="/register">
            <p>Home <FaHouse size={20} /></p>
          </Link>
          <Link href="/">
            <p>Filmes <MdLocalMovies size={20} /></p>
          </Link>
          <Link href="/Series">
            <p>Séries <FaTv size={20} /></p>
          </Link>
        </div>
      </nav>
    </header>
  );
}