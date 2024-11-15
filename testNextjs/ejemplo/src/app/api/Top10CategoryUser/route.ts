import {NextResponse} from "next/server";
import clientPromise from "@/app/lib/mongoDB/mongoDB";
import {ObjectId} from "mongodb";


export async function GET(req: Request, res: Response) {
    const id = req.url.match(/\bid=(\d+)/);
    const urluserID = req.url.match(/[?&]user=([\w\d]+)/)
    let json
        if((!(id) || id[1] == '1') && urluserID){
            console.log('he entrat')
            console.log(urluserID[1])
            const client = await clientPromise;
            const userID =  new ObjectId(urluserID[1]);
            const db = client.db("MovieRecommender");
            const genreResult = await db.collection('Likelists').aggregate([
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
                {$project: {"genres": "$movies_info.genres"}},
                { $unwind: "$genres" },
                {
                    $group: {
                        _id: "$genres.id",
                        count: { $sum: 1 }
                    }
                },
                { $sort: { count: -1 , _id: 1} },
                { $limit: 1 },

            ]).toArray();

            console.log(genreResult[0])
            if (genreResult.length > 0) {
                json = genreResult[0]._id
            }else {
                json = 28
            }

        }else if(urluserID){
                   const client = await clientPromise;
                    const userID =  new ObjectId(urluserID[1]);
                    const db = client.db("MovieRecommender");
                    const genreResult = await db.collection('Likelists').aggregate([
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
                        {$project: {"genres": "$movies_info.genres"}},
                        { $unwind: "$genres" },
                        {
                            $group: {
                                _id: "$genres.id",
                                count: { $sum: 1 }
                            }
                        },
                        { $sort: { count: -1 , _id: 1} },
                        {$skip: 1},
                        { $limit: 1 },

                    ]).toArray();

                    console.log(genreResult[0])
                    if (genreResult.length > 0) {
                        json = genreResult[0]._id
                    }else {
                        json = 35
                    }
        }

    return NextResponse.json(
        json,
        { status: 200 },
    );
}