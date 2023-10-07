import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import MovieResults from '../results/movieResults';
import { Card, CardContent, Stack, TextField, Rating, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router';
import styles from './markform.module.css'
import MarkService from '../../../services/MarkService';

const MarkForm = ({ onFormSubmit }) => {
    const router = useRouter();
    const [title, setTitle] = useState("");

    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState(null);

    const [movieError, setMovieError] = useState(null);
    const [ratingError, setRatingError] = useState(null);
    const [commentError, setCommentError] = useState(null);
    const [errorMessages, setErrorMessages] = useState([]);

    const [searchResult, setSearchResult] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const handleSearch = async () => {
        setSearchLoader(true);
        setSearchResult([]);

        try {
            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/search/movie?api_key=47207e416e3f40ecdb8ab5ea5490f802&language=en-US&query=${title}&page=1&include_adult=false`,
            };
            const response = await axios.request(options);
            setSearchResult(response.data);
        } catch (error) {
            setSearchError(error);
            console.log(error);
        } finally {
            setSearchLoader(false);
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrorMessages = [];

        if (movie == null) {
            setMovieError(true);
            newErrorMessages.push("Movie is required");
        }

        if (rating == null) {
            setRatingError(true);
            newErrorMessages.push("Rating is required");
        }

        if (comment == null) {
            setCommentError(true);
            newErrorMessages.push("Comment is required");
        }

        setErrorMessages(newErrorMessages);

        if (movie != null && rating != null) {
            const userId = parseInt(sessionStorage.getItem('userId'));
            await MarkService.addMarkAsync(userId, movie.id, rating, comment)
            onFormSubmit();
        }
    }

    useEffect(() => {
        handleSearch();
    }, [title])

    const results = searchResult['results'] || []; // handle case when searchResult['results'] is undefined

    const uniqueLabels = results.slice(0, 10).reduce((acc, result) => {
        const title = result ? result['title'] : '';
        const id = result ? result['id'] : '';
        if (title && !acc.some(obj => obj.label == title)) {
            acc.push({ label: title, id: id });
        }
        return acc;
    }, []);

    return (
        <Card sx={{ minWidth: 275, minHeight: 400, maxHeight:500, padding: 2 }}>
        <form autoComplete='off' onSubmit={handleSubmit}>
            <Stack spacing={2} direction="column" alignItems="center" className={styles.form}>
                <h2>Add mark</h2>
                <Autocomplete
                    disablePortal
                    id="movie"
                    options={uniqueLabels}
                    noOptionsText="Type to find movies"
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Movie" error={movieError} onChange={(e) => setTitle(e.target.value)} />}
                    onChange={(event, newValue) => { setMovie(newValue) }}
                />
                <Rating name="rating" sx={{ borderColor: '#FAAF00' }} defaultValue={0} max={10} value={rating} onChange={(event, newRating) => { setRating(newRating); }} />
                <TextField
                    id="comment"
                    label="Comment"
                    multiline
                    rows={4}
                    sx={{ width: 300 }}
                    error={commentError}
                    onChange={(e) => { setComment(e.target.value); }}
                />
                {errorMessages.map((message, index) => {
                    return <p key={index} className={styles.errorMessage}>{message}</p>
                })}
                <Button variant="contained" type="submit" sx={{ width: 300 }}>Submit</Button>
            </Stack>
        </form>
        </Card>
    )
}

export default MarkForm;