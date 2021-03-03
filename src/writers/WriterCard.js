import { Link } from 'react-router-dom';
import { FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import "./WriterCard.css";

function WriterCard({writer}) {
    return(
        <div className="container my-5" id="writerCard">
            <div className="row">
                <div className="col-3">
                    <img src={writer.imageUrl} className="mt-2" id="platformImg"/>
                    <h5><Link to={`/writers/${writer.id}`}>{writer.firstName} {writer.lastName}</Link></h5>
                    <p>{writer.city}, {writer.state}</p>
                </div>
                <div className="col">
                    <p className="mt-3">About {writer.firstName}: {writer.bio}</p>
                    <h2>
                        <a href={`https://www.facebook.com/${writer.facebookUsername}`} className="mr-2"><FaFacebook color="blue"/></a>
                        <a href={`https://www.twitter.com/${writer.twitterUsername}`} className='mx-5'><FaTwitter color="lightblue"/></a>
                        <a href={`https://www.youtube.com/${writer.youtubeUsername}`} className='ml-2'><FaYoutube color="red"/></a>
                    </h2>
                </div>
            </div>
        </div>
    )
};

export default WriterCard;

        // <div className='card'>
        //     <div className='card-body'>
        //         <div className='card-title'><Link to={`/writers/${writer.id}`}>{writer.firstName} {writer.lastName}</Link></div>
        //         <div className='card-text'>
        //             <b>{writer.city}, {writer.state}</b>
        //             <p>{writer.bio}</p>
                    // <p>
                    //     <a href={`https://www.facebook.com/${writer.facebookUsername}`}><FaFacebook color="blue"/></a>
                    //     <a href={`https://www.twitter.com/${writer.twitterUsername}`} className='mx-2'><FaTwitter color="lightblue"/></a>
                    //     <a href={`https://www.youtube.com/${writer.youtubeUsername}`} className='mx-2'><FaYoutube color="red"/></a>
                    // </p>
        //         </div>
        //     </div>
        // </div>