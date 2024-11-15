
import {
    addNewMovie,
    fetchMovies,
    fetchMovies2,
    likeDislikeWatchListMovie
} from "@/app/lib/apiMovies/ApiMoviesFunctions";
import * as type from "@/app/lib/types";
import CardFilm from "@/app/components/CardFilm";
import React from "react";
import LikeButtons from "@/app/components/LikeButtons";
import BackButton from "@/app/components/BackButton";
// The main functional component "Film" which fetches and displays movie details
export default async function Film ({searchParams}: {searchParams: {id: number}}) {

    // Extracting the movie ID from search parameters
    const numero = searchParams.id
    let movieDetails = await fetchMovies2(numero)
    let genreNames
    let idObject
    if(movieDetails && movieDetails.backdrop_path){
        genreNames = movieDetails.genres.map((genre: { name: string; }) => genre.name)
        idObject = movieDetails._id
    } else {
        let addMovie
        if(movieDetails){
            idObject = movieDetails._id
            movieDetails = await fetchMovies(numero)
            addMovie = await addNewMovie(movieDetails,1)
            let addMovieResult = await addMovie.json()
        } else {
            movieDetails = await fetchMovies(numero)
            addMovie = await addNewMovie(movieDetails,2)
            let addMovieResult = await addMovie.json()
            idObject = addMovieResult.insertedId
        }
        genreNames = movieDetails.genres.map((genre: { name: string; }) => genre.name)
    }





    // If movie details are successfully fetched, render the page
    if (movieDetails) {
        return (
            <div className=" h-screen pt-10 pl-10 bg-blackBackground grid grid-cols-2">
                <div>
                    <div className="flex items-center">
                        <BackButton/>
                        <h2 className="text-whitePuro font-poppins font-extrabold text-22 pl-5">Back home</h2>
                    </div>
                    <h1 className="text-whitePuro font-poppins font-extrabold text-63">{movieDetails.title}</h1>
                    < h2 className = "text-whitePuro font-poppins font-semibold text-20" > {genreNames.join(', ')}</h2>
                    <h3 className="text-whitePuro font-poppins font-semibold text-25">{movieDetails.overview}</h3>
                    <LikeButtons id={idObject}/>
                </div>
                <div className="flex justify-center pb-5">
                    <img
                        src={"https://image.tmdb.org/t/p/w300/" + movieDetails.poster_path}
                        alt="Pitt" className="rounded-20 w-7/12 h-full"/>

                </div>
            </div>
        )
    } else {
        return <p>Loading...</p>
    }

};