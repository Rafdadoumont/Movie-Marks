import React, { useEffect } from "react"
import { useRouter } from 'next/navigation';


const Error: React.FC = () => {
    const { push } = useRouter();

    useEffect(() => {
        setTimeout(() => {
            push('/login')
        }, 2000)
    }
    )


    return (
        <>
            <div>
                You are not authorized to view this page. Redirecting to login page...
            </div>
        </>
    )
}

export default Error