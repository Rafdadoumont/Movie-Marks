import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import Link from "next/link";
import SignInForm from '../../components/authentication/signin/signInForm';
import theme from '../../theme/theme';
import styles from './login.module.css';
import coverImage from '../../images/cover.jpg';

const SignIn: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.root}>
                <div className={styles.leftSection}>
                    <h1 className={styles.movieMarks}>MovieMarks</h1>
                    <SignInForm />
                    <div className={styles.bottomText}>
                        <p>Don't have an account yet?</p>
                        <Link href='/register' className={styles.loginButton}>Register</Link>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.imageContainer}>
                        <Image src={coverImage} alt='cover'></Image>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default SignIn;