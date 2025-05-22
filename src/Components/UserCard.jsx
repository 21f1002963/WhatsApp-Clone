import { Link, useParams } from 'react-router-dom';

function UserCard(props) {
    const { user } = props; 
    const params = useParams();
    const isActive = params?.ID === user.user_id;

    return (
    <div>
        <Link key={user.user_id} className={`flex gap-4 items-center hover:bg-background p-2 rounded cursor-pointer ${isActive && "bg-background"}`} to={`/${user.user_id}`}>
            <img src={user.user_data.photoURL} alt={user.user_data.name} className='rounded-full w-[65px] h-[65px] object-cover' />
            <h2>{user.user_data.name}</h2>
        </Link>
    </div>
    )
}

export default UserCard
