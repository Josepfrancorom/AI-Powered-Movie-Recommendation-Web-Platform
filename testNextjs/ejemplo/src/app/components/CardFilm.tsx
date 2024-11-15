"use client"
import { useRouter } from 'next/navigation'
import React from 'react';

// @ts-ignore
export default function CardFilm({movieImg, movieId}) {
    const router = useRouter()
    return (
        <div className="w-full h-36">
            <img
                src={movieImg}
                alt="Pitt" className="rounded-8 w-full h-full"
                onClick={() => router.push('/Film?id='+movieId)}/>
        </div>

    );
}