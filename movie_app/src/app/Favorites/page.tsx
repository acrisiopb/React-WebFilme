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



export default function Favorites() {


    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem("@MovieBBG");
        setMovie(JSON.parse(myList) || []);
    }, []);


    return (

        <div className="container">

            {movie.map((movie) => (
                <Card key={movie.id} className="card-container">
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {movie.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}..`
                                : movie.overview
                            }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ flex: '1 1 auto' }}>
                        <Button size="small" color="error" className="btn">
                            Remove
                        </Button>
                    </CardActions>
                </Card>
            ))}

        </div>

    );
}