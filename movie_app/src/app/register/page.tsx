"use client";
import Image from 'next/image';
import { useState } from "react";
import "./index.scss";
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [isOn, setIsOn] = useState(false);
  const [closing, setClosing] = useState(false);  // controla animação de fechar

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isOn && password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Dados cadastrados:", { name, email, password });
   
  };

  const toggle = () => {
    setClosing(true); // Inicia animação de fechar

    setTimeout(() => {
      setIsOn(prev => !prev);  // troca o modo depois que o modal "fechou"
      setClosing(false);       // abre de novo
      // Limpa campos se quiser:
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }, 300); // duração da animação, ajuste conforme o CSS
  };

  return (
    <div className="container">
      <div className="card-left">
        <form onSubmit={handleSubmit} className={`form-container ${closing ? "fade-out" : "fade-in"}`}>
          <div className="top-bar">
            <Link href="/">
              <Image
                src="/logoCine.png"
                alt="BBG CINE"
                width={170}
                height={80}
                className="logo-img"
              />
            </Link>
            <button
              type="button"
              onClick={toggle}
              className={`toggle-button ${isOn ? "acessar" : "cadastro"}`}
            >
              {isOn ? "Acessar" : "Cadastre-se"}
            </button>
          </div>

          {!isOn && ( 
            <>
              <label className="label-input">Nome</label>
              <input
                type="text"
                placeholder="Informe seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-field"
              />
            </>
          )}

          <label className="label-input">Email</label>
          <input
            type="email"
            placeholder="Informe seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />

          <label className="label-input">Senha</label>
          <input
            type="password"
            placeholder="Informe sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />

          {!isOn && (
            <>
              <label className="label-input">Confirmar Senha</label>
              <input
                type="password"
                placeholder="Repita a senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-field"
              />
            </>
          )}

          <button type="submit" className="btn">
            {isOn ? "Acessar" : "Cadastrar"}
          </button>
        </form>
      </div>

      <div className="card-right">
        <h1>Junte-se a nós e tenha acesso exclusivo.</h1>
        <p>Ainda não tem conta? Crie a sua em segundos.</p>
        <strong className='rodape'>BBG | Cine Overview - 2025</strong>
      </div>
    </div>
  );
}
