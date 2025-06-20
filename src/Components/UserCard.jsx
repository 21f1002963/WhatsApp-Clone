import { Link, useParams } from 'react-router-dom';

function UserCard(props) {
    const { user } = props; 
    const params = useParams();
    const isActive = params?.ID === user.user_id;

    return (
    <div>
        <Link
            key={user.user_id}
            className={`flex gap-4 items-center p-3 rounded-xl transition-all cursor-pointer group shadow-sm mb-2
                ${isActive ? 'bg-primary/10 border-l-4 border-primary shadow-md' : 'hover:bg-primary/5 hover:shadow'}
            `}
            to={`/${user.user_id}`}
        >
            <img
                src={user.user_data.photoURL}
                alt={user.user_data.name}
                className={`rounded-full w-[56px] h-[56px] object-cover border-2 transition-all duration-150
                    ${isActive ? 'border-primary ring-2 ring-primary/30' : 'border-transparent group-hover:border-primary/40'}`}
            />
            <div className="flex flex-col">
                <h2 className={`font-semibold text-lg ${isActive ? 'text-primary' : 'text-gray-800'} truncate`}>{user.user_data.name}</h2>
            </div>
        </Link>
    </div>
    )
}

export default UserCard
