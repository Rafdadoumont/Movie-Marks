import React from "react";
import { useState, useEffect } from "react";
import { TextField, FormControl, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';

import styles from './signinform.module.css'
import AuthService from "../../../services/AuthService";

const SignInForm = () => {
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

        const response = await AuthService.signInAsync({ username, password })
        if (response.status == 200) {
            setStatusMessages([
                { message: "Login successful. Redirecting to homepage", type: "success" },
            ])
            push('/');
        } else {
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
                <h1 style={{ fontSize: 60 }}>Welcome back!</h1>
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
                    sx={{ width: 400, borderRadius: 10 }}
                    value={password}
                    error={passwordError}
                />
                {statusMessages.map((statusMessage, index) => (
                    <div key={index} className={styles[statusMessage.type]}>
                        {statusMessage.message}
                    </div>
                ))}
                <Button variant="contained" color="primary" type="submit" sx={{ width: 400, borderRadius: 10, textTransform: "none" }}>Log in</Button>
            </Stack>
        </form>
    )
}

export default SignInForm;