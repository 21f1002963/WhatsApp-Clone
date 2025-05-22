import React from 'react';
import { useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { CircleFadingPlus, Loader2Icon, SearchIcon } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { UserRound } from 'lucide-react';
import Profile from './Profile';
import UserCard from './UserCard';
import { useAuth } from './AuthContext';
function ChatPanel() {
    const { userData } = useAuth();
    const [users, setUsers] = React.useState([]);
    const [isloading, setIsLoading] = React.useState(true);
    const [showProfile, setshowProfile] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    let filteredUsers = users;

    useEffect(() => {
        const getUsers = async () => {
            const snapShot = await getDocs(collection(db, "users"));

            const arrayUsers = snapShot.docs.map((doc) => ({
                user_data:doc.data(),
                user_id: doc.id,
            }));

            setUsers(arrayUsers);
            setIsLoading(false);
        };

        getUsers();
    }, []);

    const onBack = () => {
        setshowProfile(false);
    }

    if(showProfile){
        return <Profile onBack={onBack}></Profile>
    }

    if(searchQuery){
        filteredUsers = users.filter((user) => user.user_data.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }

    return (
        // Top Bar
    <div className='w-[30%] h-full flex flex-col min-w-300px'>
        <div className='bg-[#cdd0d2] py-2 px-4 border-r flex items-center justify-between gap-3'>
            <button onClick={() => setshowProfile(true)} className='flex items-center gap-3'>
                <img
                src={userData.photoURL ||"./default_profile.png"}
                alt="Profile"
                className="w-[50px] h-[50px] rounded-full object-cover"
                ></img>
            </button>
            
            <div className='flex items-end justify-center gap-6 mx-4'>
                <CircleFadingPlus className='w-6 h-6'></CircleFadingPlus>
                <MessageSquare className='w-6 h-6'></MessageSquare>
                <UserRound className='w-6 h-6'></UserRound>
            </div>
        </div>
        
    
        {
        // Chat Panel
        isloading ? <div className='h-full w-full justify-center items-center flex'><Loader2Icon className='h-10 w-10 animate-spin'></Loader2Icon></div> :
            <div className='h-full w-full flex flex-col py-2 px-3'>
                <div className="bg-background flex items-center gap-3 px-3 py-2 rounded-lg ">
                    <SearchIcon className='w-5 h-5'></SearchIcon>
                    <input type="text" placeholder="Search" className='w-full bg-background px-2 rounded-lg focus-within: outline-none'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}/>

                </div>

                <div className='h-full py-4 divide-y max-h-[calc(100vh-152px)] bg-chat-bg overflow-y-scroll'>
                {filteredUsers.map(user => <UserCard key={user.user_id} user={user}></UserCard>)}
                </div>
            </div>

        }
    </div>
    );
}

export default ChatPanel;