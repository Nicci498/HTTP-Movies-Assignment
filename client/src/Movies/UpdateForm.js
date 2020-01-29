import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function UpdateForm(props) {
    const { id } = props.match.params;    

    const defaultMovie = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    }

    const [movie, setMovie] = useState(defaultMovie);
    useEffect(() =>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res =>{
            console.log(res.data);
            setMovie(res.data);
        })
        .catch(err => console.log(err))
    }, [id])
    console.log(id)

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleStars = e =>{
        setMovie({
            ...movie,
            stars: [e.target.value]
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        console.log(movie);
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log(res);
            setMovie(defaultMovie);
            props.history.push('/');
        })
        .catch(err => console.log(err))     
    }
    return(
        <div>
            <h2>Edit Movie</h2>
            <form key={movie.id} onSubmit={handleSubmit}>
                <input name='title' type='text' placeholder='title' value={movie.title} onChange={handleChange}></input>
                <input name='director' type='text' placeholder='director' value={movie.director} onChange={handleChange}></input>
                <input name='metascore' type='text' placeholder='metascore' value={movie.metascore} onChange={handleChange}></input>
                <input name='stars' placeholder='Starring' value={movie.stars} onChange={handleStars}></input>
                <button type='submit'>Submit Changes</button>
            </form>
        </div>
    )
}