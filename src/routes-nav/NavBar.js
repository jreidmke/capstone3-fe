import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

function NavBar({logout}) {
    const { currentUser } = useContext(UserContext);

    function authNav() {
        return(
            <ul>
                <li>
                    <NavLink to="/writers">
                        Writers
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/platforms">
                        Platforms
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/gigs">
                        Gigs
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pieces">
                        Pieces
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" onClick={logout}>
                        Logout 
                    </NavLink>
                </li>
            </ul>
        )
    };

    function noAuthNav() {
        <ul>
            <li>
                <NavLink to ="/login">
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to="/register">
                    Register
                </NavLink>
            </li>
        </ul>
    };

    return(
        <nav>
            <Link to="/">
                Print
            </Link>
            {currentUser ? authNav() : noAuthNav()}
        </nav>
    );
};

export default NavBar;