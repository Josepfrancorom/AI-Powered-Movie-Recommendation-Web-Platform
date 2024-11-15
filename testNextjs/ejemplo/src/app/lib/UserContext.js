import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Intenta obtener el ID del usuario del almacenamiento local al cargar la aplicación
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const login = (id) => {
        // Al iniciar sesión, almacena el ID del usuario en el estado y en el almacenamiento local
        setUserId(id);
        localStorage.setItem('userId', id);
    };

    const logout = () => {
        // Al cerrar sesión, limpia el estado y el almacenamiento local
        setUserId(null);
        localStorage.removeItem('userId');
    };

    return (
        <UserContext.Provider value={{ userId, login, logout }}>
    {children}
    </UserContext.Provider>
);
};

export default UserContext;
