'use client';

import { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { Movie } from '@/types/movie';
import Loading from '../Loading';
import MovieCard from '../MovieCard';


export default function MovieList() {

    const [movies, setMovies] = useState<Movie[]>([]);

    // Load
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        getMovies();
    }, []);


    const getMovies = async () => {
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
                language: 'pt-BR'
            }
        }).then(Response => {
            setMovies(Response.data.results);
            //  console.log(Response.data.results);
        })
        setIsLoading(false);
    }
    if (isLoading) {
      return <Loading/>
    }

    return (
        <ul className='movie-list'>
            {movies.map((movie) =>
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            )}

        </ul>
    );
}
