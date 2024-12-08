"use client"
import { useEffect, useLayoutEffect, useState } from 'react';
import HorizontalNavbar from '@/components/horizontal-navbar/horizontal-navbar'
import Login from '../../../components/auth/login/login'
import { useAppSelector } from '@/lib/redux/hooks/redux';
import { useRouter } from 'next/navigation';
import PropagateLoader from 'react-spinners/PropagateLoader';
const signin = () => {
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
    // useEffect(() => {
    //     if (isAuthenticated !== null) {
    //         setPageLoad(true)
    //     }
    // }, [])
    return (<>
        {/* <HorizontalNavbar /> */}
        {pageLoad ?
            <Login />
            :
            <PropagateLoader />
        }
    </>
    )
}

export default signin