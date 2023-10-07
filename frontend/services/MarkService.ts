import axios from 'axios';

const getAllMarksAsync = async () => {
    const token = sessionStorage.getItem('token');
    try {
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/marks/all',
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

const getMarksForLoggedInUserAsync = async () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId')
    const username = sessionStorage.getItem('username')
    try {
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/marks/allforuser',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'userId': userId,
                'username': username
            },
        };
        const response = await axios.request(options);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const addMarkAsync = async (userId, movieId, rating, comment) => {
    const token = sessionStorage.getItem('token');
    try {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/marks/add',
            data: {
                userId: userId,
                movieId: movieId,
                rating: rating,
                comment: comment
            },
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

const updateMarkAsync = async (markId, rating, comment) => {
    const token = sessionStorage.getItem('token');
    try {
        const options = {
            method: 'PUT',
            url: 'http://localhost:3000/marks/update',
            data: {
                markId: markId,
                rating: rating,
                comment: comment
            },
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

const deleteMarkAsync = async (markId) => {
    const token = sessionStorage.getItem('token');
    try {
        const options = {
            method: 'DELETE',
            url: `http://localhost:3000/marks/delete/${markId}`,
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

export default { getAllMarksAsync, getMarksForLoggedInUserAsync, addMarkAsync, updateMarkAsync, deleteMarkAsync };