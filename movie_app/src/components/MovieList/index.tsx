'use client'

import { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';

export default function MovieList() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies();
    }, []);


    const getMovies = () =>{
        axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params:{
                api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
                language: 'pt-BR'
            }
        }).then(Response => {
            setMovies(Response.data.results);
            //  console.log(Response.data.results);
        })
    }

    return (
        <ul className='movie-list'>
            {movies.map((movie) =>
               <li className='movie-card'>
                <p>
                {movie.title}
                </p>
                <p className='description'>
                {movie.overview}
                </p>
                <img  width={500} height={500} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
                <p>
                 {movie.vote_average}
                </p>
               </li>
            )}
         
        </ul>
    );
}
