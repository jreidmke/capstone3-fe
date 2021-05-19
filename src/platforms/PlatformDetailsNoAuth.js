import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import UserContext from '../auth/UserContext';
import { FaTwitter, FaFacebook, FaYoutube, FaPlus, FaRegClock, FaSearch, FaPenAlt, FaBirthdayCake, FaRegEnvelopeOpen, FaCity, FaHome, FaBuilding, FaPhone, FaUserPlus, FaMailBulk, FaUserMinus, FaBookReader, FaEdit, FaClock, FaRegKeyboard, FaMoneyBillWave, FaAddressBook } from 'react-icons/fa';
import {Tabs, Tab} from "react-bootstrap";

function PlatformDetailsNoAuth({platformId}) {
    const { currentUser, writerPlatformFollows, setWriterPlatformFollows } = useContext(UserContext);
    const [platform, setPlatform] = useState();
    const [gigs, setGigs] = useState();

    const [followed, setFollowed] = useState();

    useEffect(() => {
        async function getPlatform() {
            const platformRes = await PrintApi.getPlatformById(platformId);
            setPlatform(platformRes);
            setGigs(platformRes.gigs.filter(g => g.isActive));
            setFollowed(writerPlatformFollows.map(f => f.platformId).indexOf(parseInt(platformId)) !== -1);
        };
        getPlatform();
    }, []);

    async function follow(writerId) {
        const followRes = await PrintApi.writerFollowPlatform(writerId, platformId);
        setFollowed(true);
        setWriterPlatformFollows([...writerPlatformFollows, followRes]);
    };

    async function unfollow(writerId) {
        await PrintApi.writerUnfollowPlatform(writerId, platformId);
        setFollowed(false);
        writerPlatformFollows.splice(writerPlatformFollows.map(f => f.platformId).indexOf(platformId), 1);
    };

    return(
        <div>
            {platform && gigs ? 
            <div className="container">
                <div className="row mt-4">
                    <div className="col-2">
                        <img src={platform.imageUrl} alt="writer image" id="profile-image"/>
                    </div>
                    <div className="col-2 border-right" id="name-col">
                        <div className="row">
                            <h5 className="float-left">{platform.displayName}</h5>
                        </div>
                        <div className="row">
                            <p className="float-left">{platform.city}, {platform.state}</p>
                        </div>
                    </div>
                    <div className="col-3" id="status-col">
                        <div className="row my-3">
                            <FaRegClock id="status-icon"/>
                            <small><span className="text-secondary">Last Login At:</span> {platform.lastLoginAt.slice(0, 10)}</small>
                        </div>
                        <div className="row">
                            <FaSearch id="status-icon"/>
                            <small id="statusIcon"><span className="text-secondary">Open Gigs: </span><span className="badge badge-success">{gigs.length}</span></small>
                        </div>
                    </div>
                    <div className="col-4" id="btn-col">
                    {!followed ? 
                            <button id="follow-btn" onClick={() => follow(currentUser.writerId)}><FaUserPlus className="m-1"/>Follow Platform</button> : 
                            <button id="unfollow-btn" onClick={() => unfollow(currentUser.writerId)}><FaUserMinus className="m-1"/>Unfollow Platform</button>
                            }
                    </div>
                </div>
                <div id="platform-nav">
                <Tabs defaultActiveKey="second" title="platform navigation" id="platform-nav">
                    <Tab eventKey="first" title="About the Platform">
                        <div className="row" id="info-row">
                            <div className="col-4">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <small><b>About the Platform</b></small>
                                    </li>
                                    <li className="list-group-item">
                                        <FaCity color="lightgrey"/>
                                        <small className="ml-2">Location: <b>{platform.city}, {platform.state}</b></small>
                                    </li>
                                    <li className="list-group-item">
                                        <FaHome color="lightgrey"/>
                                        <small className="ml-2">Street Address: <b>{platform.address1}</b></small>
                                    </li>
                                    <li className="list-group-item">
                                        <FaBuilding color="lightgrey"/>
                                        <small className="ml-2">Address Two: <b>{platform.address2}</b></small>
                                    </li>
                                    <li className="list-group-item">
                                        <FaMailBulk color="lightgrey"/>
                                        <small className="ml-2">Postal Code: <b>{platform.postalCode}</b></small>
                                    </li>
                                    <li className="list-group-item">
                                        <FaRegEnvelopeOpen color="lightgrey"/>
                                        <small className="ml-2">Email: <b>{platform.email}</b></small>
                                    </li>
                                    <li className="list-group-item">
                                        <FaPhone color="lightgrey"/>
                                        <small className="ml-2">Phone: <b>{platform.phone}</b></small>
                                    </li>
                                    <li className="list-group-item">
                                        <FaUserPlus color="lightgrey"/>
                                        <small className="ml-2">Account Created: <b>{platform.createdAt.slice(0, 10)}</b></small>
                                    </li>
                                    <li className="list-group-item">
                                        <FaTwitter color="lightblue"/>
                                        <small className="ml-2">Twitter: 
                                            <b className="ml-1">
                                                <a href={`http://twitter.com/${platform.twitterUserName}`}>
                                                    {platform.twitterUserName}
                                                </a>
                                            </b>
                                        </small>
                                    </li>
                                    <li className="list-group-item">
                                        <FaFacebook color="blue"/>
                                        <small className="ml-2">Facebook: 
                                            <b className="ml-1">
                                                <a href={`http://facebook.com/${platform.facebookUsername}`}>
                                                    {platform.facebookUsername}
                                                </a>
                                            </b>
                                        </small>
                                    </li>
                                    <li className="list-group-item">
                                        <FaYoutube color="red"/>
                                        <small className="ml-2">Youtube: 
                                            <b className="ml-1">
                                                <a href={`http://youtube.com/${platform.youtubeUsername}`}>
                                                    {platform.youtubeUsername}
                                                </a>
                                            </b>
                                        </small>
                                    </li>
                                </ul>
                            </div>
                            <div className="col">
                                <p>Description: </p>
                                <small>
                                    {platform.description}
                                </small>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="second" title="Open Gigs">
                    <div className="row">
                        {gigs.map(g => 
                            <div key={g.id} className="card" id="open-gig-card">
                                <p className="card-title"><b><Link to={`/gigs/${g.id}`}>{g.title}</Link></b></p>
                                <small><FaClock color="red" className="mr-1"/><b>Deadline:</b> {g.deadline.slice(0, 10)}</small>
                                        
                                <small className="mt-2"><b>Gig Description: </b>{g.description}</small>

                                <small><FaRegKeyboard color="lightgrey" className="mr-2"/>Word Count: {g.wordCount}</small>
                                <small><FaMoneyBillWave color="lightgrey" className="mr-2"/>Compensation: ${g.compensation}</small>     
                                <Link to={`/gigs/${g.id}/apply`}><button className="btn btn-info">Apply Today!</button></Link>
                            </div>
                        )}
                    </div>
                    </Tab>
                </Tabs>
                </div>  

            </div>
             : ""}
        </div>
    )
};

export default PlatformDetailsNoAuth