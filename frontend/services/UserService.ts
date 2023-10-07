import axios from 'axios';

const getAllUsersAsync = async () => {
    const token = sessionStorage.getItem('token');
    try {
        const options = {
            method: 'GET',
            url: 'http://localhost:3000/users/all',
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

const getUserByIdAsync = async (id: number) => {
    const token = sessionStorage.getItem('token');
    try {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/users/${id}`,
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

const searchUsersAsync = async (searchTerm: string) => {
    const token = sessionStorage.getItem('token');
    try {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/users/search/${searchTerm}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getFollowingListAsync = async () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    try {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/users/following`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                currentUserId: userId,
            },
        };
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const getFollowersListAsync = async () => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');
    try {
        const options = {
            method: 'GET',
            url: `http://localhost:3000/users/followers`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                currentUserId: userId,
            },
        };
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export default { getAllUsersAsync, getUserByIdAsync, searchUsersAsync, getFollowingListAsync, getFollowersListAsync };