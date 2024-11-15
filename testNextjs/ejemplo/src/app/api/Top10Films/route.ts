import {NextResponse} from "next/server";

export async function GET(req: Request, res: Response) {
    const json = [{"id":122,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
        {"id":123,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
        {"id":124,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
        {"id":125,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
        {"id":126,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
        {"id":127,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
        {"id":128,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
        {"id":129,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
        {"id":130,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
        {"id":131,"poster_path":"rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"},
    ];


    return NextResponse.json(
        json,
        { status: 200 },
    );
}