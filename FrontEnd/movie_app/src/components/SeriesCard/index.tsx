'use client';

import StarRating from "../StarRating";
import './index.scss';
import Link from "next/link";
import { TVShow } from "@/types/tvshow";

interface Props {
    serie: TVShow;
}

export default function SeriesCard({ serie }: Props) {
    return (
        <li className='series-card'>
            <div className="series-poster">
                <img src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} alt={serie.name} />
            </div>
            <div className="series-infos">
                <p className="series-title">
                    {serie.name}
                </p>
                <div className="hidden-content">
                    {serie.overview &&
                        <p className='description'>
                            {serie.overview.length > 100 ? `${serie.overview.substring(0, 100)}..` : serie.overview}
                        </p>
                    }
                    <Link href={`/Series/${serie.id}`} className="btn-default">Ver mais</Link>
                </div>
            </div>
        </li>
    );
}