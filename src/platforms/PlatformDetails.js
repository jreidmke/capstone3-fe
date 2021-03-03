import {useContext} from 'react';
import { useParams } from "react-router-dom";
import UserContext from '../auth/UserContext';
import PlatformDetailsAuth from "./PlatformDetailsAuth";
import PlatformDetailsNoAuth from "./PlatformDetailsNoAuth";

function PlatformDetails() {
    const { currentUser } = useContext(UserContext);
    const { platformId } = useParams();

    return(
        <div>
            {currentUser.platformId === +platformId ? <PlatformDetailsAuth platformId={platformId}/> : <PlatformDetailsNoAuth platformId={platformId}/>}
        </div>
    )
};

export default PlatformDetails