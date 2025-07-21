"use client";
import "./index.scss";

import * as React from 'react';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import api from "@/services/api";
import axios from "axios";
import Loading from "@/components/Loading";

interface FavoriteMovieData {
    movieId: number;
}
export const dynamic = 'force-dynamic';

export default function Dashboard() {
    const { user } = useAuth();
    const [movies, setMovies] = useState<Array<Movie>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadFavoriteMovies() {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.get('/api/movie/save');
                const favoriteMovieData: FavoriteMovieData[] = response.data;
                

                if (favoriteMovieData.length === 0) {
                    setIsLoading(false);
                    return;
                }

                const moviePromises = favoriteMovieData.map(movieData =>
                    axios({
                        method: 'get',
                        url: `https://api.themoviedb.org/3/movie/${movieData.movieId}`,
                        params: {
                            api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
                            language: 'pt-BR'
                        }
                    })
                );

                const movieResponses = await Promise.all(moviePromises);

                const favoriteMovies = movieResponses.map(res => res.data);
                console.log("DADOS DOS FILMES RECEBIDOS:", favoriteMovies);

                setMovies(favoriteMovies);

            } catch (error) {
                // console.error("Erro ao buscar filmes favoritos:", error);
                toast.error("Não foi possível carregar seus filmes favoritos.");
            } finally {
                setIsLoading(false);
            }
        }

        loadFavoriteMovies();
    }, [user]);

    async function removeMovie(id: number) {
        try {
            // console.log(id);
            await api.delete(`/api/movie/save/${id}`);

            const filtMoves = movies.filter((movie) => movie.id !== id);
            setMovies(filtMoves);

            toast.success("Filme removido da sua lista.");
        } catch (error) {
            // console.error("Erro ao remover filme:", error);
            toast.error("Erro ao remover o filme.");
        }
    }


    // if (isLoading) {
    //     return <Loading />;
    // }

    return (
        <div className="dashboard-container">

            <h2>Dashboard | Filmes salvos</h2>
            {movies.length === 0 ? (
                <span className="info">Você não possui nenhum filme salvo.</span>
            ) : (
                <ul className="dashboard-movie-list">
                    {movies.map((movie: Movie) => (
                        <li key={movie.id} className="movie-card">
                            <div className="movie-poster">
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                            </div>
                            <div className="movie-infos">
                                <p className="movie-title">{movie.title}</p>
                                <div className="hidden-content">
                                    {movie.overview && (
                                        <p className='description'>
                                            {movie.overview.length > 100
                                                ? `${movie.overview.substring(0, 100)}...`
                                                : movie.overview
                                            }
                                        </p>
                                    )}
                                    <div className="buttons-wrapper">
                                        <a
                                            href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}&ds_lang=pt`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-details"
                                        >
                                            Assistir
                                        </a>
                                        <button onClick={() => removeMovie(movie.id)} className="btn-remove">
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}