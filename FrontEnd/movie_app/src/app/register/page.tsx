
"use client";
import Image from 'next/image';
import { FormEvent, useState } from "react";
import "./index.scss";
import Link from 'next/link';
import api from '@/services/api';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 
import { toast } from 'react-toastify';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOn, setIsOn] = useState(true); 
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth(); 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (isOn) { 
      // console.log("Formulário de login submetido. A chamar a função 'login' do AuthContext...");
      try {
  
        await login(email, password);
        
        // console.log("Processo de login no contexto concluído.");
        
      } catch (err) {
           toast.error("Verifique as suas credenciais.");
           
        if (axios.isAxiosError(err)) {
          // console.error("ERRO DETALHADO (AXIOS) NO FORMULÁRIO:", err.response?.data || err.message);
        } else {
          // console.error("ERRO DETALHADO (INESPERADO) NO FORMULÁRIO:", err);
        }
      }
    } else {
      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem!");
        
        return;
      }
      try {
        const dadosParaEnviar = { username: name, email, password };
        await api.post('/api/register', dadosParaEnviar);
        toast.success("Cadastro realizado com sucesso! Agora pode aceder.");
        toggle();
      }
      catch (err) {
        toast.error("Erro ao realizar o cadastro. Tente novamente.");
        // console.error("Erro no cadastro:", err);
      }
    }
  };

  const toggle = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOn(prev => !prev);
      setClosing(false);
      setError("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }, 300);
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
              className={`toggle-button ${isOn ? "cadastro" : "acessar"}`}
            >
              {isOn ? "Cadastre-se" : "Acessar"}
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