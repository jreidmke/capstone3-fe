import { Link } from 'react-router-dom';
import { FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';

function WriterCard({writer}) {
    return(
        <div className='card'>
            <div className='card-body'>
                <div className='card-title'><Link to={`/writers/${writer.id}`}>{writer.firstName} {writer.lastName}</Link></div>
                <div className='card-text'>
                    <b>{writer.city}, {writer.state}</b>
                    <p>{writer.bio}</p>
                    <p>
                        <a href={`https://www.facebook.com/${writer.facebookUsername}`}><FaFacebook color="blue"/></a>
                        <a href={`https://www.twitter.com/${writer.twitterUsername}`} className='mx-2'><FaTwitter color="lightblue"/></a>
                        <a href={`https://www.youtube.com/${writer.youtubeUsername}`} className='mx-2'><FaYoutube color="red"/></a>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default WriterCard;

