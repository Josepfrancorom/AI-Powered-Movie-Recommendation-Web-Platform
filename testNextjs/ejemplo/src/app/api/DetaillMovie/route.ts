import type { NextApiRequest, NextApiResponse } from "next";
import {NextResponse} from "next/server";
import clientPromise from "@/app/lib/mongoDB/mongoDB";
import {ObjectId} from "mongodb"


// GET request handler to fetch a specific movie by its ID
export async function GET(req: Request, res: Response) {
    // Extracting the movie ID from the URL using a regex pattern
    const idMovie = req.url.match(/\bid=(\d+)/);


    if (idMovie) {
        // Connect to MongoDB and access the 'Movies' collection
        const client = await clientPromise;
        const db = client.db("MovieRecommender");
        // Find a movie with the matching ID
        const json = await db.collection('Movies').findOne({id: parseInt(idMovie[1])});
        return NextResponse.json(
            json,
            { status: 200 },
        );
    } else {

        const json = null
        return NextResponse.json(
            json,
            { status: 400 },
        );
    }

}

// POST request handler to insert or update a movie in the database
export async function POST(req: Request, res: Response) {

    const id = req.url.match(/\bid=(\d+)/);
    if(req.body) {
        try {

            const client = await clientPromise;
            const db = client.db("MovieRecommender");
            const data = await req.json()
            let result
            if(id && (parseInt(id[1]) == 1)) {

                result = await db.collection('Movies').updateOne({ id: data.id }, { $set: data });
                if(result.modifiedCount > 0) {
                    return NextResponse.json(
                        result,
                        {status: 200},
                    );
                } else {
                    return NextResponse.json(
                        { error: 'Movie not added successfully'},
                        {status: 404},
                    );
                }
            } else {

                result = await db.collection('Movies').insertOne(data);
                if(result.insertedId) {
                    let newOverviewResult
                    newOverviewResult = await db.collection('NewOverview').insertOne({
                        id: data.id,
                        overview: data.overview,
                    });
                    if(newOverviewResult.insertedId){
                        return NextResponse.json(
                            result,
                            {status: 200},
                        );
                    } else {
                        return NextResponse.json(
                            { error: 'Movie not added successfully'},
                            {status: 404},
                        );
                    }
                } else {
                    return NextResponse.json(
                        { error: 'Movie not added successfully'},
                        {status: 404},
                    );
                }

            }
        } catch (error){
            console.log(error)
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