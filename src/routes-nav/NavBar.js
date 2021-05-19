import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";
import { FaPenFancy, FaEnvelopeSquare } from 'react-icons/fa';

function NavBar({logout}) {
    const { currentUser, queries, appMsgs } = useContext(UserContext);
    console.log(currentUser);

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

                        {currentUser.writerId ? 
                        <NavLink to={`/writers/${currentUser.writerId}/queries`} className="ml-1">
                            <FaEnvelopeSquare/> <span className="badge badge-light">{queries.length + appMsgs.length}</span> |
                        </NavLink> : ""}
                </li>
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
            <Link to={`/${currentUser.writerId ? "writers" : "platforms"}/faqs`}>FAQs</Link>
            {currentUser ? authNav() : noAuthNav()}
        </nav>
    );
};

export default NavBar;