import clientPromise from "@/app/lib/mongoDB/mongoDB";
import {ObjectId} from "mongodb";
import {NextResponse} from "next/server";

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
            const result = await db.collection('Unlikelists').updateOne(
                { id_user: userID },
                { $addToSet: { movies: new ObjectId(data) } }
            );
            if(result.modifiedCount === 1) {
                return NextResponse.json(
                    "Movie added to unlikelist successfully.",
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

            const result = await db.collection('Unlikelists').updateOne(
                { id_user: userID},
                {$pull: {movies: new ObjectId(data)} }
            );

            if(result.modifiedCount === 1) {
                return NextResponse.json(
                    "Movie deleted from the unlikelists successfully.",
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