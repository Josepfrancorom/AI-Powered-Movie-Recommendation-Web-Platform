const tokenApi = process.env.NEXT_PUBLIC_TMDB_API_TOKEN
const get = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: tokenApi
    }
};

// **Function to fetch movie details by ID using TMDB API**
export async function fetchMovies(id:number): Promise<any> {
    try{
        const response = await fetch('https://api.themoviedb.org/3/movie/'+id+'?language=en-US', get);
        const json = await response.json()
        return json
    }catch (err){
        return [];
    }

}


// **Function to search for movies by a phrase using TMDB API**
export async function searchMovies(phrase:string): Promise<any> {

    try{
        const response = await fetch('https://api.themoviedb.org/3/search/movie?query='+phrase+'&include_adult=false&language=en-US&page=1', get);
        return await response.json()
    }catch (err){
        console.log(err)
        return [];
    }

}


// **Fetch movie details from local API by ID**
export async function fetchMovies2(id:number): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/DetaillMovie?id='+id,{method:"GET", cache: 'no-store'});
        return await response.json()
    }catch (err){
        console.log(err)
        return [];
    }

}


// **Fetch user's watchlist**
export async function watchListUser(userID:string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/WatchListUser?userID='+userID,{method:"GET", cache: 'no-store'});
        return await response.json()

    }catch (err){
        console.log(err)
        return [];
    }

}



// **Add movie to user's watchlist**
export async function addMovieToAWatchListUser(data:string,userID: string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/WatchListUser?userID='+userID,{
            method:"POST",
            body: JSON.stringify(data),
        });
        return response

    }catch (err){
        console.log(err)
        return [];
    }

}


// **Delete movie from user's watchlist**
export async function deleteMovieToAWatchListUser(data:string,userID: string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/WatchListUser?userID='+userID,{
            method:"DELETE",
            body: JSON.stringify(data),
        });
        return response

    }catch (err){
        console.log(err)
        return [];
    }

}

// **Fetch the list of liked movies for a user**
export async function likeListUser(userID:string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/LikeListUser?userID='+userID,{method:"GET", cache: 'no-store'});
        return await response.json()

    }catch (err){
        console.log(err)
        return [];
    }

}


// **Add a movie to a user's like list**
export async function addMovieToALikeListUser(data:string,userID: string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/LikeListUser?userID='+userID,{
            method:"POST",
            body: JSON.stringify(data),
        });
        return response

    }catch (err){
        console.log(err)
        return [];
    }

}


// **Delete a movie from a user's like list**
export async function deleteMovieToALikeListUser(data:string,userID: string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/LikeListUser?userID='+userID,{
            method:"DELETE",
            body: JSON.stringify(data),
        });
        return response

    }catch (err){
        console.log(err)
        return [];
    }

}

// **Fetch the top 10 rated films from TMDB API**
export async function top10Films(): Promise<any> {

    try{
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', get);
        const json = await response.json()
        const movieData: [] = json.results.slice(0, 10).map((movie: any) => ({
            id: movie.id,
            poster_path: movie.poster_path
        }));
        return movieData
    }catch (err){
        return [];
    }

}

// **Fetch top 10 movies in a specific category for a user**
export async function top10CategoryUser(id:number, userID:string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/Top10CategoryUser?id='+id+'?user='+userID,{method:"GET",});
        let response2 = await response.json()
        const response3 = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=1000&with_genres='+response2, get)
        const response4 = await response3.json()
        const movieData: [] = response4.results.slice(0, 10).map((movie: any) => ({
            id: movie.id,
            poster_path: movie.poster_path
        }));
        const gender = await fetch('http://localhost:3000/api/Gender?id='+response2,{method:"GET",})
        const genderJson = await gender.json()
        // @ts-ignore
        movieData.push(genderJson[0].genreName)
        return movieData

    }catch (err){
        console.log(err)
        return [];
    }

}


export async function likeDislikeWatchListMovie(id:string,userID:string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/LikeDislikeWatchListMovie?id='+id+'?user='+userID,{method:"GET", cache: 'no-store' });
        return await response.json()

    }catch (err){
        console.log(err)
        return [];
    }

}


// **Add a new user to the local database**
export async function addUser(data:string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/NewUser',{
            method:"POST",
            body: JSON.stringify(data),
        });
        return response

    }catch (err){
        console.log(err)
        return [];
    }

}

// **Add a movie to a user's unlike list**
export async function addMovieToAUnLikeListUser(data:string,userID: string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/UnLikeListUser?userID='+userID,{
            method:"POST",
            body: JSON.stringify(data),
        });
        return response

    }catch (err){
        console.log(err)
        return [];
    }

}

// **Delete a movie from a user's unlike list**
export async function deleteMovieToAUnLikeListUser(data:string,userID: string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/UnLikeListUser?userID='+userID,{
            method:"DELETE",
            body: JSON.stringify(data),
        });
        return response

    }catch (err){
        console.log(err)
        return [];
    }

}

// **Fetch recommended movies using local API and Python backend**
export async function recommendation(phrase:string): Promise<any> {
    try{
        const response = await fetch(`http://localhost:3000/api/python?phrase=${phrase}`, {
            method:"GET",
        });
        const result = await response.json()
        if(Array.isArray(result)){
            const movieDetails = [];
            for (const id of result) {
                const details = await fetchMovies(id.id);
                movieDetails.push({ "id": details.id, "poster_path": details.poster_path });
            }
            return movieDetails
        }else {
            console.log(result)
            return []
        }

    }catch (err){
        console.log(err)
        return [];
    }

}

//add New Movie
export async function addNewMovie(data:any,id:number): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/DetaillMovie?id='+id,{
            method:"POST",
            body: JSON.stringify(data),
        });
        return response

    }catch (err){
        console.log(err)
        return [];
    }

}

// **Fetch the user ID using their email address**
export async function getUserId(userEmail:string): Promise<any> {
    try{
        const response = await fetch('http://localhost:3000/api/User?userEmail='+userEmail,{method:"GET",});
        const respuesta = await response.json()
        if(respuesta._id){
            return respuesta._id
        }else {
            return respuesta
        }
    }catch (err){
        console.log(err)
        return [];
    }

}





