"use client";
import "./index.scss";


import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { toast } from "react-toastify";


export interface props {
    movie: Movie
}

export default function Favorites() {


    const [movie, setMovie] = useState<Array<Movie>>([]);

    useEffect(() => {
        const myList = localStorage.getItem("@MovieBBG");
        setMovie(JSON.parse(myList) || []);
    }, []);

    //remove movie favorites
    function removeMove(id) {
        let filtMoves = movie.filter((movie) => {
            return (movie.id !== id);
        });

        setMovie(filtMoves);

        toast.success("Filme excluído da sua lista");

        localStorage.setItem("@MovieBBG", JSON.stringify(filtMoves));
    }

    return (
        <div>
            <h2>Meus Favoritos</h2>
            <div className="container">
                {movie.length === 0 && <span className="info">Você não possui nenhum filme salvo. </span>}
                {movie.map((movie: Movie) => (
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
                                    ? `${(movie.overview || "").substring(0, 100)}..`
                                    : movie.overview || ""}
                                <Link href={`/Movie/${movie.id}`} className="btn-default">Ver mais</Link>
                            </Typography>
                        </CardContent>
                        <CardActions style={{ marginTop: "auto" }}>
                            <Button size="small" color="error" className="btn" onClick={() => removeMove(movie.id)}>
                                Remove
                            </Button>
                        </CardActions>
                    </Card>

                ))}
            </div>
        </div>

    );
}