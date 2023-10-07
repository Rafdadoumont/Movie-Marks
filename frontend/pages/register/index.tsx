import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import Link from "next/link";
import SignUpForm from '../../components/authentication/signup/signUpForm';
import theme from '../../theme/theme';
import styles from './register.module.css';
import coverImage from '../../images/cover.jpg';

const SignUp: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className={styles.root}>
                <div className={styles.leftSection}>
                    <h1 className={styles.movieMarks}>MovieMarks</h1>
                    <SignUpForm />
                    <div className={styles.bottomText}>
                        <p>Already have an account?</p>
                        <Link href='/login' className={styles.loginButton}>Log in</Link>
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

export default SignUp;