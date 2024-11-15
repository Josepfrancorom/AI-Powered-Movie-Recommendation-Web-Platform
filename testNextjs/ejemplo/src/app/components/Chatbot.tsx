// components/Chatbot.tsx
'use client'
import React, { useState } from 'react';
import {fetchMovies2, recommendation} from "@/app/lib/apiMovies/ApiMoviesFunctions";
import CardFilm from "@/app/components/CardFilm";

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([{ text: "Hello! Welcome to our movie recommendation service. Before we proceed, could you please let us know what movie you want to see", sender: 'bot' }]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [recommendationData, setrecommendationData] = useState<any[]>([{"id":122,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
        {"id":157336,"poster_path":"gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"},
        {"id":155,"poster_path":"qJ2tW6WMUDux911r6m7haRef0WH.jpg"},
        {"id":324857,"poster_path":"iiZZdoQBEYBv6id8su7ImL0oCbD.jpg"},
    ]);
    const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isProcessing) return;
        setIsProcessing(true);
        const message = e.currentTarget.message.value.trim();
        if (!message) return;
        setMessages(messages => [...messages, { text: message, sender: 'user' }]);
        setMessages(messages => [...messages, { text: "Thank you for your patience! Please hold on a moment as we tailor our recommendations specifically to your request for movies", sender: 'bot'}])
        e.currentTarget.reset();
        let prueba = await recommendation(message)
        setrecommendationData(prueba)
        setMessages(messages => [...messages, { text: "Great news! Our recommendations have been updated based on your preferences. Take a look", sender: 'bot'}])
        setIsProcessing(false);

    };

    return (
        <div className="mt-10 grid grid-cols-2 w-full">
            <div className="max-w-md bg-gray-100 p-4 rounded-3xl shadow-md">
                <div className="h-64 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-2 my-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                        >
                            <div
                                className={`rounded-2xl px-3 py-2 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleMessageSubmit}>
                    <input
                        type="text"
                        name="message"
                        placeholder="Type your message..."
                        className="w-full border rounded-3xl px-3 py-2 mt-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-3xl px-3 py-2 mt-2"
                    >
                        Send
                    </button>
                </form>
            </div>
            {recommendationData && (
                <div>
                    <div className="grid grid-cols-2 gap-8">
                        {Array.from({length: recommendationData.length}).map((_, index) => (
                            <CardFilm key={index} movieImg={"https://image.tmdb.org/t/p/w300/" + recommendationData[index].poster_path} movieId={recommendationData[index].id}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
