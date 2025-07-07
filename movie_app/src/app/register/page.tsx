"use client";
import Image from 'next/image';

import { useState } from "react";
import "./index.scss";
import Link from 'next/link';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Dados cadastrados:", { name, email, password });
    };

    return (
        <div className="container">
            <div className="card-left">
                <form onSubmit={handleSubmit}>
                    <Link href="/"><Image
                        src="/logoCine.png"
                        alt="BBG CINE"
                        width={170}
                        height={80}
                        className="logo-img"
                    /></Link>


                    <label className="label-input">Nome</label>
                    <input
                        type="text"
                        placeholder="Informe seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-field"
                    />

                    <label className="label-input">Email</label>
                    <input
                        type="email"
                        placeholder="Informe seu nome"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />

                    <label className="label-input">Senha</label>
                    <input
                        type="password"
                        placeholder="Crie uma senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                    <label className="label-input"> Confirmar Senha</label>
                    <input
                        type="password"
                        placeholder="Repita a senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button type="submit" className="btn">
                        Cadastrar
                    </button>
                </form>
            </div>

            <div className="card-right">
                <h1>Junte-se a nós e tenha acesso exclusivo.</h1>
                <p>Ainda não tem conta? Crie a sua em segundos.</p>
                <strong className='rodape'>BBG | Cine Overview - 2025 </strong>
            </div>

        </div>
    );
}
