import {CarouselItem, Carousel, CarouselContent, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Card from "@/app/components/CardFilm";
import CardFilm from "@/app/components/CardFilm";
import {top10CategoryUser, top10Films} from "@/app/lib/apiMovies/ApiMoviesFunctions";
import React from "react";


// @ts-ignore
export default async function CarouselCard({ id, userID} ) {
    let idFinal = id;
    let arrayFilms = null
    let genreName = null
    if(idFinal === 2){
        arrayFilms = await top10CategoryUser(1,userID);
        genreName = arrayFilms.pop().toUpperCase();

    }else if(idFinal === 3){
        arrayFilms = await top10CategoryUser(2,userID);
        genreName = arrayFilms.pop().toUpperCase();

    }else{
        arrayFilms = await top10Films();
        genreName = "FILMS"

    }

    return (
        <Carousel>
            <h2 className="pt-5 text-whitePuro font-poppins font-normal text-20">TOP 10 {genreName}</h2>
            <CarouselContent className="-ml-4">
                {Array.from({length: arrayFilms.length}).map((_, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
                        <div className="p-1">
                            <CardFilm key={index}
                                      movieImg={"https://image.tmdb.org/t/p/w300/" + arrayFilms[index].poster_path}
                                      movieId={arrayFilms[index].id}/>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white hover:bg-blue-400"/>
            <CarouselNext className="bg-white hover:bg-blue-400"/>
        </Carousel>
    )
}