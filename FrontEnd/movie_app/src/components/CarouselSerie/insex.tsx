'use client';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";
import axios from "axios";
import './index.scss';
import Link from "next/link";

export default function SerieCarousel() {
    const [series, setSeries] = useState<Movie[]>([]);

    useEffect(() => {
        const getSeries = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
                    params: {
                        api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
                        language: 'pt-BR',
                        page: 1
                    }
                });
                // We'll take the top 5 movies for the carousel
                setSeries(response.data.results.slice(0, 5));
            } catch (error) {
                console.error("Erro ao buscar series para o carrossel:", error);
            }
        };

        getSeries();
    }, []);

    return (
        <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
        >
            {series.map(serie => (
                <div key={serie.id} className="carousel-slide">
                    <div className="carousel-image">
                        <img
                            src={`https://image.tmdb.org/t/p/original${serie.backdrop_path}`}
                            alt={serie.title}
                        />
                    </div>
                    <div className="carousel-legend">
                        <h2>{serie.title}</h2>
                        <p>{serie.overview}</p>
                        <Link href={`/Series/${serie.id}`} className="legend-button">
                            Ver Mais
                        </Link>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}