

'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from "@/app/lib/redux/store";


// @ts-ignore
const ClientProvider = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ClientProvider;
