import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import useTitle from "../hooks/useTitle";

function Homepage() {
    const { currentUser } = useContext(UserContext);
    const history = useHistory();

    if(!currentUser) history.push("/");

    return(
        <div>
            <h1>Homepage</h1>
        </div>
    )
};

export default Homepage;