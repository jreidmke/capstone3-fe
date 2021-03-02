import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import UserContext from '../auth/UserContext';
import GigCard from '../gigs/GigCard';
import PlatformFeed from "./PlatformFeed";
import PlatformFollows from './PlatformFollows';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

function PlatformDetailsAuth() {
    const { currentUser, writerPlatformFollows, setWriterPlatformFollows } = useContext(UserContext);
    const { platformId } = useParams();
    const [platform, setPlatform] = useState();
    const [gigs, setGigs] = useState();
    const [applications, setApplications] = useState();

    useEffect(() => {
        async function getPlatform() {
            const platformRes = await PrintApi.getPlatformById(platformId);
            const appRes = await PrintApi.getApplictionByPlatformId(platformId);
            setPlatform(platformRes);
            console.log(platformRes.gigs);
            setGigs(platformRes.gigs);
            setApplications(appRes);
        };
        getPlatform();
    }, []);


    return(
        <div>
        {platform && applications && gigs ?
            <div className="container mt-5">
                <div className="row">
                    <div className="col mr-2">
                        <div className="row">
                            <div className="col">
                                <img src={platform.imageUrl} alt="Platform Profile Image" id="pictureBox"/>
                            </div>
                            <div className="col" id="contactInfo">
                                <p><Link to={`/platforms/${platformId}/edit`}>Edit Profile</Link></p>
                                <h3>{platform.firstName} {platform.lastName}</h3>
                                <h5>{platform.city}, {platform.state}</h5>
                                <h3>
                                    <a href={`https://www.facebook.com/${platform.facebookUsername}`} className='mx-2'><FaFacebook color="blue"/></a>
                                    <a href={`https://www.twitter.com/${platform.twitterUsername}`} className='mx-2'><FaTwitter color="lightblue"/></a>
                                    <a href={`https://www.youtube.com/${platform.youtubeUsername}`} className='mx-2'><FaYoutube color="red"/></a>
                                </h3>
                                <p>Add headline functionality like status in FB.</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col" id="applications">
                                <h5>Applications</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Gig Title</td>
                                            <td>Writer</td>
                                            <td>Portfolio Submitted</td>
                                            <td>Status</td>
                                            <td>Update Status</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applications.map(a => 
                                        <tr key={a.id}>
                                            <td>{a.gigTitle}</td>
                                            <td>{a.firstName} {a.lastName}</td>
                                            <td>{a.portfolioTitle}</td>
                                            <td>{a.status}</td>
                                            <td><Link to={`/platforms/${platformId}/applications/${a.id}`}>Update Status</Link></td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col ml-2">
                        <div className="row">
                            <div className="col overflow-auto" id="feed">
                                <h5>Piece Feed</h5>
                                <PlatformFeed platformId={platformId}/>
                            </div>
                        </div>
                        
                        <div className="row mt-5">
                            <div className="col" id="portfolio">
                                <h5>Gigs || <Link to={`/gigs/new`}>Create New</Link></h5>
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

export default PlatformDetailsAuth