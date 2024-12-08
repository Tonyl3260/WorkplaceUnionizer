"use client"
import React, { useState, useLayoutEffect } from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import Signup from '@/components/auth/signup/signup'
import HorizontalNavbar from '@/components/horizontal-navbar/horizontal-navbar'
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks/redux';
import { useRouter } from 'next/navigation';

const signup = () => {
    const { isAuthenticated, isLoading, user } = useAppSelector(state => state.auth);
    const router = useRouter()
    const [pageLoad, setPageLoad] = useState<boolean>(false)
    useLayoutEffect(() => {
        const isAuth = isAuthenticated;
        if (isAuth == true) {
            router.push("/search")
        }
        if (isAuthenticated !== null) {
            setPageLoad(true)
        }
    }, [isAuthenticated])
    return (
        <>
            {/* <HorizontalNavbar /> */}
            {pageLoad ?
                <Signup />
                :
                <PropagateLoader />
            }
        </>
    )
}

export default signup