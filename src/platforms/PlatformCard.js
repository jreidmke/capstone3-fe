import { Link } from 'react-router-dom';
import { FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import "../pieces/PieceCard.css";

function PlatformCard({platform}) {
    return(
        <div className="container" id="piece-card">
            <div className="row text-center">
                <div className="col-2">
                    <img src={platform.imageUrl} id="piece-img"/>
                    <p  id="writer-name"><Link to={`/platforms/${platform.id}`}>{platform.displayName}</Link></p>
                    <small>{platform.city}, {platform.state}</small><br/>
                    <span className="badge badge-info">Current Gigs: {platform.gigCount}</span>
                </div>
                <div className="col">
                    <div className="row" id="description">
                        <small><b>Platform Description</b>: {platform.description.length > 700 ? <span>{platform.description.slice(0, 700)}...</span> : platform.description}</small>
                    </div>
                    <div className="row" id="socials">
                        <div className="col-4">
                            <h1><a href={`https://www.facebook.com/${platform.facebookUsername}`}><FaFacebook color="blue"/></a></h1>
                        </div>
                        <div className="col-4">
                            <h1><a href={`https://www.twitter.com/${platform.twitterUsername}`}><FaTwitter color="lightblue"/></a></h1>
                        </div>
                        <div className="col-4">
                            <h1><a href={`https://www.youtube.com/${platform.youtubeUsername}`} className='ml-2'><FaYoutube color="red"/></a></h1>
                        </div>
                    </div>         
                </div>              
            </div>
        </div>
    )
};

export default PlatformCard;
