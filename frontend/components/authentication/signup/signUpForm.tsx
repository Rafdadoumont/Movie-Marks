import React from "react";
import { useState, useEffect } from "react";
import { TextField, FormControl, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';

import styles from './signupform.module.css'
import AuthService from "../../../services/AuthService";

const SignUpForm = () => {
    const { push } = useRouter();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [statusMessages, setStatusMessages] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setUsernameError(false)
        setPasswordError(false)
        setStatusMessages([])

        if (username == '') {
            console.log("username is empty")
            setUsernameError(true)
            setStatusMessages([
                { message: "Username is required", type: "error" },
            ])
            return;
        }

        if (password == '') {
            console.log("password is empty")
            setPasswordError(true)
            setStatusMessages([
                { message: "Password is required", type: "error" },
            ])
            return;
        }

        const user = {
            username,
            password
        }

        const response = await AuthService.signUpAsync(user)
        if (response == undefined) { return; }
        if (response.status == 200) {
            setStatusMessages([
                { message: "Registration successful. Redirecting to login...", type: "success" },
            ])
            push('/login');
        } else {
            setUsernameError(true)
            setStatusMessages([
                { message: response.data.message, type: "error" },
            ])
        }
    }


    useEffect(() => {
    }, [statusMessages])

    return (
        <form autoComplete="off" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2} className={styles.form}>
                <h1 style={{ fontSize: 100 }}>Hi there!</h1>
                <p>Welcome to MovieMarks. The Movie Social Platform</p>
                <TextField
                    label="Username"
                    onChange={e => setUsername(e.target.value)}
                    variant="outlined"
                    type="text"
                    sx={{ width: 400, borderRadius: 10 }}
                    value={username}
                    error={usernameError}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    variant="outlined"
                    type="password"
                    sx={{ width: 400 }}
                    value={password}
                    error={passwordError}
                />
                {statusMessages.map((statusMessage, index) => (
                    <p key={index}>
                        {statusMessage.message}
                    </p>
                ))}
                <Button variant="contained" color="primary" type="submit" sx={{ width: 400, borderRadius: 10, textTransform: "none" }}>Register</Button>
            </Stack>
        </form>
    )
}

export default SignUpForm;