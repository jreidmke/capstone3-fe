import { Link } from 'react-router-dom';
import { FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import "../pieces/PieceCard.css";

function WriterCard({writer}) {
    return(
        <div className="container" id="piece-card">
            <div className="row text-center">
                <div className="col-2">
                    <img src={writer.imageUrl} id="piece-img"/>
                    <p  id="writer-name"><Link to={`/writers/${writer.id}`}>{writer.firstName} {writer.lastName}</Link></p>
                    <small>{writer.city}, {writer.state}</small><br/>
                    <span className="badge badge-info">Current Pieces: {writer.pieceCount}</span>
                </div>
                <div className="col">
                    <div className="row" id="description">
                        <small><b>Writer Description</b>: {writer.bio.length > 700 ? <span>{writer.bio.slice(0, 700)}...</span> : writer.bio}</small>
                    </div>
                    <div className="row" id="socials">
                        <div className="col-4">
                            <h1><a href={`https://www.facebook.com/${writer.facebookUsername}`}><FaFacebook color="blue"/></a></h1>
                        </div>
                        <div className="col-4">
                            <h1><a href={`https://www.twitter.com/${writer.twitterUsername}`}><FaTwitter color="lightblue"/></a></h1>
                        </div>
                        <div className="col-4">
                            <h1><a href={`https://www.youtube.com/${writer.youtubeUsername}`} className='ml-2'><FaYoutube color="red"/></a></h1>
                        </div>
                    </div>         
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