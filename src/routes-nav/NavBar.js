import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";
import { FaPenFancy } from 'react-icons/fa';

function NavBar({logout}) {
    const { currentUser, queries } = useContext(UserContext);

    function authNav() {
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink to="/writers">
                        Writers |
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/platforms">
                        | Platforms |
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/gigs">
                        | Gigs | 
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/pieces">
                        | Pieces |
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={currentUser.writerId !== null ? `/writers/${currentUser.writerId}` : `/platforms/${currentUser.platformId}`}>
                        | Profile |
                    </NavLink>
                </li>
                {currentUser.writerId ? <li className="nav-item">
                    <NavLink to={`/writers/${currentUser.writerId}/queries`}>
                        Queries <span class="badge badge-light">{queries.length}</span>
                    </NavLink>
                </li> : ""}
                <li className="nav-item">
                    <NavLink to="/" onClick={logout}>
                        | Logout 
                    </NavLink>
                </li>
            </ul>
        )
    };

    function noAuthNav() {
        return(
            <ul className="navbar-nav ml-auto">
                <li>
                    <NavLink to ="/login">
                        Login |
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register">
                        | Register
                    </NavLink>
                </li>
        </ul>
    )};

    return(
        <nav className="Navigation navbar navbar-expand-md">
            <Link className="navbar-brand" to="/home">
                <FaPenFancy/>Print
            </Link>
            <button onClick={()=>console.log(currentUser)}>Print User</button>
            {currentUser ? authNav() : noAuthNav()}
        </nav>
    );
};

export default NavBar;