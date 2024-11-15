import React from 'react';
import CarouselCard from "../components/CarouselCard";
import NavigationBar from "@/app/components/NavigationBar";
import {top10CategoryUser, top10Films} from "@/app/lib/apiMovies/ApiMoviesFunctions";
import CarouselCard2 from "@/app/components/CarouselCard2"
import { cookies } from 'next/headers';

export default function Dashboard (){



    const cookieStore = cookies();
    const userID = cookieStore.get('userID')?.value || 1;

    return(
        <div className="h-screen bg-blackBackground flex justify-center items-center">
            <div className="mx-24 pb-10">
                <CarouselCard2 id={1} userID={userID}/>
                <CarouselCard2 id={2} userID={userID}/>
                <CarouselCard2 id={3} userID={userID}/>
            </div>
        </div>
    );
};