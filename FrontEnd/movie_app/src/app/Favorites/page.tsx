"use client";
import "./index.scss";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { toast } from "react-toastify";



export default function Favorites() {
    const [movie, setMovie] = useState<Array<Movie>>([]);
    const [serie, setSerie] = useState<Array<Movie>>([]);

    useEffect(() => {
        function loadSaved() {
            const myList = localStorage.getItem("@MovieBBG");
            const myList2 = localStorage.getItem("@serieBBG");

            if (myList) {
                setMovie(JSON.parse(myList));
            }

            if (myList2) {
                setSerie(JSON.parse(myList2));
            }
        }

        loadSaved();
    }, []);

    //remove movie favorites
    function removeMove(id: number) {
        let filtMoves = movie.filter((item) => item.id !== id);
        setMovie(filtMoves);
        localStorage.setItem("@MovieBBG", JSON.stringify(filtMoves));
        toast.success("Filme excluído da sua lista");
    }
    
    function removeSerie(id: number) {
        let filtSeries = serie.filter((item) => item.id !== id);
        setSerie(filtSeries);
        localStorage.setItem("@serieBBG", JSON.stringify(filtSeries));
        toast.success("Série excluída da sua lista");
    }

    return (
        <div>
            <h2>Meus Favoritos</h2>
            {movie.length === 0 && serie.length === 0 && (
                <div className="container">
                    <span className="info">Você não possui nenhum filme ou série salvo.</span>
                </div>
            )}

            <div className="container">
                {movie.map((movie) => (
                    <Card key={movie.id} className="card-container">
                        <CardMedia
                            component="img"
                            height="140"
                            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <CardContent style={{ flex: "1 1 auto" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {movie.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {(movie.overview || "").length > 100
                                    ? `${(movie.overview || "").substring(0, 100)}... `
                                    : (movie.overview || "")}
                                <Link href={`/Movie/${movie.id}`} className="btn-default">Ver mais</Link>
                            </Typography>
                        </CardContent>
                        <CardActions style={{ marginTop: "auto" }}>
                            <Button size="small" color="error" className="btn" onClick={() => removeMove(movie.id)}>
                                Remover
                            </Button>
                        </CardActions>
                    </Card>
                ))}

                {serie.map((serie) => (
                    <Card key={serie.id} className="card-container">
                        <CardMedia
                            component="img"
                            height="140"
                            image={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                            alt={serie.title}
                        />
                        <CardContent style={{ flex: "1 1 auto" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {serie.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {(serie.overview || "").length > 100
                                    ? `${(serie.overview || "").substring(0, 100)}... `
                                    : (serie.overview || "")}
                                <Link href={`/Series/${serie.id}`} className="btn-default">Ver mais</Link>
                            </Typography>
                        </CardContent>
                        <CardActions style={{ marginTop: "auto" }}>
                            <Button size="small" color="error" className="btn" onClick={() => removeSerie(serie.id)}>
                                Remover
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
}