'use client';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import axios from "axios";
import './index.scss';
import Link from "next/link";

export default function MovieCarousel() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
                        language: 'pt-BR',
                        page: 1
                    }
                });
                // We'll take the top 5 movies for the carousel
                setMovies(response.data.results.slice(0, 5));
            } catch (error) {
                console.error("Erro ao buscar filmes para o carrossel:", error);
            }
        };

        getMovies();
    }, []);

    return (
        <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
        >
            {movies.map(movie => (
                <div key={movie.id} className="carousel-slide">
                    <div className="carousel-image">
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                        />
                    </div>
                    <div className="carousel-legend">
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                        <Link href={`/Movie/${movie.id}`} className="legend-button">
                            Ver Mais
                        </Link>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}