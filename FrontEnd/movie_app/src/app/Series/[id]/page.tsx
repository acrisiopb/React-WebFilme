"use client";
import { Serie } from "@/types/movie" // Usaremos o tipo Serie
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import StarRating from "@/components/StarRating";
import { useAuth } from "@/app/context/AuthContext";
import Loading from "@/components/Loading";

export default function SeriePage() {
  const { user } = useAuth(); // A lógica de salvar favoritos pode ser adicionada depois
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [serie, setSerie] = useState<Serie | null>(null);

  useEffect(() => {
    async function loadSerie() {
      if (!id) return;
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
          params: {
            api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
            language: 'pt-BR'
          }
        });
        setSerie(response.data);
      } catch (err) {
        console.log("SÉRIE NÃO ENCONTRADA", err);
        router.push("/series");
      }
    }
    loadSerie();
  }, [id, router]);

  function saveSerie() {
      // A lógica para salvar séries nos favoritos pode ser implementada aqui,
      // similar à funcionalidade de salvar filmes.
      toast.info("Funcionalidade de salvar séries ainda não implementada.");
  }

  if (!serie) {
    return <Loading />;
  }

  return (
    <div
      className="hero-section" // Usando um nome de classe genérico
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.3)),
                        url(https://image.tmdb.org/t/p/original${serie.backdrop_path || serie.poster_path})`
      }}
    >
      <div className="hero-content">
        <div className="hero-text">
          <h1>{serie.name}</h1>
          <StarRating rating={serie.vote_average} />
          <p>{serie.overview}</p>
          <div className="buttons">
             <a
                target='_blank'
                rel="external"
                href={`https://www.youtube.com/results?search_query=${serie.name} trailer`}
                className="hero-button trailer"
              >
               ▶ Assista o trailer
              </a>
            <button className="hero-button primary" onClick={saveSerie}>
              Adicionar aos favoritos
            </button>
          </div>
        </div>
        <div className="hero-poster">
          <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} alt={serie.name} />
        </div>
      </div>
    </div>
  );
}
