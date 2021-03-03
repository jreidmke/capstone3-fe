import { Link } from 'react-router-dom';
import { FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import "./PlatformCard.css";

function PlatformCard({platform}) {
    return(
        <div className="container my-5" id="platformCard">
            <div className="row">
                <div className="col-3">
                    <img src={platform.imageUrl} className="mt-2" id="platformImg"/>
                    <h5><Link to={`/platforms/${platform.id}`}>{platform.displayName}</Link></h5>
                    <p>{platform.city}, {platform.state}</p>
                </div>
                <div className="col">
                    <p className="mt-3">About {platform.displayName}: {platform.description}</p>
                    <h2>
                        <a href={`https://www.facebook.com/${platform.facebookUsername}`} className="mr-2"><FaFacebook color="blue"/></a>
                        <a href={`https://www.twitter.com/${platform.twitterUsername}`} className='mx-5'><FaTwitter color="lightblue"/></a>
                        <a href={`https://www.youtube.com/${platform.youtubeUsername}`} className='ml-2'><FaYoutube color="red"/></a>
                    </h2>
                </div>
            </div>
        </div>
    )
};

export default PlatformCard;