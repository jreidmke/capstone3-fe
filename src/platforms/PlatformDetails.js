import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import UserContext from '../auth/UserContext';
import GigCard from '../gigs/GigCard';
import PlatformFeed from "./PlatformFeed";

function PlatformDetails() {
    const { currentUser, writerPlatformFollows, setWriterPlatformFollows } = useContext(UserContext);
    const { platformId } = useParams();

    const [platform, setPlatform] = useState();
    const [gigs, setGigs] = useState();

    const [followed, setFollowed] = useState();

    useEffect(() => {
        async function getPlatform() {
            const platformRes = await PrintApi.getPlatformById(platformId);
            setPlatform(platformRes);
            setGigs(platformRes.gigs);
            if(currentUser.platformId === null) {
                setFollowed(writerPlatformFollows.map(f => f.platformId).indexOf(parseInt(platformId)) !== -1);
            }
        };
        getPlatform();
    }, []);

    async function follow(writerId, platformId) {
        const followRes = await PrintApi.writerFollowPlatform(writerId, platformId);
        setFollowed(true);
        setWriterPlatformFollows([...writerPlatformFollows, followRes]);
    };

    async function unfollow(writerId, platformId) {
        await PrintApi.writerUnfollowPlatform(writerId, platformId);
        setFollowed(false);
        writerPlatformFollows.splice(writerPlatformFollows.map(f => f.platformId).indexOf(platformId), 1);
    };

    return(
        <div>
            <h1>Platform Details</h1>

            {currentUser.platformId === null ?
           
                <div>
                    {followed ? 
                    <button onClick={() => unfollow(currentUser.writerId, platformId)}>
                        Unfollow
                    </button> : 
                    
                    <button  onClick={() => follow(currentUser.writerId, platformId)}> 
                        Follow
                    </button>}
                </div>
        : ""}


            {platform ? <h1>{platform.displayName} {platform.description}</h1> : <h1>Loading</h1>}

            {currentUser.platformId === +platformId ? <Link to={`/platforms/${currentUser.platformId}/edit`}>Edit Profile</Link> : ""}

            <h2>GIGS</h2> {gigs && currentUser.platformId == platformId ? <p><Link to={`/platforms/${currentUser.platformId}/gigs/new`}>Create New Gig</Link></p> : ""}
            
            {gigs ? gigs.map(g => <GigCard key={g.id} gig={g}/>) : ""}

            <h1>FEED</h1>

            {currentUser.platformId === platformId ? <PlatformFeed platformId={platformId}/> : ""}

            {currentUser.platformId == platformId ? "AUTH" : "NO AUTH"}
        </div>
    )
};

export default PlatformDetails