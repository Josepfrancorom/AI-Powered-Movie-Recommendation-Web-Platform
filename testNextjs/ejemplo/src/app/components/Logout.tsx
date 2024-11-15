"use client"


import Link from "next/link";
import {useDispatch} from "react-redux";
import {clearSessionId} from "@/app/lib/redux/sessionSlice";

export default function Logout (){
    //const dispatch = useDispatch();
    function deleteCookie(name: any) {
        document.cookie = name + '=; Max-Age=0; path=/';
    }


    const handleLogout = () => {
        // Aquí despachamos la acción para limpiar la sesión
        localStorage.removeItem('userID');
        deleteCookie('userID');
    };

    return (
        <Link href="/Login" className="font-poppins font-normal" onClick={handleLogout}>
            Logout
        </Link>
    );
}