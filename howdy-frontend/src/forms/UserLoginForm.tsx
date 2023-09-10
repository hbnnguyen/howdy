import React from "react";
import { useState } from "react";
import { UserLoginData } from "../user";
import { useNavigate } from "react-router-dom";

interface UserLoginFormPropsInterface {
  login: (user: UserLoginData) => Promise<void>;
}

const formInitialState: UserLoginData = {
  email: "",
  password: ""
};

export function UserLoginForm({ login }: UserLoginFormPropsInterface) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(formInitialState);

  /** Handle form change. */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData(oldData => ({
      ...oldData,
      [name]: value,
    }));
  }

  /** Handle form submit. */
  async function handleSubmit(evt: React.FormEvent) {
    console.log("uhhh submit????");
    evt.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      console.log("bro what have you done");
    }
    navigate("/");
  }

  return (
    <div>
      <form className="m-5 d-flex flex-column" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email-input">Email:</label>
          <input
            type="email"
            name="email"
            id="email-input"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password-input">Password:</label>
          <input
            type="password"
            name="password"
            id="password-input"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <button className="w-100 submit-btn btn btn-outline-primary">Login</button>
        </div>

      </form>
    </div>
  );
}