import React from 'react';

import NavigationBar from "@/app/components/NavigationBar";
import CarouselCard from "@/app/components/CarouselCard";
import Card from "@/app/components/CardFilm";
import CardFilm from "@/app/components/CardFilm";
import {CarouselItem} from "@/components/ui/carousel";
import {searchMovies} from "@/app/lib/apiMovies/ApiMoviesFunctions";

// Main functional component for the search feature
export default async function Search ({searchParams}: {searchParams: {phrase: string}}){

    // If there is a search phrase provided, fetch search results
    if(searchParams.phrase){
        const search = await searchMovies(searchParams.phrase);
        const searchData = search.results.slice(0, 8)

        // Render the search results
        return(
            <div className="h-screen pl-10 pr-10 bg-blackBackground pb-10">
                <h1 className="pt-5 text-whitePuro font-poppins font-normal text-40">Search: {searchParams.phrase}</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-5 md:basis-1/2 lg:basis-1/4">
                    {Array.from({length: searchData.length}).map((_, index) => (
                        <CardFilm key={index}
                                  movieImg={"https://image.tmdb.org/t/p/w300/" + searchData[index].poster_path}
                                  movieId={searchData[index].id}/>
                    ))}
                </div>
            </div>
        );
    }else {
        // If no search phrase is provided, render a default view
        return(
            <div className="pl-10 pr-10 bg-blackBackground pb-10">
                <h1 className="pt-5 text-whitePuro font-poppins font-normal text-40">Search</h1>
            </div>
        );
    }
};