import React from "react";
import userContext from "./userContext";
import { useContext } from 'react';

function Home() {
    const { user } = useContext(userContext);

    return (
        <div className='d-flex justify-content-center m-5'>
            {user &&
                <div className='d-flex align-items-center flex-column h-100'>
                    <div className="">
                        <h1>Howdy, {user?.name}</h1>
                    </div>
                    <img className="img-fluid h-25" src={user?.imageKey} alt="profile pic" />
                </div>
            }
            {!user && <h1> Howdy, partner! Let's get you some friends. </h1>}
        </div>
    );
}

export default Home;