import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loader2Icon } from 'lucide-react';

function Protected_Route(props) {
    const {userData, loading} = useAuth();
    const children = props.children;

    if(loading) {
        return <div className="w-screen h-screen flex items-center justify-center bg-white">
            <Loader2Icon className='w-10 h-10 animate-spin'></Loader2Icon>
        </div>
    }

    if(userData) {
        return children;
    }
    else{
        return (
            <Navigate to={'/login'}></Navigate>
        )
    }
}

export default Protected_Route