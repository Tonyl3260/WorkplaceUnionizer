"use client"
import React, { useEffect } from 'react'
import { useAppDispatch } from '@/lib/redux/hooks/redux';
import { listenToAuthChanges } from '@/lib/redux/features/auth/authSlice';
const Listener = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(listenToAuthChanges());

    }, [])
    return (
        <div className='h-[calc(100vh-80px)] flex justify-center'>
            {children}
        </div>
    )
}

export default Listener