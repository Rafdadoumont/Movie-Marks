import axios from 'axios';

const getAllMoviesAsync = async () => {
    const token = sessionStorage.getItem('token');
    try {
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/movies/all',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        };
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getMovieByIdAsync = async (movieId) => {
    const token = sessionStorage.getItem('token');
    try {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/movies/${movieId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        };
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteMovieAsync = async (movieId) => {
    const token = sessionStorage.getItem('token');
    try {
        const options = {
            method: 'DELETE',
            url: `http://localhost:3000/movies/delete/${movieId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        };
        await axios.request(options);
    } catch (error) {
        console.log(error);
    }
}

export default { getAllMoviesAsync, getMovieByIdAsync, deleteMovieAsync };