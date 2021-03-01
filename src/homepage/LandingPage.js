import { Link } from "react-router-dom";

function LandingPage() {
    return(
        <div>
            <h1>Welcome to Print</h1>
            <br/>
            <h3>A Platform for Writers</h3>
            <br/>
            <br/>
            <br/>
            <h2><Link to="/login">Login To Your Account</Link></h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2><Link to="/register">New User? Click here to register!</Link></h2>
        </div>
    )
};

export default LandingPage;