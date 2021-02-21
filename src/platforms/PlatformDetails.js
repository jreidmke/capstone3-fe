import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import UserContext from '../auth/UserContext';

function PlatformDetails() {
    const { currentUser } = useContext(UserContext);
    const { platformId } = useParams();
    const [platform, setPlatform] = useState();

    useEffect(() => {
        async function getPlatform() {
            const platformRes = await PrintApi.getPlatformById(platformId);
            setPlatform(platformRes);
        };
        getPlatform();
    }, []);


    return(
        <div>
            <h1>Platform Details</h1>
            {platform ? <h1>{platform.displayName} {platform.description}</h1> : <h1>Loading</h1>}
            
            {currentUser.platformId == platformId ? "AUTH" : "NO AUTH"}
        </div>
    )
};

export default PlatformDetails