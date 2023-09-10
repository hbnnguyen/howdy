import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import userContext from "./userContext";

//TODO: fix this when routes are done

interface NavBarPropsInterface {
    logout: () => void;
}

function NavBar({ logout }: NavBarPropsInterface) {
    const { user } = useContext(userContext);

    function loggedOutNav() {
        return (<>
            <NavLink className="nav-link" to={"/login"}>Log In</NavLink>
            <NavLink className="nav-link" to={"/register"}>Register</NavLink>
        </>);
    }

    function loggedIn() {
        return (<>
            <NavLink className="nav-link" to={"/profile"}>Profile</NavLink>
            <NavLink className="nav-link" to={"/matching"}>Matching</NavLink>
            <NavLink className="nav-link" to={"/friends"}>Friends</NavLink>
            <NavLink className="nav-item nav-link" to="/" onClick={logout}>Log Out</NavLink>
        </>);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between p-2">
            <NavLink className="nav-link mx-1 fw-bold" to={'/'}>
                <img className="w-25 me-2"src="/images/smiling_cowboy.png" alt="smiling cowboy emoji"/>
                Howdy
            </NavLink>
            <div className="d-flex justify-content-end gap-3">
                {user ? loggedIn() : loggedOutNav()}
            </div>
        </nav>
    );
}

export default NavBar;