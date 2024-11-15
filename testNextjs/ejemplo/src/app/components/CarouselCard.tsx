import React from 'react';
import Card from "@/app/components/CardFilm";
export default function CarouselCard() {

    return (
        <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full h-fit">
                <div
                    className="grid grid-cols-5 gap-6 flex">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <div className="flex items-center ">
                        <a href="#slide2" className="btn btn-circle ">❯</a>
                    </div>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full h-fit">
                <div
                    className="grid grid-cols-6 gap-6 flex">
                    <div className="flex items-center ">
                        <a href="#slide1" className="btn btn-circle ">❮</a>
                    </div>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <div className="flex items-center ">
                        <a href="#slide3" className="btn btn-circle ">❯</a>
                    </div>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img
                    src="https://www.mundodeportivo.com/alfabeta/hero/2023/08/el_caballero_oscuro_batman.jpg?width=1200"
                    className="rounded-lg w-full h-full w-64 h-36"/>
                <div
                    className="absolut fix grid grid-cols-6 gap-4 absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <div className="w-64 h-36">
                        <img
                            src="https://depor.com/resizer/8YoC0v5cW1tr48RYd6pqUSSB13Q=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/35F433RPO5ATHA5PTL4X2HANRM.jpg"
                            alt="Pitt" className="rounded-lg w-full h-full"/>
                    </div>
                    <div className="w-64 h-36">
                        <img
                            src="https://depor.com/resizer/8YoC0v5cW1tr48RYd6pqUSSB13Q=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/35F433RPO5ATHA5PTL4X2HANRM.jpg"
                            alt="Pitt" className="rounded-lg w-full h-full"/>
                    </div>
                    <div className="w-64 h-36">
                        <img
                            src="https://www.mundodeportivo.com/alfabeta/hero/2023/08/el_caballero_oscuro_batman.jpg?width=1200"
                            alt="Pitt" className="rounded-lg w-full h-full"/>
                    </div>
                    <div className="w-64 h-36">
                        <img
                            src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
                            alt="Pitt" className="rounded-lg w-full h-full"/>
                    </div>
                </div>
            </div>
        </div>

    );
}