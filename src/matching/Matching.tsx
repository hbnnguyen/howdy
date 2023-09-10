import React, { useEffect, useState } from "react";
import userContext from "../userContext";
import { useContext } from 'react';
import { User } from "../user";
import { FriendlyApi } from "../API";
import UserCard from "./UserCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Matching() {
  const [potentialMatch, setPotentialMatch] = useState<User | undefined>(undefined);
  const { user } = useContext(userContext);

  async function getPotentialMatch() {
    const newPotentialMatch = await FriendlyApi.getNextPotentialMatch();
    console.log(newPotentialMatch);
    setPotentialMatch(newPotentialMatch);
  }

  useEffect(function getPotentialMatchOnUpdate() {
    getPotentialMatch();
  }, []);

  async function onClickLikeDislike(liked: boolean) {
    const becameFriends = await FriendlyApi.likeOrDislikeUser(potentialMatch!.id, liked);
    //TODO: handle match?????

    if (becameFriends) {
      toast("You've made a new friend!");
    }

    getPotentialMatch();
  }

  if (potentialMatch === null) {
    return (
      <div className="d-flex flex-column gap-5 m-5 text-center">
        <h4 className="">Whoa there partner, we're all out of potential friends for now!</h4>
        <img className="img-fluid rounded-1" src="https://i.kym-cdn.com/entries/icons/mobile/000/026/489/crying.jpg" alt="sad cat"></img>
        <h4 className="">Check back later and make some more pals!</h4>
      </div>
    );
  }

  if (potentialMatch === undefined) {
    return (<h4>Loading...</h4>);
  }

  return (
    <div>
      <ToastContainer position="top-center" />
      <UserCard user={potentialMatch} />
      <div className="d-flex justify-content-center btn-group" role="group" aria-label="Basic outlined example">
        <button className="btn btn-outline-primary d-flex justify-content-around align-items-center" onClick={() => onClickLikeDislike(false)}>
          <img className="w-25" src="/images/pensive_cowboy.png" alt="sunglasses cowboy emoji"/>
          YEENAW
        </button>
        <button className="btn btn-outline-primary d-flex justify-content-around align-items-center" onClick={() => onClickLikeDislike(true)}>
          YEEHAW
          <img className="w-25" src="/images/sunglasses_cowboy.png" alt="sunglasses cowboy emoji"/>
        </button>
      </div>
    </div>
  );
}

export default Matching;