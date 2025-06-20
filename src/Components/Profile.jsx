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
    <div className="w-[30%] h-full flex flex-col bg-gradient-to-br from-[#e8f5e9] to-[#f2f2f2]">
        <div className='bg-green-400 px-4 py-5 text-lg text-white flex items-center gap-3 shadow-md'>
            <button onClick={props.onBack} className="hover:bg-green-500 rounded-full p-1 transition">
                <ArrowLeft className='w-6 h-6'/>
            </button>
            <div className="font-semibold tracking-wide">Profile</div>
        </div>
        <div className='flex flex-col items-center justify-center gap-5 mt-8'>
            <label className={`group relative cursor-pointer rounded-full overflow-hidden shadow-lg transition-all duration-200 ${uploading ? 'pointer-events-none opacity-70' : 'hover:scale-105'}`}> 
                <img src={userData.photoURL} className='rounded-full h-[160px] w-[160px] object-cover border-4 border-primary shadow' alt="profile_picture" />
                {uploading ? (
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'>
                        <Loader2Icon className='w-8 h-8 text-primaryDense animate-spin z-10'/>
                    </div>
                ) : (
                    <div className='absolute inset-0 bg-black/30 flex items-center justify-center z-10 group-hover:flex hidden'>
                        <Edit2Icon className='h-8 w-8 text-white'/>
                    </div>
                )}
                <input 
                    type='file'
                    accept='image/png, image/jpeg, image/jpg'
                    onChange={(e) => { UpdatePhoto(e.target.files[0]); }}
                    className='hidden'
                />
            </label>
            {error && <div className='text-red-500 text-base font-medium'>{error}</div>}
            <div className='flex flex-col bg-white w-full py-4 px-8 rounded-xl shadow gap-2'>
                <label className='text-sm text-primaryDense mb-2 font-semibold'>Your Name</label>
                <div className='flex items-center width-full gap-2'>
                    <input 
                        value={name}
                        className="w-full bg-transparent text-base font-medium focus:outline-none border-b border-primary/30 focus:border-primary transition px-1 py-1"
                        placeholder='Update your name'
                        onChange= {(e) =>{ setName(e.target.value) }}
                    />
                    <button onClick={() => handleUpdateName(name)} className="p-1 rounded hover:bg-primary/10 active:bg-primary/20 transition">
                        <CheckIcon className="w-5 h-5 text-primaryDense"/>
                    </button>
                </div>
            </div>            
            <div className='flex flex-col bg-white w-full py-4 px-8 rounded-xl shadow gap-2'>
                <label className='text-sm text-primaryDense mb-2 font-semibold'>Your Status</label>
                <div className='flex items-center width-full gap-2'>
                    <input 
                        value={status}
                        className="w-full bg-transparent text-base font-medium focus:outline-none border-b border-primary/30 focus:border-primary transition px-1 py-1"
                        placeholder='Update your status'
                        onChange= {(e) =>{ setStatus(e.target.value) }}
                    />
                    <button onClick={() => handleUpdateStatus(status)} className="p-1 rounded hover:bg-primary/10 active:bg-primary/20 transition"> 
                        <CheckIcon className="w-5 h-5 text-primaryDense"/>
                    </button>
                </div>
            </div>
            <button onClick={handleLogout} className='bg-primary px-4 py-3 rounded-lg text-white text-base font-semibold shadow hover:bg-primaryDense active:bg-primary transition w-full mt-2'>Logout</button>
        </div>
    </div>
    );
}

export default Profile