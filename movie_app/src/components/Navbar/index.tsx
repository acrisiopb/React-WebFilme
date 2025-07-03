'use client';
import Image from 'next/image';
import Link from 'next/link';
import "./index.scss";
import { FaHeart } from "react-icons/fa";

export default function Navbar() {
  return (
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

      <div className="nav-item">
        <Link href="/Favorites">
          <p><FaHeart /></p>
          
        </Link>
      </div>
    </nav>
  );
}
