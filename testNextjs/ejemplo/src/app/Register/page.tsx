'use client'
import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import Image from 'next/image';
import firebase from 'firebase/auth'
import Link from 'next/link';
import {signInWithGoogle,registerWithEmail} from '../lib/firebase/configurationFirebase';
import { useRouter } from 'next/navigation';
import {addUser, getUserId} from "@/app/lib/apiMovies/ApiMoviesFunctions";
export default function Register () {
    // Local states for email, password, username, and any potential error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // Function to handle user registration with email and password
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setError(''); // Reset any error message
        e.preventDefault(); // Prevent default form behavior
        registerWithEmail(email,password).then(async (user: firebase.UserCredential) => {

            // If registration is successful and a valid email exists add user to DB
            if (user.user.email) {
                let usuario = await addUser(user.user.email)
                let usuario2 = await getUserId(user.user.email)
                // Store user ID in localStorage and in cookies
                localStorage.setItem('userID', usuario2);
                document.cookie = `userID=${usuario2}; path=/;`;
                router.push('/Dashboard');
            }
        }).catch((err: any) => {
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already in use.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email format.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('Error registering: ' + err.message);
            }
        })
    };

    // Function to handle Google sign-in
    const googleButton = async () => {
        signInWithGoogle().then(async (user: firebase.UserCredential) => {
            if (user.user.email) {
                // Add user and get their ID, similar to email sign-up process
                let usuario = await addUser(user.user.email)
                let usuario2 = await getUserId(user.user.email)
                // Store user ID in localStorage and cookies, then redirect to Dashboard
                localStorage.setItem('userID', usuario2);
                document.cookie = `userID=${usuario2}; path=/;`;
                router.push('/Dashboard');
            }
        }).catch((err: any) => {
        })
    }



    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>Create an account</h1>
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
                        <button type="submit">Create account</button>
                    </div>
                </form>
                <div className={styles.buttonGoogle}>
                    <Image src='/Google - Original.png' alt="Google icon" width={20} height={20}></Image>
                    <button type="submit" onClick={googleButton}>Continue with Google</button>
                </div>
                <div className={styles.dontAccount}>
                    <Link href="/Login" style={{color: '#70707B'}}>Already Have An Account?</Link>
                    <Link href="/Login" style={{color: '#A0A0AB'}}>Log in</Link>
                </div>
            </div>
        </div>
    );
};