'use client';
import Image from 'next/image';
import "./index.scss";
export default function () {
  return (
    <nav className="navbar">
      <Image
        src="/logoCine.png"
        alt="BBG CINE"
        width={170}
        height={80}
        priority
      />
    </nav>
  );
}