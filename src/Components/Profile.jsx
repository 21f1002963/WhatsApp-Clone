import React from 'react'
import { ArrowLeft, Edit2Icon, Loader2Icon } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { CheckIcon } from 'lucide-react';

function Profile(props) {
    const { userData, handleUpdateName, handleUpdateStatus, uploading, error, UpdatePhoto } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth);
        navigate('/login');
    }
    const [name, setName] = React.useState(userData?.Name || '');
    const [status, setStatus] = React.useState(userData?.status || '');
  
    return (
    <div className="w-[30%] h-full flex flex-col bg-background">
        <div className='bg-green-400 px-4 py-5 text-lg text-white flex items-center gap-3'>
            <button onClick={props.onBack}>
                <ArrowLeft className='w-6 h-6'></ArrowLeft>
            </button>
            <div>Profile</div>
        </div>
        <div className='flex flex-col items-center justify-center gap-5 mt-8'>
            <label className={`group relative cursor-pointer rounded-full overflow-hidden ${uploading ? 'pointer-events-none' : ''}`}>
                <img src={userData.photoURL} className='rounded-full h-[160px] w-[160px] object-cover' alt="profile_picture"></img>
    
                {uploading ? (
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'>
                        <Loader2Icon className='w-6 h-6 text-primaryDense animate-spin z-10'></Loader2Icon>
                    </div>
                ) : (
                    <div className='absolute inset-0 bg-black/30 flex items-center justify-center z-10 group-hover:flex hidden'>
                        <Edit2Icon className='h-6 w-6 text-white'></Edit2Icon>
                    </div>
                )}

                <input 
                type='file'
                accept='image/png, image/jpeg, image/jpg'
                onChange={(e) => {
                    UpdatePhoto(e.target.files[0]);}
                }
                className='hidden'
                ></input>
            </label>

            {error && <div className='text-red-500'>{error}</div>}


            <div className='flex flex-col bg-white w-full py-4 px-8'>
                <label className='text-sm text-primaryDense mb-2'>Your Name: </label>
                <div className='flex items-center width-full'>
                    <input 
                    value={name}
                    className="w-full bg-transparent"
                    placeholder='Update your name'
                    onChange= {(e) =>{
                        setName(e.target.value)
                    }}></input>
                <button onClick={() => handleUpdateName(name)}>
                    <CheckIcon className="w-5 h-5 text-primaryDense"></CheckIcon>
                </button>
                </div>
            </div>            

            <div className='flex flex-col bg-white w-full py-4 px-8'>
                <label className='text-sm text-primaryDense mb-2'>Your Status: </label>
                <div className='flex items-center width-full'>
                    <input 
                    value={status}
                    className="w-full bg-transparent"
                    placeholder='Update your status'
                    onChange= {(e) =>{
                        setStatus(e.target.value)
                    }}></input>
                <button onClick={() => handleUpdateStatus(status)}> 
                    <CheckIcon className="w-5 h-5 text-primaryDense"></CheckIcon>
                </button>
                </div>
            </div>

            <button onClick={handleLogout} className='bg-primary px-3 py-3 rounded text-white hover: bg-secondary hover:bg-primaryDense'>Logout</button>
        </div>
    </div>
    );
}

export default Profile