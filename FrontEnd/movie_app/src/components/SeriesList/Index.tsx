'use client';

import { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { Serie } from '@/types/movie'; 
import Loading from '../Loading';
import SeriesCard from '@/components/SeriesCard';

export default function SeriesList() {
    const [series, setSeries] = useState<Serie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getSeries(page);
    }, [page]);

    const getSeries = async (currentPage: number) => {
        setIsLoading(true);
        await axios({
            method: 'get',
            url: 'https://api.themoviedb.org/3/discover/tv', // Endpoint for series
            params: {
                api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
                language: 'pt-BR',
                page: currentPage
            }
        }).then(Response => {
            setSeries(Response.data.results);
            setIsLoading(false);
        }).catch(error => {
            console.error("Erro ao buscar séries:", error);
            setIsLoading(false);
        });
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <h2>Séries em Destaque</h2>
            <ul className='series-list'>
                {series.map((serie) =>
                    <SeriesCard
                        key={serie.id}
                        serie={serie}
                    />
                )}
            </ul>
            <div className="pagination">
                <div className='Page'>{page}</div>
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                    Anterior
                </button>
                <button onClick={() => setPage((p) => p + 1)}>
                    Próxima
                </button>
            </div>
        </div>
    );
}