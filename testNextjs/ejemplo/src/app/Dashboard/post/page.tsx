
"use client"
import Head from 'next/head';
import Chatbot from "@/app/components/Chatbot";




export default function Home() {

    // @ts-ignore
    const hola = localStorage.getItem('userID')
    return (
        <div>
            <Head>
                <title>My Chatbot</title>
                <meta name="description" content="My chatbot app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>{hola}</h1>
                <h1 className="text-3xl font-bold text-center my-8">Welcome to My Chatbot</h1>
                <Chatbot />
            </main>
        </div>
    );
}
