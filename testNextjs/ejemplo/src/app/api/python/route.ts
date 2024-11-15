import type { NextApiRequest, NextApiResponse } from "next";
import {NextResponse} from "next/server";
import clientPromise from "@/app/lib/mongoDB/mongoDB";
import {exec} from "node:child_process";
import fs from 'fs-extra'
import {url} from "node:inspector";
export async function GET(req: Request, res: Response) {



    const parsedUrl = new URL(`http://localhost${req.url}`);
    const phrase = parsedUrl.searchParams.get('phrase') || '';
    console.log(phrase)

    let dataJsonOutput: any;

    try {
        const response = await fetch('http://localhost:8000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phrase: phrase }), // Puedes enviar datos adicionales aquí
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud al servidor');
        }

        const data = await response.json();


        const client = await clientPromise;
        const db = client.db("MovieRecommender");
        const dataJsonOutput = await db.collection('Movies').find(
            { id: {$in: data.message.map((entry: any[]) => entry[1]).map((id: string) => parseInt(id))} },
            { projection: { _id: 0, id: 1, poster_path: 1 } }
        ).toArray();

        if(dataJsonOutput.length > 0){
            return NextResponse.json(dataJsonOutput, { status: 200 });
        } else {
            return NextResponse.json(
                { error: 'No recommendation'},
                {status: 404},
            );
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json("Error Api recomendator", { status: 400 });
    }





}