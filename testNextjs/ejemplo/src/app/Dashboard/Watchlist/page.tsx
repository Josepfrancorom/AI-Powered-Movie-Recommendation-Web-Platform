"use client"
import React, {useEffect, useState} from 'react';

import NavigationBar from "@/app/components/NavigationBar";
import CarouselCard from "@/app/components/CarouselCard";
import Card from "@/app/components/CardFilm";
import CardFilm from "@/app/components/CardFilm";
import {CarouselItem} from "@/components/ui/carousel";
import {fetchMovies2, likeListUser, watchListUser} from "@/app/lib/apiMovies/ApiMoviesFunctions";
export default function Watchlist (){
    //const movieId:string = "https://www.mundodeportivo.com/alfabeta/hero/2023/08/el_caballero_oscuro_batman.jpg?width=1200"

    //const  watchList   = await watchListUser("660d1295c5f15328f7173c87")
    const [watchList, setWatchList] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const userID = localStorage.getItem('userID');
            if (userID) {
                try {
                    const data = await watchListUser(userID);
                    setWatchList(data);
                } catch (error) {
                    console.error('Error fetching like list:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="h-screen pl-10 pr-10 bg-blackBackground pb-10">
            <h1 className="pt-5 text-whitePuro font-poppins font-normal text-40">Loading ...</h1>
        </div>;
    }

    return(
        <div className="h-screen pl-10 pr-10 bg-blackBackground pb-10">
            <h1 className="pt-5 text-whitePuro font-poppins font-normal text-40">Watchlist</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-5 md:basis-1/2 lg:basis-1/4">
                {Array.from({ length: watchList.length }).map((_, index) => (
                    <CardFilm key={index} movieImg={"https://image.tmdb.org/t/p/w300/" + watchList[index].poster_path} movieId={watchList[index].id}/>
                ))}
            </div>
        </div>
    );
};