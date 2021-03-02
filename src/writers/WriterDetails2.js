import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import PortfolioCard from '../portfolios/PortfolioCard';
import UserContext from '../auth/UserContext';
import WriterFeed from "./WriterFeed";
import WriterFollows from './WriterFollows';
import "./WriterDetails.css";
import { FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

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
            console.log(writerRes)
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
            {console.log(writer)}
            {writer ?
                <div className="container mt-5">
                    <div className="row">

                        <div className="col mr-2">
                            <div className="row">
                                <div className="col">
                                    <img src={writer.imageUrl} alt="Writer Profile Image" id="pictureBox"/>
                                </div>
                                <div className="col" id="contactInfo">
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
                                <div className="col" id="portfolio">
                                    <h5>Portfolios || <Link to={`/portfolios/new`}>Create New</Link></h5>
                                    {writer.portfolios.map(p => <PortfolioCard portfolio={p}/>)}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col" id="pieces">
                                    <p>Pieces</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col" id="applications">
                                    <p>Applications</p>
                                </div>
                            </div>
                        </div>

                            <div className="col ml-2" id="feed">
                                <p>Feed</p>
                            </div>

                    </div>
                </div>
            : ""}
        </div>
    )
};

export default WriterDetails2
{/* <div className="container">

<div className="row mt-4">
    <div className="col-3" id="pictureBox">
        <p>Picture Box</p>
    </div>
    <div className="col-3" id="contactInfo">
        <p>Contact Info</p>
    </div>
    
    <div className="col" id="feed">
        <p>Feed</p>
    </div>
</div>

<div className="row">
        <div className="col-6" id="portfolio">
            <p>Portfolio</p>
        </div>
    </div>

</div> */}