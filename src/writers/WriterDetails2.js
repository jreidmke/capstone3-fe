import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import PortfolioCard from '../portfolios/PortfolioCard';
import UserContext from '../auth/UserContext';
import WriterFeed from "./WriterFeed";
import WriterFollows from './WriterFollows';
import "./WriterDetails.css";
import { FaTwitter, FaFacebook, FaYoutube, FaTimes } from 'react-icons/fa';

function WriterDetails2() {
    const { currentUser, platformWriterFollows, setPlatformWriterFollows } = useContext(UserContext);
    const { writerId } = useParams();
    const [writer, setWriter] = useState();
    const [applications, setApplications] = useState();

    //BOOLEAN used to see if writer followed
    const [followed, setFollowed] = useState();
    
    useEffect(() => {
        async function getWriter() {
            const writerRes = await PrintApi.getWriterById(writerId);
            setWriter(writerRes);
            if(writerRes.id === currentUser.writerId) {
                const appRes = await PrintApi.getApplicationsByWriterId(writerId);
                setApplications(appRes);
            };
            if(currentUser.writerId === null) {
                setFollowed(platformWriterFollows.map(f => f.writerId).indexOf(parseInt(writerId)) !== -1);
            }
        };
        getWriter();
    }, [writerId]);
    
    async function follow(platformId) {
        const followRes = await PrintApi.platformFollowWriter(platformId, writerId);
        setFollowed(true);
        setPlatformWriterFollows([...platformWriterFollows, followRes]);
    };

    async function unfollow(platformId) {
        await PrintApi.platformUnfollowWriter(platformId, writerId);
        setFollowed(false);
        platformWriterFollows.splice(platformWriterFollows.map(f => f.writerId).indexOf(writerId), 1);
    };

    async function withdrawApplication(writerId, gigId) {
        if(window.confirm("Are you sure you want to withdraw this application?")) {
            await PrintApi.withdrawApplication(writerId, gigId);
            applications.splice(applications.map(a => a.gigId).indexOf(gigId), 1);
            setApplications([...applications]);
        } else {
            return;
        }
    };


    return(
        <div>
            {writer && applications ?
                <div className="container mt-5">
                    <div className="row">

                        <div className="col mr-2">
                            <div className="row">
                                <div className="col">
                                    <img src={writer.imageUrl} alt="Writer Profile Image" id="pictureBox"/>
                                </div>
                                <div className="col" id="contactInfo">
                                    <p><Link to={`/writers/${writerId}/edit`}>Edit Profile</Link></p>
                                    <h3>{writer.firstName} {writer.lastName}</h3>
                                    <h5>{writer.city}, {writer.state}</h5>
                                    <h3>
                                        <a href={`https://www.facebook.com/${writer.facebookUsername}`} className='mx-2'><FaFacebook color="blue"/></a>
                                        <a href={`https://www.twitter.com/${writer.twitterUsername}`} className='mx-2'><FaTwitter color="lightblue"/></a>
                                        <a href={`https://www.youtube.com/${writer.youtubeUsername}`} className='mx-2'><FaYoutube color="red"/></a>
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
                                                <td>Platform</td>
                                                <td>Portfolio Submitted</td>
                                                <td>Status</td>
                                                <td>Withdraw</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.map(a => 
                                            <tr key={a.id}>
                                                <td>{a.gigTitle}</td>
                                                <td>{a.platformName}</td>
                                                <td>{a.portfolioTitle}</td>
                                                <td>{a.status}</td>
                                                <td><FaTimes color="red" onClick={()=>withdrawApplication(a.writerId, a.gigId)}/></td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                            <div className="col ml-2">
                                <div className="row">
                                    <div className="col overflow-auto" id="feed">
                                        <h5>Gig Feed</h5>
                                        <WriterFeed writerId={writerId}/>
                                    </div>
                                </div>

                                

                                <div className="row mt-5">
                                    <div className="col" id="portfolio">
                                        <h5>Portfolios || <Link to={`/portfolios/new`}>Create New</Link></h5>
                                        {writer.portfolios.map(p => <PortfolioCard key={p.id} portfolio={p}/>)}
                                    </div>
                                </div>

                                <div className="row mt-5">
                                    <div className="col" id="pieces">
                                        <h5>Pieces</h5>
                                        <p><Link to={`/writers/${currentUser.writerId}/pieces`}>View Your Pieces</Link></p>
                                        <p><Link to={`/pieces/new`}>Create A New Piece</Link></p>
                                    </div>
                                </div>

                            </div>

                    </div>
                </div>
            : ""}
        </div>
    )
};

export default WriterDetails2



