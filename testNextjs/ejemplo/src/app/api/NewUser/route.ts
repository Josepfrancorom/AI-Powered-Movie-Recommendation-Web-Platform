import clientPromise from "@/app/lib/mongoDB/mongoDB";
import {ObjectId} from "mongodb";
import {NextResponse} from "next/server";

//Add newUser to the DB
export async function POST(req: Request, res: Response) {

    if(req.body) {
        try {
            const client = await clientPromise;
            const db = client.db("MovieRecommender");
            const data = await req.json();
            const newUser = {email: data};
            const find = await db.collection('Users').findOne({ email: newUser.email });
            let result;

            if(!find){
                result = await db.collection('Users').insertOne(newUser)
            } else {
                result = null
            }

            if(result){
                const list = {id_user: result.insertedId, movies: []}
                const likeList = await db.collection('Likelists').insertOne(list);
                if(likeList.acknowledged){
                    const dislikeList = await db.collection('Unlikelists').insertOne(list);
                    if(dislikeList.acknowledged){
                        const watchList = await db.collection('Watchlists').insertOne(list);
                        if (watchList.acknowledged){
                            return NextResponse.json(
                                "User added successfully.",
                                {status: 200},
                            );
                        } else {
                            return NextResponse.json(
                                { error: 'Error adding Watchlists'},
                                {status: 404},
                            );
                        }
                    } else {
                        return NextResponse.json(
                            { error: 'Error adding DisLikeList'},
                            {status: 404},
                        );
                    }
                } else {
                    return NextResponse.json(
                        { error: 'Error adding LikeList'},
                        {status: 404},
                    );
                }

            } else {
                return NextResponse.json(
                    { error: 'Error adding new user'},
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