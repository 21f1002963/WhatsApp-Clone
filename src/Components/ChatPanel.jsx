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

            // Filter out the current user
            setUsers(arrayUsers.filter(user => user.user_id !== userData?.user_id));
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
    <div className="w-[30%] h-full flex flex-col min-w-300px bg-white/60 backdrop-blur-xl border-r border-[#e3e1db] shadow-2xl">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-primary to-primaryDense py-3.5 px-7 border-b flex items-center justify-between gap-3 shadow-lg rounded-br-2xl">
            <button onClick={() => setshowProfile(true)} className="flex items-center gap-3 hover:scale-110 transition-transform">
                <img
                src={userData.photoURL ||"./default_profile.png"}
                alt="Profile"
                className="w-[52px] h-[52px] rounded-full object-cover border-4 border-white shadow-lg hover:ring-4 hover:ring-primary/30 transition-all duration-200"
                />
            </button>
            <div className="flex items-end justify-center gap-7 mx-4">
                <CircleFadingPlus className="w-7 h-7 hover:text-white hover:scale-125 transition-all duration-150 cursor-pointer"/>
                
                <UserRound className="w-7 h-7 hover:text-white hover:scale-125 transition-all duration-150 cursor-pointer"/>
            </div>
        </div>
        {/* Search and User List */}
        {
        isloading ? <div className="h-full w-full justify-center items-center flex"><Loader2Icon className="h-10 w-10 animate-spin text-primary"/></div> :
            <div className="h-full w-full flex flex-col py-4 px-5">
                <div className="bg-white/80 backdrop-blur rounded-xl flex items-center gap-3 px-4 py-3 shadow-lg mb-4 border border-primary/10 focus-within:ring-2 focus-within:ring-primary">
                    <SearchIcon className="w-5 h-5 text-primary"/>
                    <input type="text" placeholder="Search" className="w-full bg-transparent px-2 rounded-lg focus:outline-none text-base placeholder:text-primary/60" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                </div>
                <div className="h-full py-2 divide-y max-h-[calc(100vh-152px)] bg-chat-bg/80 rounded-2xl shadow-inner overflow-y-scroll scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
                {filteredUsers.map(user => <UserCard key={user.user_id} user={user}></UserCard>)}
                </div>
            </div>
        }
    </div>
    );
}

export default ChatPanel;