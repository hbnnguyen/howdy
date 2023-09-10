import { Routes, Route } from 'react-router-dom';
import userContext from "./userContext";
import { useContext } from 'react';
import { UserLoginForm } from './forms/UserLoginForm';
import { UserRegistrationForm } from './forms/UserRegistrationForm';
import NavBar from './NavBar';
import { ProfilePicData, UserFormData, UserLoginData } from './user';
import Home from './Home';
import { ProfileForm } from './forms/ProfileForm';
import Matching from './matching/Matching';
import Friends from './friends/Friends';

interface RoutesListPropsInterface {
  login: (user: UserLoginData) => Promise<void>,
  register: (user: UserFormData) => Promise<void>;
  setProfilePic: (arg: ProfilePicData) => Promise<void>;
}

//TODO: fix this when routes are done

function RoutesList({ login, register, setProfilePic }: RoutesListPropsInterface) {
  const { user } = useContext(userContext);

  function loggedOutRoutes() {
    return (
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<UserLoginForm login={login} />} />
          <Route path="/register" element={<UserRegistrationForm register={register} />} />
        </Routes>
      </>
    );
  }

  function loggedInRoutes() {
    return (
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/matching' element={<Matching />} />
          <Route path='/friends' element={<Friends />} />
          <Route path="/profile" element={<ProfileForm setProfilePic={setProfilePic} />} />
          <Route path="/register" element={<UserRegistrationForm register={register} />} />
        </Routes>
      </>
    );
  }

  if (user) {
    return loggedInRoutes();
  } else {
    return loggedOutRoutes();
  }
}

export default RoutesList;