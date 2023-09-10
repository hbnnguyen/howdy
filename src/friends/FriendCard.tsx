import { useContext } from 'react';
import { User } from '../user';

interface FriendCardPropsInterface {
    user: User;
}

function FriendCard({ user }: FriendCardPropsInterface) {
    return (
        <div className="d-flex card justify-content-center" style={{ width: "10rem", height: "15rem"}}>
            <div className="card-body d-flex flex-column justify-content-center gap-2">
                <img className="card-img-top w-50 mx-auto" src={user.imageKey} alt="profile" />
                <h4 className='mx-auto'>{user.name}</h4>
            </div>
        </div>
    );
}

export default FriendCard;