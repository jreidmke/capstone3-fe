import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import PortfolioCard from '../portfolios/PortfolioCard';
import UserContext from '../auth/UserContext';
import { FaTwitter, FaFacebook, FaYoutube, FaPenFancy } from 'react-icons/fa';
import PieceCard from '../pieces/PieceCard';

function WriterDetailsNoAuth({writerId}) {
    const { currentUser, platformWriterFollows, setPlatformWriterFollows } = useContext(UserContext);
    const [writer, setWriter] = useState();
    const [pieces, setPieces] = useState();
    const [followed, setFollowed] = useState();
    
    useEffect(() => {
        async function getWriter() {
            const writerRes = await PrintApi.getWriterById(writerId);
            setWriter(writerRes);
            const pieceRes = await PrintApi.getPiecesByWriterId(writerId);
            setPieces(pieceRes);
            if(currentUser.platformId) {
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

    return(
        <div>
            {writer ?
                <div className="container mt-5">
                    {currentUser.writerId===null ? 
                
                <div>
                    {followed ? <button className="btn btn-danger" onClick={() => unfollow(currentUser.platformId)}>Unfollow</button> : 
                            
                            <button className="btn btn-success" onClick={() => follow(currentUser.platformId)}>Follow</button>}
                </div>
            
                 : ""}
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

                            <div className="row mt-5">
                                <div className="col" id="portfolio">
                                    <h5>Portfolios</h5>
                                    {writer.portfolios.map(p => <PortfolioCard key={p.id} portfolio={p}/>)}
                                </div>
                            </div>
                        </div>

                        <div className="col mt-5 ml-2">
                            <div className="row">
                                <div className="col" id="bio">
                                    <h4>About the Author</h4>
                                    <p>{writer.bio}</p>
                                    <FaPenFancy size="2em"/>
                                </div>
                            </div>

                            <div className="row mt-5">
                                <div className="col overflow-auto" id="pieces">
                                    <h5>Pieces</h5>
                                    {pieces ? pieces.map(p => <PieceCard key={p.id} piece={p}/>) : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            : ""}
        </div>
    )
};

export default WriterDetailsNoAuth


