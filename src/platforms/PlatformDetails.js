import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import UserContext from '../auth/UserContext';
import GigCard from '../gigs/GigCard';

function PlatformDetails() {
    const { currentUser } = useContext(UserContext);
    const { platformId } = useParams();
    const [platform, setPlatform] = useState();
    const [gigs, setGigs] = useState();

    useEffect(() => {
        async function getPlatform() {
            const platformRes = await PrintApi.getPlatformById(platformId);
            setPlatform(platformRes);
            setGigs(platformRes.gigs);
        };
        getPlatform();
    }, []);


    return(
        <div>
            <h1>Platform Details</h1>
            {platform ? <h1>{platform.displayName} {platform.description}</h1> : <h1>Loading</h1>}
            <h2>GIGS</h2>
            {gigs ? gigs.map(g => <GigCard key={g.id} gig={g}/>) : ""}
            {currentUser.platformId == platformId ? "AUTH" : "NO AUTH"}
        </div>
    )
};

export default PlatformDetails