"use client";
import { serie } from "@/types/movie"
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import StarRating from "@/components/StarRating";
// highlight-start
import { useAuth } from "@/app/context/AuthContext";
// highlight-end


export interface props {
  serie: serie
}


export default function SeriePage() {
  // highlight-start
  const { user, saveMovieToDb } = useAuth();
  // highlight-end
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [serie, setSerie] = useState<serie | null>(null);

  useEffect(() => {

    async function loadSerie() {

      try {
        const response = await axios({

          method: 'get',
          url: `https://api.themoviedb.org/3/tv/${id}`,
          params: {
            api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
            language: 'pt-BR'
          }
        });

        setSerie(response.data);

      }
      catch (err) {
        // Trata o caso de erro, redirecionando para a página inicial
        console.log("Serie NÃO ENCONTRADO");
        router.push("/");

      }
    }

    loadSerie();

  }, [id, router]);

  // highlight-start
  async function salveSerie() {
    if (!serie) return;

    // Se o usuário estiver logado, salva direto no banco
    if (user) {
      try {
        await saveMovieToDb(serie);
        toast.success("Filme salvo nos seus favoritos!", {
          style: { background: "rgb(71, 110, 4)", color: "#fff" }
        });
      } catch (error) {
        toast.error("Erro ao salvar o filme. Tente novamente.", {
          style: { background: "rgb(199, 0, 0)", color: "#fff" }
        });
      }
      return;
    }

    // Lógica original para usuários deslogados (localStorage)
    const MyList = localStorage.getItem("@serieBBG");
    let serieSave = MyList ? JSON.parse(MyList) : [];
    const hasSerie = serieSave.some((m: serie) => m.id === serie.id);

    if (hasSerie) {
      toast.warn("Este filme já está na sua lista!", {
        style: { background: "rgb(199, 0, 0)", color: "#fff" }
      });
      return;
    }

    serieSave.push(serie);
    localStorage.setItem("@serieBBG", JSON.stringify(serieSave));
    toast.success("Filme salvo com sucesso!", {
      style: { background: "rgb(71, 110, 4)", color: "#fff" }
    });
  }
  // highlight-end


  if (!serie) {
    return <p>Carregando...</p>;
  }

  return (
    <div
      className="serie-hero"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.3)),
                        url(https://image.tmdb.org/t/p/original${serie.backdrop_path || serie.poster_path})`
      }}
    >
      <div className="serie-content">
        <div className="serie-text">
          <h1>{serie.title}</h1>
          <p>{serie.overview}</p>
          <div className="buttons">
            {user && (
              <>
                <button className="watch-now">
                  <a
                    target='blank'
                    rel="external"
                    
                    href={ `https://vidsrc.xyz/embed/tv/${serie.id}/1-1`}
                  >
                    ▶ Assista Agora
                  </a>
                </button>
              </>
            )}
             <button className="watch-now">
               <a
                    target='blank'
                    rel="external"
                    href={`https://www.youtube.com/results?search_query=${serie.title}`}
                  >
               ▶ Assista o trailer
                  </a>
            </button>
            <button className="trailer" onClick={salveSerie}>
              Adicionar aos favoritos
            </button>
          </div>
        </div>
        <div className="serie-poster">
          <img src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} alt={serie.title} />
        </div>
      </div>
    </div>

  );


}