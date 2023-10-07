import axios from "axios";

const addToFollowing = async (otherUserId: number) => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId')
    const username = sessionStorage.getItem('username')
    try {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/follow/add',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                username: username,
                currentUserId: userId,
                otherUserId: otherUserId
            }
        };
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const removeFromFollowing = async (otherUserId: number) => {
    const token = sessionStorage.getItem('token')
    const userId = sessionStorage.getItem('userId')
    const username = sessionStorage.getItem('username')
    try {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/follow/remove',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                username: username,
                currentUserId: userId,
                otherUserId: otherUserId,
            }
        }
        const response = await axios.request(options)
        return response;
    } catch (error) {
        console.log(error)
    }
}

export default { addToFollowing, removeFromFollowing}