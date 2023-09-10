import { useContext } from 'react';
import { User } from '../user';

interface UserCardPropsInterface {
    user: User;
}

function UserCard({ user }: UserCardPropsInterface) {
    return (
        <div className="d-flex card justify-content-center" style={{ width: "30rem", height: "40rem" }}>
            <div className="card-body d-flex flex-column justify-content-center gap-2">
                <img className="card-img-top w-50 mx-auto" src={user.imageKey} alt="profile" />
                <h4 className='mx-auto'>{user.username}</h4>
                <h4 className='mx-auto'>{user.name}</h4>
                <p><b>Bio:</b>  {user.bio}</p>
            </div>
        </div>
    );
}

export default UserCard;