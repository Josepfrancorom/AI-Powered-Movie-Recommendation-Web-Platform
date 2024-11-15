import clientPromise from "@/app/lib/mongoDB/mongoDB";
import {NextResponse} from "next/server";

export async function GET(req: Request, res: Response) {
    // Extract the ID from the URL using a regular expression
    const id = req.url.match(/\bid=(\d+)/);
    // Check if a valid ID exists
    if (id) {
        const client = await clientPromise;
        const db = client.db("MovieRecommender");
        // Perform an aggregation query on the "Movies" collection
        const json = await db.collection('Movies').aggregate([
            {$unwind: "$genres"},
            { $match: { "genres.id": parseInt(id[1],10) } },
            {$project: {_id: 0, "genreName": "$genres.name"}},
            { $limit: 1 }

        ]).toArray();


        return NextResponse.json(
            json,
            { status: 200 },
        );
    } else {
        // If no valid ID is provided, return an empty response with status 400
        const json = null
        return NextResponse.json(
            json,
            { status: 400 },
        );
    }

}