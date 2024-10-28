"use client"
import React from 'react'
import HorizontalNavbar from "@/components/horizontal-navbar/horizontal-navbar";
import VerticalNavbar from "@/components/vertical-navbar/vertical-navbar";
import { Provider } from 'react-redux';
import { AppStore, makeStore } from '../lib/redux/store'
const app = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const store: AppStore = makeStore();
    return (
        <Provider store={store}>
            <div className='min-h-screen flex justify-center '>
                <HorizontalNavbar />
                <div className='mt-16'>
                    <VerticalNavbar />
                    {children}
                </div>
            </div>
        </Provider>
    )
}

export default app