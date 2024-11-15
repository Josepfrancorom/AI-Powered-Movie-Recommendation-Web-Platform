// pages/index.tsx
'use client'
import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {loginWithEmail, signInWithGoogle} from '../lib/firebase/configurationFirebase';
import firebase from "firebase/auth";
import {addUser, getUserId} from "@/app/lib/apiMovies/ApiMoviesFunctions";
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "@/app/lib/redux/store";
import { setSessionId } from '../lib/redux/sessionSlice';

// Login component definition
export default function Login () {
    // Local states for email, password, and any potential error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Function to handle login with email and password
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setError('')
        e.preventDefault();

        // Attempt login using Firebase's loginWithEmail function
        loginWithEmail(email,password).then(async (user: firebase.UserCredential) => {
            if(user.user.email) {
                let usuario = await getUserId(user.user.email)

                localStorage.setItem('userID', usuario);
                document.cookie = `userID=${usuario}; path=/;`;
                console.log(localStorage.getItem('userID'))
                router.push('/Dashboard');
            }
        }).catch((err: any) => {
            // Error handling for login issues
            if (err.code === 'auth/user-not-found') {
                setError('No user found with this email.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email format.');
            } else if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password')
            } else {
                setError('Error signing in: ' + err.message);
            }
        })
    };

    // Function to handle Google login
    const googleButton = async () => {
        signInWithGoogle().then(async (user: firebase.UserCredential) => {
            if (user.user.email) {
                let usuario = await getUserId(user.user.email)
                if(usuario.length === 0){
                    console.log("null usuario")
                    usuario = await addUser(user.user.email)
                    usuario = await getUserId(user.user.email)
                }
                // Store user ID in localStorage and cookies, then navigate to Dashboard
               localStorage.setItem('userID', usuario);
                document.cookie = `userID=${usuario}; path=/;`;
                router.push('/Dashboard');
            }
        }).catch((err: any) => {
        })
    }



    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Login to your account</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email" className={styles.titleinputContainer}>Email</label>
                        <input className={styles.inputEmail}
                               type="email"
                               id="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{color: '#D1D1D6'}}
                        />
                    </div>
                    {error && (
                        <div className="flex justify-center items-center w-full">
                            <p className="text-red-600 animate-shake">
                                {error || 'An error occurred'}
                            </p>
                        </div>
                    )}
                    <div className={styles.buttonLogin}>
                        <button type="submit">Login now</button>
                    </div>
                </form>
                <div className={styles.buttonGoogle}>
                    <Image src='/Google - Original.png' alt="Google icon" width={20} height={20}></Image>
                    <button type="submit" onClick={googleButton}>Continue with Google</button>
                </div>
                <div className={styles.dontAccount}>
                    <Link href="/Register" style={{color: '#70707B'}}>Don't have an account?</Link>
                    <Link href="/Register" style={{color: '#A0A0AB'}}>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

