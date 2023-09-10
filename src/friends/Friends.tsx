import React, { useEffect, useState } from "react";
import { User } from "../user";
import { FriendlyApi } from "../API";
import FriendCard from "./FriendCard";

function Friends() {
    const [friends, setFriends] = useState<User[] | undefined>(undefined);

    async function getAndSetFriends() {
        const newFriends = await FriendlyApi.getFriends();
        setFriends(newFriends);
    }

    useEffect(function getFriendsOnMount() {
        getAndSetFriends();
    }, []);

    if (!friends) {
        return (<h4>Loading...</h4>)
    }

    if (friends.length === 0) {
        return (<h3>Sorry, partner. There's no friends around these parts.</h3>)
    }

    return (
        <div className="d-flex gap-3 mt-4">
            {friends.map(friend => <FriendCard user={friend}/>)}
        </div>
    )
}

export default Friends;