import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../auth/UserContext";
import WriterHomepage from "./WriterHomepage";
import PlatformHomepage from "./PlatformHomepage";
import useTitle from '../hooks/useTitle';

function Homepage() {
    useTitle("Homepage");
    const { currentUser } = useContext(UserContext);
    const history = useHistory();

    if(!currentUser) history.push("/");

    return(
        <div>
            {currentUser.writerId ? <WriterHomepage writer={currentUser}/> : <PlatformHomepage platform={currentUser}/>}
        </div>
    )
};

export default Homepage;