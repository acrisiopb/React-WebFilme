'use client';

import { useState, useEffect } from 'react';
import './index.scss';
import axios from 'axios';
import { TVShow } from '@/types/tvshow';
import Loading from '../Loading';
import SeriesCard from '../SeriesCard';
import { toast } from 'react-toastify';

export default function SeriesList() {
    const [series, setSeries] = useState<TVShow[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getSeries(page);
    }, [page]);

    const getSeries = async (currentPage: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
                params: {
                    api_key: '0a9a35c83a2f677a6d71cdc89de7f87e',
                    language: 'pt-BR',
                    page: currentPage
                }
            });
            setSeries(response.data.results);
        } catch (error) {
            toast.error("Não foi possível carregar a lista de séries.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    // if (isLoading) {
    //     return <Loading />;
    // }

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
