import clientPromise from "@/app/lib/mongoDB/mongoDB";
import {NextResponse} from "next/server";

export async function GET(req: Request, res: Response) {
    const userEmail = req.url.match(/[?&]userEmail=([^&]+)/);

    if (userEmail) {
        const client = await clientPromise;
        const db = client.db("MovieRecommender");
        const json = await db.collection('Users').findOne({email: userEmail[1]});
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