import React from 'react';
import NavigationBar from "../components/NavigationBar";
import CarouselCard from "@/app/components/CarouselCard";


export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className=" bg-blackBackground">
        <div className="bg-blackBackground">
            <NavigationBar/>
        </div>
        {children}
        </body>
        </html>
    )
}