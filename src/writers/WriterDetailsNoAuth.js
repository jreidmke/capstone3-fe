import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import PortfolioCard from '../portfolios/PortfolioCard';
import UserContext from '../auth/UserContext';
import { FaTwitter, FaFacebook, FaYoutube, FaTimes, FaEdit, FaPlus, FaRegClock, FaSearch, FaPenAlt, FaBirthdayCake, FaRegEnvelopeOpen, FaCity, FaHome, FaBuilding, FaPhone, FaUserPlus, FaUserMinus, FaBookReader, FaClock, FaRegKeyboard, FaMoneyBillWave } from 'react-icons/fa';
import PieceCard from '../pieces/PieceCard';
import { Link } from 'react-router-dom';
import "./WriterDetails.css";
import {Tabs, Tab} from "react-bootstrap";

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
            {writer && pieces ? 
                <div className="container">
                    <div className="row mt-4">
                        <div className="col-2">
                            <img src={writer.imageUrl} alt="writer image" id="profile-image"/>
                        </div>
                        <div className="col-2 border-right" id="name-col">
                            <div className="row">
                                <h5 className="float-left">{writer.firstName} {writer.lastName}</h5>
                            </div>
                            <div className="row">
                                <p className="float-left">{writer.city}, {writer.state}</p>
                            </div>
                        </div>
                        <div className="col-3" id="status-col">
                            <div className="row my-3">
                                <FaRegClock id="status-icon"/>
                                <small><span className="text-secondary">Last Login At:</span> {writer.lastLoginAt.slice(0, 10)}</small>
                            </div>
                            <div className="row">
                                <FaSearch id="status-icon"/>
                                <small id="statusIcon"><span className="text-secondary">Gig Search: </span><span className="badge badge-success">Active</span></small>
                            </div>
                        </div>
                        {currentUser.platformId ? 
                        <div className="col-4" id="btn-col">
                            {!followed ? 
                            <button id="follow-btn" onClick={() => follow(currentUser.platformId)}><FaUserPlus className="m-1"/>Follow Writer</button> : 
                            <button id="unfollow-btn" onClick={() => unfollow(currentUser.platformId)}><FaUserMinus className="m-1"/>Unfollow Writer</button>
                            }
                            <button id="query-btn"><FaPenAlt className="m-1"/><small>Query Writer</small></button>
                        </div> :""}
                    </div>

                    <div id="writer-nav">
                    <Tabs defaultActiveKey="first" title="writer navigation" id="writer-nav">
                        <Tab eventKey="first" title="About the Author">
                            <div className="row" id="info-row">
                                <div className="col-4">                            
                                    <ul className="list-group">
                                        <li className="list-group-item"><small><b>About the Author</b></small></li>
                                        <li className="list-group-item">
                                            <FaBookReader color="lightgrey"/>
                                            <small className="ml-2">Expertise: <b>{writer.expertise1Title[0].toUpperCase() + writer.expertise1Title.slice(1)}</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaBirthdayCake color="lightgrey"/>
                                            <small className="ml-2">Age: <b>{writer.age}</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaTwitter color="lightblue"/>
                                            <small className="ml-2">Twitter: 
                                                <b className="ml-1">
                                                    <a href={`http://twitter.com/${writer.twitterUserName}`}>
                                                        {writer.twitterUserName}
                                                    </a>
                                                </b>
                                            </small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaFacebook color="blue"/>
                                            <small className="ml-2">Facebook: 
                                                <b className="ml-1">
                                                    <a href={`http://facebook.com/${writer.facebookUsername}`}>
                                                        {writer.facebookUsername}
                                                    </a>
                                                </b>
                                            </small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaYoutube color="red"/>
                                            <small className="ml-2">Youtube: 
                                                <b className="ml-1">
                                                    <a href={`http://youtube.com/${writer.youtubeUsername}`}>
                                                        {writer.youtubeUsername}
                                                    </a>
                                                </b>
                                            </small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaRegEnvelopeOpen color="lightgrey"/>
                                            <small className="ml-2">Email: <b>{writer.email}</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaCity color="lightgrey"/>
                                            <small className="ml-2">Location: <b>{writer.city}, {writer.state}</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaHome color="lightgrey"/>
                                            <small className="ml-2">Street Address: <b>{writer.address1}</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaBuilding color="lightgrey"/>
                                            <small className="ml-2">Address Two: <b>{writer.address2}</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaPhone color="lightgrey"/>
                                            <small className="ml-2">Phone: <b>{writer.phone}</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaUserPlus color="lightgrey"/>
                                            <small className="ml-2">Account Created: <b>{writer.createdAt.slice(0, 10)}</b></small>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <p>Biography: </p>
                                    <small>
                                        {writer.bio}
                                    </small>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="second" title="Pieces and Portfolios">
                            <div className="row mt-3">
                                <div className="col-6">
                                    <ul className="list-group text-center">
                                        <li className="list-group-item"><b>Pieces</b><FaPlus color="green" className="float-right"/></li>
                                        {pieces.map(p => 
                                            <li key={p.id} className="list-group-item">
                                                <small><b><Link to={`/pieces/${p.id}`}>{p.title}</Link></b><Link to={`/portfolios/${p.id}/edit`}><FaEdit className="ml-2 mb-1"/></Link></small><br/>
                                                <small>Submitted On: {p.createdAt.slice(0, 10)}</small>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="col-6">
                                    <ul className="list-group text-center">
                                        <li className="list-group-item"><b>Portfolios</b><FaPlus color="green" className="float-right"/></li>
                                        
                                        {writer.portfolios.map(p =>                                        
                                            <li className="list-group-item">
                                                <small><b><Link to={`/portfolios/${p.id}`}>{p.title}</Link><Link to={`/portfolios/${p.id}/edit`}><FaEdit className="ml-2 mb-1"/></Link></b></small><br/>
                                                <small>Submitted On: {p.createdAt.slice(0, 10)}</small>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>

                </div>
            : ""}
        </div>
    )
};

export default WriterDetailsNoAuth


// {writer ?
//     <div className="container mt-5">
//         {currentUser.writerId===null ? 
    
//     <div>
//         {followed ? <button className="btn btn-danger" onClick={() => unfollow(currentUser.platformId)}>Unfollow</button> : 
                
//                 <button className="btn btn-success" onClick={() => follow(currentUser.platformId)}>Follow</button>}
//     </div>

//      : ""}
//         <div className="row">

        

//             <div className="col mr-2">
//                 <div className="row">
//                     <div className="col">
//                         <img src={writer.imageUrl} alt="Writer Profile Image" id="pictureBox"/>
//                     </div>
//                     <div className="col" id="contactInfo">
//                         <h3>{writer.firstName} {writer.lastName}</h3>
//                         <h5>{writer.city}, {writer.state}</h5>
//                         {currentUser.platformId ? <h4><span className="badge badge-success"><Link to={`/writers/${writerId}/make-query`}>Query this Writer About A Gig</Link></span></h4> : ""}
//                         <h3>
//                             <a href={`https://www.facebook.com/${writer.facebookUsername}`} className='mx-2'><FaFacebook color="blue"/></a>
//                             <a href={`https://www.twitter.com/${writer.twitterUsername}`} className='mx-2'><FaTwitter color="lightblue"/></a>
//                             <a href={`https://www.youtube.com/${writer.youtubeUsername}`} className='mx-2'><FaYoutube color="red"/></a>
//                         </h3>
//                         <p>Add headline functionality like status in FB.</p>
//                     </div>
//                 </div>

//                 <div className="row mt-5">
//                     <div className="col" id="portfolio">
//                         <h5>Portfolios</h5>
//                         {writer.portfolios.map(p => <PortfolioCard key={p.id} portfolio={p}/>)}
//                     </div>
//                 </div>
//             </div>

//             <div className="col mt-5 ml-2">
//                 <div className="row">
//                     <div className="col" id="bio">
//                         <h4>About the Author</h4>
//                         <p>{writer.bio}</p>
//                         <FaPenFancy size="2em"/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="row mt-5">
//             <div className="col overflow-auto" id="piecesNoAuth">
//                 <h5>Pieces</h5>
//                 {pieces ? pieces.map(p => <PieceCard key={p.id} piece={p}/>) : ""}
//             </div>
//         </div>
//     </div>
// : ""}