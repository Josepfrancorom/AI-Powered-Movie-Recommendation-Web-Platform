"use client"
import React, {useEffect, useState} from 'react';

import NavigationBar from "@/app/components/NavigationBar";
import CarouselCard from "@/app/components/CarouselCard";
import Card from "@/app/components/CardFilm";
import CardFilm from "@/app/components/CardFilm";
import {CarouselItem} from "@/components/ui/carousel";
import {likeListUser, top10CategoryUser} from "@/app/lib/apiMovies/ApiMoviesFunctions";


export default function Like (){
    // State to hold user's liked movies list
    const [likeListUserData, setLikeListUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetching the liked movies data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            const userID = localStorage.getItem('userID');
            if (userID) {
                try {
                    // Fetch the list of liked movies for the user
                    const data = await likeListUser(userID);
                    setLikeListUserData(data);
                } catch (error) {
                    console.error('Error fetching like list:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    // If the data is still loading, show a loading message
    if (loading) {
        return <div className="h-screen pl-10 pr-10 bg-blackBackground pb-10">
            <h1 className="pt-5 text-whitePuro font-poppins font-normal text-40">Loading ...</h1>
        </div>;
    }

    // Render the list of liked movies once the data is loaded
    return (
        <div className="h-screen pl-10 pr-10 bg-blackBackground pb-10">
            <h1 className="pt-5 text-whitePuro font-poppins font-normal text-40">Movies I Like</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-5 md:basis-1/2 lg:basis-1/4">
                {Array.from({length: likeListUserData.length}).map((_, index) => (
                    <CardFilm key={index} movieImg={"https://image.tmdb.org/t/p/w300/" + likeListUserData[index].poster_path} movieId={likeListUserData[index].id}/>
                ))}
            </div>
        </div>
    );
};