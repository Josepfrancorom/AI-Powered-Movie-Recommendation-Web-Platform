import {NextResponse} from "next/server";
import clientPromise from "@/app/lib/mongoDB/mongoDB";
import {ObjectId} from "mongodb";

// GET request handler to fetch liked movies of a user
export async function GET(req: Request, res: Response) {
    const userIDParameter = req.url.match(/[?&]userID=([\w\d]+)/);
    if (userIDParameter) {
        console.log(userIDParameter[1])
    }
    if(userIDParameter) {
        const client = await clientPromise;
        const userID =  new ObjectId(userIDParameter[1]);
        const db = client.db("MovieRecommender");
        // Aggregate query to get liked movies of a user
        const json = await db.collection('Likelists').aggregate([
            {$match: {"id_user": userID}},
            {$unwind: "$movies"},
            {
                $lookup: {
                    from: "Movies",
                    localField: "movies",
                    foreignField: "_id",
                    as: "movies_info"
                }
            },
            {$unwind: "$movies_info"},
            {$project: {"id": "$movies_info.id", "poster_path": "$movies_info.poster_path"}}
        ]).toArray();

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

// POST request handler to add a movie to the liked list
export async function POST(req: Request, res: Response) {
    const userIDParameter = req.url.match(/[?&]userID=([\w\d]+)/);
    if (userIDParameter) {
        console.log(userIDParameter[1])
    }

    if(userIDParameter && req.body) {
        try {

            const client = await clientPromise;
            const userID = new ObjectId(userIDParameter[1]);
            const db = client.db("MovieRecommender");
            const data = await req.json()

            // Update the Likelists collection by adding the movie to the user's liked list
            const result = await db.collection('Likelists').updateOne(
                { id_user: userID },
                { $addToSet: { movies: new ObjectId(data) } }
            );
            if(result.modifiedCount === 1) {
                return NextResponse.json(
                    "Movie added to watchlist successfully.",
                    {status: 200},
                );
            } else {
                return NextResponse.json(
                    { error: 'User not found or document not modified.'},
                    {status: 404},
                );
            }
        } catch (error){
            return NextResponse.json(
                error,
                { status: 500 },
            );
        }
    } else {

        const json = null
        return NextResponse.json(
            json,
            { status: 400 },
        );
    }

}

// DELETE request handler to remove a movie from the liked list
export async function DELETE(req: Request, res: Response) {
    const userIDParameter = req.url.match(/[?&]userID=([\w\d]+)/);
    if (userIDParameter) {
        console.log(userIDParameter[1])
    }

    if(userIDParameter && req.body) {
        try {

            const client = await clientPromise;
            const userID = new ObjectId(userIDParameter[1]);
            const db = client.db("MovieRecommender");
            const data = await req.json();

            // Update the Likelists collection by removing the movie from the user's liked list
            const result = await db.collection('Likelists').updateOne(
                { id_user: userID},
                {$pull: {movies: new ObjectId(data)} }
            );

            if(result.modifiedCount === 1) {
                return NextResponse.json(
                    "Movie deleted from the likelists successfully.",
                    {status: 200},
                );
            } else {
                return NextResponse.json(
                    { error: 'User not found or document not modified.'},
                    {status: 404},
                );
            }
        } catch (error){
            return NextResponse.json(
                error,
                { status: 500 },
            );
        }
    } else {

        const json = null
        return NextResponse.json(
            json,
            { status: 400 },
        );
    }

}