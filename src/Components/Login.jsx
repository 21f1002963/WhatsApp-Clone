import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebase.js";
import { Fingerprint, LogIn  } from 'lucide-react';
import { db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

async function createUser(user) {
  const uid = user.uid;
  const photoURL = user.photoURL;
  const name = user.displayName;
  const email = user.email;

  const date = new Date();
  const timeStamp = date.toLocaleTimeString("en-US",{
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  await setDoc(doc(db, "users", uid), {
    user_id: uid,
    photoURL: photoURL,
    name: name,
    email_id: email,
    last_seen: timeStamp
  });
}

function Login() {
  const Navigate = useNavigate();
  const handleLogin = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    await createUser(result.user);
    Navigate("/")
  }
  
  return (
    <>
    <div className="h-[180px] bg-primary">
      <div className='flex ml-[200px] pt-[40px] items-center gap-[16px] font-bold'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png" alt="WhatsApp" className='w-8' />
        <div className="text-white">WHATSAPP</div>
      </div>
    </div>
    
    <div className="h-[calc(100vh-180px)] bg-[#eff2f5] flex justify-center items-center relative">
      <div className="h-[95%] w-[50%] bg-white shadow-2xl flex flex-col justify-center items-center gap-[16px] absolute -top-[90px]">
        <Fingerprint className="w-[64px] h-[64px] text-primary" strokeWidth='1'/>
        <div className='font-bold text-[25px]'>Sign In</div>
        <div className='text-[15px] opacity-50'>Sign in with your Google Account</div>

        <button onClick={handleLogin} className='flex items-center gap-[8px] bg-primary text-white px-[16px] py-[8px] rounded-[8px]'>
          <div>
            Sign in with Google
          </div> 
          <LogIn/>
        </button>
      </div>
    </div>
    
    </>
  )
}

export default Login