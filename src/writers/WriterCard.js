import { Link } from 'react-router-dom';

function WriterCard({writer}) {
    return(
        <div className='card'>
            <div className='card-body'>
                <div className='card-title'><Link to={`/writers/${writer.id}`}>{writer.firstName} {writer.lastName}</Link></div>
                <div className='card-text'>
                    <b>{writer.city}, {writer.state}</b>
                    <p>{writer.bio}</p>
                    <p>{writer.facebookUsername} || {writer.twitterUsername} || {writer.youtubeUsername}</p>
                </div>
            </div>
        </div>
    )
};

export default WriterCard;