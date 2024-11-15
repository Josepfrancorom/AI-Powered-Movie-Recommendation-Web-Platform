"use client"
import React, {useEffect, useState} from 'react';
import {
    addMovieToALikeListUser, addMovieToAUnLikeListUser,
    addMovieToAWatchListUser, deleteMovieToALikeListUser, deleteMovieToAUnLikeListUser, deleteMovieToAWatchListUser,
    likeDislikeWatchListMovie, watchListUser
} from "@/app/lib/apiMovies/ApiMoviesFunctions";



// @ts-ignore
export default function LikeButtons({ id }) {
    const [like, setLike] = useState(false);
    const [dislike, setDisLike] = useState(false);
    const [watchList, setWatchList] = useState(false);
    const [userID, setuserID] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const userID = localStorage.getItem('userID');
            if (userID) {
                setuserID(userID)
                try {
                    const data = await likeDislikeWatchListMovie(id, userID);
                    setLike(data.like);
                    setDisLike(data.dislike)
                    setWatchList(data.watchlist)
                } catch (error) {
                    console.error('Error fetching like list:', error);
                }
            }
        };
        fetchData();
    }, []);

    async function likeClick() {
        setLike(!like);
        if (like) {
            let prueba = await deleteMovieToALikeListUser(id, userID)
        } else {
            let prueba = await addMovieToALikeListUser(id, userID);
        }

    }

    async function disLikeClick() {

        setDisLike(!dislike)
        if (dislike) {
            let prueba = await deleteMovieToAUnLikeListUser(id, userID)
        } else {
            let prueba = await addMovieToAUnLikeListUser(id, userID);
        }
    }

    async function watchListClick() {

        setWatchList(!watchList)
        if (watchList) {
            let prueba = await deleteMovieToAWatchListUser(id, userID)
        } else {
            let prueba = await addMovieToAWatchListUser(id, userID);
        }
    }


    return (
        <div className="mt-10 grid grid-cols-3 gap-5 w-fit">
            <button onClick={watchListClick}
                    className="rounded-2xl w-40 h-10 bg-blue-400 font-bold font-lato text-whitePuro flex items-center justify-center">
                {watchList ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="17px" height="17px">
                    <path
                        d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"
                        stroke="#F9F9F9" strokeWidth="4" strokeLinecap="round"/>
                    </svg>) : (
                    <svg width="17" height="17" viewBox="0 0 22 22" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.9048 2.98828V11.4883M10.9048 19.9883V11.4883M10.9048 11.4883H19.4048H2.40479"
                            stroke="#F9F9F9" strokeWidth="4" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                    )
                }
                <span className="ml-2 mt-0.5">Watchlist</span>

            </button>
            <button onClick={likeClick}
                    className={like ? "rounded-2xl w-40 h-10 bg-green-500 font-bold font-lato text-whitePuro flex items-center justify-center" : "rounded-2xl w-40 h-10 bg-stone-400 font-bold font-lato text-whitePuro flex items-center justify-center"}>

                <svg width="20" height="20" viewBox="0 0 27 26" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.74191 20.875C9.26426 20.875 8.81958 20.6188 8.64479 20.1907C8.26892 19.2702 8.0625 18.2677 8.0625 17.2188C8.0625 15.3239 8.73608 13.5806 9.86524 12.1986C10.035 11.9909 10.2839 11.8639 10.5399 11.7685C11.0718 11.5702 11.5416 11.2113 11.9034 10.7671C12.7732 9.69916 13.8694 8.81034 15.1225 8.16773C15.9349 7.7511 16.6398 7.13214 16.9817 6.30919C17.2209 5.73335 17.3438 5.11886 17.3438 4.49866V3.8125C17.3438 3.36377 17.7215 3 18.1875 3C19.5855 3 20.7188 4.09131 20.7188 5.4375C20.7188 6.6851 20.4267 7.86702 19.905 8.92335C19.6062 9.52821 20.0253 10.3125 20.7209 10.3125H24.2374C25.3924 10.3125 26.4262 11.0643 26.5485 12.1703C26.5991 12.6277 26.625 13.0922 26.625 13.5625C26.625 16.6474 25.5091 19.4814 23.6449 21.7105C23.2088 22.2319 22.5347 22.5 21.8395 22.5H17.3215C16.7774 22.5 16.2368 22.4155 15.7206 22.2498L12.2169 21.1252C11.7007 20.9595 11.1601 20.875 10.616 20.875H9.74191Z"
                        fill='white'/>
                    <path
                        d="M3.93542 12.4544C3.33166 13.9297 3 15.5369 3 17.2188C3 18.5405 3.20484 19.8162 3.58563 21.018C3.8774 21.9388 4.8047 22.5 5.8045 22.5H6.82576C7.32697 22.5 7.63654 21.9602 7.41476 21.5274C6.74903 20.2282 6.375 18.7655 6.375 17.2188C6.375 15.3682 6.91037 13.6381 7.84009 12.1642C8.11572 11.7272 7.80829 11.125 7.27738 11.125H6.09303C5.157 11.125 4.27862 11.6158 3.93542 12.4544Z"
                        fill='white'/>
                </svg>

                <span className="ml-2 mt-0.5">Like</span>
            </button>
            <button onClick={disLikeClick}
                    className={dislike ? "rounded-2xl w-40 h-10 bg-red-400 font-bold font-lato text-whitePuro flex items-center justify-center" : "rounded-2xl w-40 h-10 bg-stone-400 font-bold font-lato text-whitePuro flex items-center justify-center"}>

                <svg width="20" height="20" viewBox="0 0 28 26" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.352 5.95835L19.5589 5.95835C20.4698 7.24039 21 8.77625 21 10.4271C21 12.0779 20.4698 13.6138 19.5589 14.8958L19.387 14.8958C18.4463 14.8958 17.5974 15.3788 17.0169 16.0662C16.1149 17.1342 14.978 18.023 13.6785 18.6656C12.836 19.0822 12.105 19.7012 11.7505 20.5242C11.5024 21.1 11.375 21.7145 11.375 22.3347V23.0208C11.375 23.4696 10.9832 23.8333 10.5 23.8333C9.05025 23.8333 7.875 22.742 7.875 21.3958C7.875 20.1482 8.17782 18.9663 8.71893 17.91C9.02878 17.3051 8.59411 16.5208 7.87278 16.5208L4.22599 16.5208C3.02824 16.5208 1.95615 15.769 1.82934 14.6631C1.7769 14.2057 1.75 13.7412 1.75 13.2708C1.75 10.1859 2.90719 7.35197 4.8405 5.12285C5.2927 4.60145 5.99178 4.33334 6.71274 4.33334L11.398 4.33334C11.9623 4.33334 12.5229 4.41782 13.0582 4.58351L16.6918 5.70818C17.2271 5.87387 17.7877 5.95835 18.352 5.95835Z"
                        fill='white'/>
                    <path
                        d="M25.2799 15.1915C25.9061 13.7162 26.25 12.1089 26.25 10.4271C26.25 9.10535 26.0376 7.82967 25.6427 6.62789C25.3401 5.70703 24.3785 5.14585 23.3416 5.14585L22.2825 5.14585C21.7628 5.14585 21.4417 5.68563 21.6717 6.11846C22.3621 7.41769 22.75 8.88033 22.75 10.4271C22.75 12.2776 22.1948 14.0077 21.2306 15.4817C20.9448 15.9186 21.2636 16.5208 21.8142 16.5208H23.0424C24.0131 16.5208 24.924 16.0301 25.2799 15.1915Z"
                        fill='white'/>
                </svg>

                <span className="ml-2 ">DisLike</span>
            </button>
        </div>
    )

}