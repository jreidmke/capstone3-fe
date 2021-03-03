import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import UserContext from '../auth/UserContext';
import GigCard from '../gigs/GigCard';
import PlatformFeed from "./PlatformFeed";
import PlatformFollows from './PlatformFollows';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

function PlatformDetailsNoAuth({platformId}) {
    const { currentUser, writerPlatformFollows, setWriterPlatformFollows } = useContext(UserContext);
    const [platform, setPlatform] = useState();
    const [gigs, setGigs] = useState();

    const [followed, setFollowed] = useState();

    useEffect(() => {
        async function getPlatform() {
            const platformRes = await PrintApi.getPlatformById(platformId);
            setPlatform(platformRes);
            setGigs(platformRes.gigs);
            setFollowed(writerPlatformFollows.map(f => f.platformId).indexOf(parseInt(platformId)) !== -1);
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
                    <button className="btn btn-danger" onClick={() => unfollow(currentUser.writerId, platformId)}>
                        Unfollow
                    </button> : 
                    
                    <button className="btn btn-success" onClick={() => follow(currentUser.writerId, platformId)}> 
                        Follow
                    </button>}
                </div>
        : ""}

        {platform && gigs ?
            <div className="container mt-5">
                <div className="row">
                    <div className="col mr-2">
                        <div className="row">
                            <div className="col">
                                <img src={platform.imageUrl} alt="Platform Profile Image" id="pictureBox"/>
                            </div>
                            <div className="col" id="contactInfo">
                                <h3>{platform.displayName}</h3>
                                <h5>{platform.city}, {platform.state}</h5>
                                <h6>{platform.address1}</h6>
                                <h6>{platform.address2}</h6>
                                <h6>{platform.postalCode}</h6>
                                <h6>{platform.phone}</h6>
                                <h3>
                                    <a href={`https://www.facebook.com/${platform.facebookUsername}`} className='mx-2'><FaFacebook color="blue"/></a>
                                    <a href={`https://www.twitter.com/${platform.twitterUsername}`} className='mx-2'><FaTwitter color="lightblue"/></a>
                                    <a href={`https://www.youtube.com/${platform.youtubeUsername}`} className='mx-2'><FaYoutube color="red"/></a>
                                </h3>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col">
                                <h3>About {platform.displayName}</h3>
                                {platform.description}
                            </div>
                        </div>

                        
                    </div>

                    <div className="col ml-2">
                        <div className="row mt-4">
                            <div className="col" id="portfolio">
                                <h3>Gigs</h3>
                                {gigs.map(g => <GigCard key={g.id} gig={g}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        : ""}
    </div>
    )
};

export default PlatformDetailsNoAuth