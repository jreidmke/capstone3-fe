import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import WriterHomepage from "./WriterHomepage";

function Homepage() {
    const { currentUser } = useContext(UserContext);
    const history = useHistory();

    if(!currentUser) history.push("/");

    return(
        <div>
            {currentUser.writerId ? <WriterHomepage writer={currentUser}/> : ""}
        </div>
    )
};

export default Homepage;