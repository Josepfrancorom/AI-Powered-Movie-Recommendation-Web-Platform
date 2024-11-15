"use client"

import {useState} from "react";
import { useRouter } from 'next/navigation'

export default function SearchBar (){
    const router = useRouter()
    const [inputValue, setInputValue] = useState('');
    const search= (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log(inputValue)
            router.push('/Dashboard/Search?phrase='+inputValue);

        }
    };

    return (
        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto"
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={search}/>
    );
}