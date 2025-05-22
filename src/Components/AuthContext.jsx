import React, {useContext, useEffect} from 'react'
import { onAuthStateChanged, updateEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { updateDoc } from 'firebase/firestore';
import { uploadBytesResumable } from 'firebase/storage';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthWrapper({children}) {
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [uploading, setUploading] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      setLoading(true);
      if(currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
          const { photoURL, name, email_id, last_seen, status } = docSnap.data();
          await lastSeen(currentUser)
          setUserData({
            user_id: currentUser.uid,
            photoURL: photoURL,
            Name: name,
            email_id: email_id,
            last_seen,
            status: status? status : ""
          });
        }
      }
      setLoading(false);
    })
    
      return () => {
        unsubscribe();
      }
  }, []);

  const lastSeen = async (user) => {
    const date = new Date();
    const timeStamp = date.toLocaleTimeString("en-US",{
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    if (user?.user_id?.indexOf(".") !== -1) {
      console.error("Invalid user ID:", user.user_id);
      return;
    }

    await updateDoc(doc(db, "users", user.user_id), {
      last_seen: timeStamp,
    });

  }

  const handleUpdateName = async (newName) => {
    await updateDoc(doc(db, "users", userData.user_id), {
      name: newName,
    });
  }

  const handleUpdateStatus = async (newStatus) => {
    await updateDoc(doc(db, "users", userData.user_id), {
      status: newStatus,
    });
  }


  const UpdatePhoto = async (img) => {
    const storageRef = ref(storage, `profile_picture/${userData.user_id}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on('state_changed',
      () => {
        setUploading(true);
        setError(null);
      },
      () => {
        setUploading(false);
        setError('Failed to upload image');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          async (downloadURL) => {
            await updateDoc(doc(db, "users", userData.user_id), {
              photoURL: downloadURL,
            });
            
            setUserData({
              ...userData,
              photoURL: downloadURL
          });

            setUploading(false);
            setError(null);
          }
        )
      }
    )
  }

  return (
   <>
        <AuthContext.Provider value={{userData, setUserData, loading, handleUpdateName, handleUpdateStatus, UpdatePhoto, uploading, error}}>
        {children}
        </AuthContext.Provider>
   </> 
  )
}

export default AuthWrapper;