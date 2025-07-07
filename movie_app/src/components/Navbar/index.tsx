'use client';
import Image from 'next/image';
import Link from 'next/link';
import "./index.scss";
import { FaHeart } from "react-icons/fa";

export default function Navbar() {
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
           <Link href="/register">
            <p>Login</p>
          </Link>
        </div>
      </nav>
      <nav>
        <div className="nav-item">
          <Link href="/">
            <p>Filmes</p>
          </Link>
          <Link href="/">
            <p>Séries</p>
          </Link>
        </div>
      </nav>
    </header>

  );
}
