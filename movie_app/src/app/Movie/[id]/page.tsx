"use client";
import { Movie } from "@/types/movie"

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';


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

    if (!movie) {
        return <p>Carregando...</p>;
    }
    return (
        <div className="filme-info">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            <h3>Sinopse</h3>
            <span>{movie.overview}</span>
            <strong>Avaliação: {movie.vote_average} / 10</strong>
        </div>
    );
}
