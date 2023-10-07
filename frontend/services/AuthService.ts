import axios from 'axios';

const signUpAsync = async ({username: username, password: password}) => {
    try {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/auth/signup',
            data: {
                username: username,
                password: password
            }
        };
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

const signInAsync = async ({username: username, password: password}) => {
    try {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/auth/signin',
            data: {
                username: username,
                password: password
            },
            body: JSON.stringify({username: username, password: password}),
        };
        const response = await axios.request(options);

        const tokenResponse = await response.data.token;
        const usernameResponse = await response.data.username;
        const userIdResponse = await response.data.userId;
            
        sessionStorage.setItem('token', tokenResponse);
        sessionStorage.setItem('username', usernameResponse);
        sessionStorage.setItem('userId', userIdResponse);
            
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

const signOut = () => {
    sessionStorage.clear();
}

export default { signUpAsync, signInAsync, signOut };