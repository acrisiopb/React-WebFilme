'use client';

import { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { Movie } from '@/types/movie';
import Loading from '../Loading';
import MovieCard from '../MovieCard';
import { toast } from 'react-toastify';


export default function MovieList() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    // Load
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        getMovies(page);
    }, [page]);

    // useEffect(() => {
        
    //     toast("Bem Vindo, este é um projeto feito em NextJS, consumindo uma API de filmes - TMDB, não hospedamos filmes!", {
    //         style: {
    //             background: "#0d6efd",
    //             color: "#fff"
    //         }
    //     });
    // }, []);
    
    const getMovies = async (currentPage: number) => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
                language: 'pt-BR',
                page: currentPage
            }
        }).then(Response => {
            setMovies(Response.data.results);
            //  console.log(Response.data.results);
            setIsLoading(false);
        })
    }
    if (isLoading) {
        return <Loading />
    }


    return (

        <div>
            <h2>Filmes em Destaques</h2>
            <ul className='movie-list'>

                {movies.map((movie) =>
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                )}

            </ul>
            {
                !isLoading && (
                    <div className="pagination">
                        <div className='Page'>{page}</div>
                        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                            Anterior
                        </button>

                        <button onClick={() => setPage((p) => p + 1)}>
                            Próxima
                        </button>
                    </div>
                )

            }
        </div>

    );
}