"use client";
import { Movie } from "@/types/movie"
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import StarRating from "@/components/StarRating";


export interface props {
    movie: Movie
}


export default function MoviePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {

        async function loadMovie() {

            try {
                const response = await axios({

                    method: 'get',
                    url: `https://api.themoviedb.org/3/movie/${id}`,
                    params: {
                        api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
                        language: 'pt-BR'
                    }
                });

                setMovie(response.data);

            }
            catch (err) {
                // Trata o caso de erro, redirecionando para a página inicial
                console.log("FILME NÃO ENCONTRADO");
                router.push("/");

            }
        }

        loadMovie();

    }, [id, router]);

    function salveMovie() {

        if (!movie) {
            console.log("Este fime já está na sua lista!");
            return;
        }


        const MyList = localStorage.getItem("@MovieBBG");

        let MovieSave = MyList ? JSON.parse(MyList) : [];

        const hasMovie = MovieSave.some((m) => m.id === movie.id);

        if (hasMovie) {
            console.log("Este filme já está na sua lista!");
            toast.warn("Este filme já está na sua lista!", {
                style: {
                    background: "rgb(199, 0, 0)",
                    color: "#fff"
                }
            }

            );
            return;
        }

        MovieSave.push(movie);
        localStorage.setItem("@MovieBBG", JSON.stringify(MovieSave));
        // console.log("Filme salvo com sucesso!");
        toast.success("Filme salvo com sucesso!", {
            style: {
                background:"rgb(71, 110, 4)",
                color: "#fff"
            }
        }
        
        );

    }


    if (!movie) {
        return <p>Carregando...</p>;
    }
    // return (
    //     <div className="filme-info">
    //         <h1>{movie.title}</h1>
    //         <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
    //         <h3>Sinopse</h3>
    //         <span>{movie.overview}</span>
    //         <strong>Avaliação:

    //             {movie.vote_average > 0 &&

    //                 <StarRating rating={movie.vote_average} />
    //             }
    //         </strong>
    //         {/* Botões para salvar o filme ou assistir ao trailer */}
    //         <div className="area-buttons">
    //             <button onClick={salveMovie}>Salvar</button>
    //             <button>
    //                 <a target='black' rel="external" href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}&ds_lang=pt`}>
    //                     Assistir
    //                 </a>
    //             </button>
    //         </div>
    //     </div>
    // );
    
    return (
        <div 
          className="movie-page" 
          style={{ 
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`
          }}
        >
          <div className="movie-info-overlay">
            <h1>{movie.title}</h1>
            <h3>Sinopse</h3>
            <p>{movie.overview}</p>
            <strong>
              Avaliação:
              {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
            </strong>
            <div className="area-buttons">
              <button onClick={salveMovie}>Salvar</button>
              <button>
                <a 
                  target='blank' 
                  rel="external" 
                  href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}&ds_lang=pt`}
                >
                  Assistir
                </a>
              </button>
            </div>
          </div>
        </div>
      );
      
}
