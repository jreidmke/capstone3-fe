import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PrintApi from '../api/api';
import "./Homepage.css";
import { FaTwitter, FaFacebook, FaYoutube, FaCheck, FaTimes} from 'react-icons/fa';

function PlatformHomepage({platform}) {
    const [writer, setWriter] = useState();
    const [piece, setPiece] = useState();


    useEffect(() => {
        async function getItemsOfTheWeek() {
            const writerRes = await PrintApi.getWriterById(2);
            const pieceRes = await PrintApi.getPieceById(2);
            setWriter(writerRes);
            setPiece(pieceRes);
        };
        getItemsOfTheWeek();
    }, []);

    return(
        <div>
            <br/>
            <h1>Welcome back Platform {platform.displayName}!</h1>

            <div className='container'>
                <div className="row">
                    {writer ? 
                    <div className="card mr-5" style={{width: 30+'em'}} id="weekCard">
                        <h3>Writer of the Week</h3>
                        <img className="card-img-top" src={writer.imageUrl} alt="Platform of the week img"/>
                        <div className='card-body'>
                            <h3 className='card-title'><Link to={`writers/${writer.id}`}>{writer.firstName} {writer.lastName}</Link>-{writer.city}, {writer.state}</h3>
                            <h2>
                                <a className='mr-5' href={`https://www.twitter.com/${writer.twitterUsername}`}><FaTwitter/></a>
                                <a className='mx-5' href={`https://www.facebook.com/${writer.facebookUsername}`}><FaFacebook/></a>
                                <a className='ml-5' href={`https://www.youtube.com/${writer.youtubeUsername}`}><FaYoutube/></a>
                            </h2>
                            <p className='card-text'>{writer.bio}</p>

                            <h5 className='card-title'>Current Portfolios</h5>
                            <ul className="list-group list-group-flush">
                                {writer.portfolios.map(g => <li key={g.id} className="list-group-item"><Link to={`/gigs/${g.id}`}>{g.title}</Link></li>)}
                            </ul>
                            <hr/>
                            <h4><Link to="/writers">More Writers</Link></h4>
                        </div>
                    </div>
                    : ""}

                    {piece ?
                        <div className='card ml-5' style={{width: 30+'em'}} id="weekCard">
                            <h3>Piece of the Week</h3>
                            <div className='card-body'>
                                <h3 className="card-title"><Link to={`/pieces/${piece.id}`}>{piece.title}</Link></h3>
                                <h4 className="card-title">Writer: <Link to={`/writers/${piece.writerId}`}>{piece.firstName} {piece.lastName}</Link></h4>
                                <p className='card-text'>{piece.text}</p>
                                
                                <p><b>Tagged:</b> {piece.tags.map(g =>`  ${g.title} | `)}</p>

                                <hr/>
                                <h4><Link to="/pieces">More Pieces</Link></h4>

                            </div>
                        </div>
                        : ""}
                </div>
            </div>
        </div>
    )
};


export default PlatformHomepage;

