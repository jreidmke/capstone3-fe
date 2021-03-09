import { Link } from "react-router-dom";
import { BiLogIn } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import "./Homepage.css";

function LandingPage() {
    return(
        <div className="container" id="landing-page">
            <div className="row mt-4">
                <div className="col">
                    <h1>Welcome to Print</h1>
                    <h4>A Platform for Writers</h4>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col">
                    <Link to={`/login`}>
                        <BiLogIn size="15rem"/>
                        <h1>Login</h1>
                    </Link>
                </div>
                <div className="col">
                    <Link to={`/register`}>
                        <FiUserPlus size="15rem"/>
                        <h1>New User? Register Here</h1>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default LandingPage;