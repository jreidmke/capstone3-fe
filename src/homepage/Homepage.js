import { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";
import WriterHomepage from "./WriterHomepage";
import PlatformHomepage from "./PlatformHomepage";
import useTitle from '../hooks/useTitle';

function Homepage() {
    useTitle("Homepage");
    const { currentUser } = useContext(UserContext);

    if(!currentUser) return <Redirect to={'/'}/>

    return(
        <div>
            {currentUser && currentUser.writerId ? <WriterHomepage writer={currentUser}/> : <PlatformHomepage platform={currentUser}/>}
        </div>
    )
};

export default Homepage;