import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Container } from '.';

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if(!authentication && authStatus !== authentication){  
            navigate('/dashboard')
        }
        setLoader(false)
    }, [authStatus, navigate, authentication]);

    return !loader ? <>{children}</> :  (
        <>
        <div className="flex md:flex-row flex-col w-full h-screen gap-2 p-2">
            <div className="flex gap-2">
                {[...new Array(1)].map((i) => (
                    <div
                    key={"first-array" + i}
                    className="md:h-full h-16 md:w-72 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"></div>
                ))}
            </div>
            <div className="flex flex-col gap-2 flex-1">
                {[...new Array(1)].map((i) => (
                    <div
                    key={"second-array" + i}
                    className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"></div>
                ))}
            </div>
        </div>
        </>
    )
}


