import { Link } from 'react-router-dom';

function PlatformCard({platform}) {
    return(
        <div className='card'>
            <div className='card-body'>
                <div className='card-title'><Link to={`/platforms/${platform.id}`}>{platform.displayName}</Link></div>
                <div className='card-text'>
                    <b>{platform.city}, {platform.state}</b>
                    <p>{platform.description}</p>
                    <p>{platform.facebookUsername} || {platform.twitterUsername} || {platform.youtubeUsername}</p>
                </div>
            </div>
        </div>
    )
};

export default PlatformCard;