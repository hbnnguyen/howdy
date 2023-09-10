import React, { useEffect, useState } from 'react';
import './App.css';
import { UserRegistrationForm } from './forms/UserRegistrationForm';
import { FriendlyApi } from './API';
import { ProfilePicData, User, UserFormData, UserLoginData } from './user';
import RoutesList from './RoutesList';
import jwtDecode from 'jwt-decode';
import { UserLoginForm } from './forms/UserLoginForm';
import userContext from "./userContext";
import NavBar from './NavBar';

const TOKEN_STORAGE_KEY = "friendly_token";

function App() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_STORAGE_KEY) || "");
  const [user, setUser] = useState<User | undefined | null>(undefined);

  useEffect(function getUserOnTokenUpdate() {

    async function getUser() {
      FriendlyApi.token = token;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      if (!token) {
        setUser(null);
        return;
      }

      const decoded = jwtDecode<{ id: number; }>(token);
      const userId = decoded.id;
      console.log(userId);

      const user = await FriendlyApi.getUser(userId);
      setUser(user);
    }
    getUser();
  }, [token]);

  if (user === undefined) {
    return (<p>Loading...</p>);
  }

  async function register(user: UserFormData) {
    const newToken = await FriendlyApi.registerUser(user);
    setToken(newToken);
    // localStorage.setItem("token", newToken);
  }

  async function login(user: UserLoginData) {
    const newToken = await FriendlyApi.loginUser(user);
    setToken(newToken);
    // localStorage.setItem("token", newToken);
  }

  function logout() {
    setToken("");
  }

  async function setProfilePic(data: ProfilePicData) {
    console.log("DATA: ", data);
    const newImageURL = await FriendlyApi.uploadProfilePic(data);

    setUser(oldUser => {
      if (!oldUser) {
        return oldUser;
      }

      return {
        ...oldUser,
        imageKey: newImageURL
      };

    });
  }

  return (
    <userContext.Provider value={{ user: user }}>
        <NavBar logout={logout} />
      <div className='d-flex justify-content-center'>
        <RoutesList login={login} register={register} setProfilePic={setProfilePic} />
      </div>
    </userContext.Provider>
  );
}

export default App;