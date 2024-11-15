import {NextResponse} from "next/server";
import clientPromise from "@/app/lib/mongoDB/mongoDB";
import {ObjectId} from "mongodb";

export async function GET(req: Request, res: Response) {
    // Extract 'id' and 'user' parameters from the URL
    const movieIDParameter = req.url.match(/[?&]id=([\w\d]+)/);
    const urluserID = req.url.match(/[?&]user=([\w\d]+)/)

    // Check if both parameters are present
    if(movieIDParameter && urluserID) {
        const userID = new ObjectId(urluserID[1])
        const client = await clientPromise;
        const idMovie =  new ObjectId(movieIDParameter[1]);
        const db = client.db("MovieRecommender");
        // Check if the movie is in the user's watchlist
        const watchlist = await db.collection('Watchlists').aggregate([
            { $match: { "id_user": userID } },
            { $unwind: "$movies" },
            { $match: { "movies": idMovie } },
            { $limit: 1 }
        ]).toArray()

        // Check if the movie is in the user's likelist
        const likelist = await db.collection('Likelists').aggregate([
            { $match: { "id_user": userID } },
            { $unwind: "$movies" },
            { $match: { "movies": idMovie } },
            { $limit: 1 }
        ]).toArray()

        // Check if the movie is in the user's dislikelist
        const dislikelist = await db.collection('Unlikelists').aggregate([
            { $match: { "id_user": userID } },
            { $unwind: "$movies" },
            { $match: { "movies": idMovie } },
            { $limit: 1 }
        ]).toArray()

        let likeValue,dislikeValue,watchlistValue
        if(watchlist[0]){
            watchlistValue = true
        } else{
            watchlistValue = false
        }

        if(likelist[0]){
            likeValue = true
        } else{
            likeValue= false
        }

        if(dislikelist[0]){
            dislikeValue = true
        } else{
            dislikeValue = false
        }
        const json = {
            like: likeValue,
            dislike: dislikeValue,
            watchlist: watchlistValue
        };

            return NextResponse.json(
            json,
            {status: 200},
        );
    } else {

        const json = null
        return NextResponse.json(
            json,
            { status: 400 },
        );
    }
}