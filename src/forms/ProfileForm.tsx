import React, { useState } from "react";
// import userContext from "./userContext";
import { useNavigate } from "react-router-dom";
import { ProfilePicData } from "../user";

interface ProfileFormProps {
  setProfilePic: (arg: ProfilePicData) => Promise<void>;
}

const formInitialState: ProfilePicData = {
  image: undefined
};

export function ProfileForm({ setProfilePic }: ProfileFormProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(formInitialState);

  function handleFileSelect(evt: React.ChangeEvent<HTMLInputElement>) {
    console.log("handleFileSelect");
    if (!evt.target.files || evt.target.files.length === 0) {
      setFormData(oldData => ({
        ...oldData,
        image: undefined
      }));

      return;
    }

    const file = evt.target.files[0];

    console.log("FILE: ", file);

    setFormData(oldData => ({
      ...oldData,
      image: file
    }));
  }

  // /** Handle form change. */
  // function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = evt.target;
  //   setFormData(oldData => ({
  //     ...oldData,
  //     [name]: value,
  //   }));
  // }

  /** Handle form submit. */
  async function handleSubmit(evt: React.FormEvent) {
    console.log("uhhh submit????");
    evt.preventDefault();
    try {
      await setProfilePic(formData);
    } catch (err) {
      console.log("bro what have you done");
    }
    navigate("/");
  }

  return (
    <div>
      <form className="m-5 d-flex flex-column gap-3 text-center" onSubmit={handleSubmit}>
      <h3>Set Profile Picture</h3>
        <input className="form-control" name="profilePic" id="profilePic-input" type="file" onChange={handleFileSelect} />
        <button className="w-100 submit-btn btn btn-outline-primary" type="submit">Submit</button>
      </form >
    </div>
  );
}