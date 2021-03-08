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
                    {/* <Tab eventKey="third" title="Ongoing Gigs">
                        <div className="row">
                            {ongoingGigs.map(g => 
                                <div key={g.id} className="card" id="open-gig-card">
                                    <p className="card-title"><b><Link to={`/gigs/${g.id}`}>{g.title}</Link> <Link to={`/gigs/${g.id}/edit`}><FaEdit/></Link></b></p>
                                    <small><FaClock color="lightgrey" className="mr-1"/><b>Date Accepted:</b> {g.createdAt.slice(0, 10)}</small>
                                    <small><FaClock color="red" className="mr-1"/><b>Deadline:</b> {g.deadline.slice(0, 10)}</small>
                                    <small><FaBookReader color="lightgrey" className="mr-2"/><b>Writer:</b> <Link to={`/writers/${g.writerId}`}>{g.firstName} {g.lastName}</Link></small>

                                    <small className="mt-2"><b>Gig Description: </b>{g.description}</small>

                                    <small><FaRegKeyboard color="lightgrey" className="mr-2"/>Word Count: {g.wordCount}</small>
                                    <small><FaMoneyBillWave color="lightgrey" className="mr-2"/>Compensation: ${g.compensation}</small>                                  
                                </div>
                                )}
                        </div>
                    </Tab> */}
                    {/* <Tab eventKey="fourth" title="Applications">
                        <div className="row mt-2">
                                <div className="col" id="applications">
                                    <table className="table text-center">
                                        <thead>
                                            <tr>
                                                <th>Gig Title</th>
                                                <th>Writer</th>
                                                <th>Portfolio Submitted</th>
                                                <th>Status</th>
                                                <th>Update Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.map(a => 
                                            <tr key={a.id}>
                                                <td><Link to={`/gigs/${a.gigId}`}>{a.gigTitle}</Link></td>
                                                <td><Link to={`/writers/${a.writerId}`}>{a.firstName} {a.lastName}</Link></td>
                                                <td><Link to={`/portfolios/${a.portfolioId}`}>{a.portfolioTitle}</Link></td>
                                                <td style={{backgroundColor: colors[a.status]}}>{a.status}</td>
                                                <td>
                                                    <select name="status" id="status-select" defaultValue={a.status} onChange={handleChange}>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Accepted">Accepted</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                    <button className="btn btn-success btn-sm mb-2 ml-2" onClick={() => submit(a.id)}>Update</button>
                                                </td>
                                            
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                    </Tab> */}
                </Tabs>
                </div>  

            </div>
             : ""}
        </div>
    )
};

export default PlatformDetailsNoAuth

// <h1>Platform Details</h1>

// {currentUser.platformId === null ?

//     <div>
//         {followed ? 
//         <button className="btn btn-danger" onClick={() => unfollow(currentUser.writerId, platformId)}>
//             Unfollow
//         </button> : 
        
//         <button className="btn btn-success" onClick={() => follow(currentUser.writerId, platformId)}> 
//             Follow
//         </button>}
//     </div>
// : ""}

// {platform && gigs ?
// <div className="container mt-5">
//     <div className="row">
//         <div className="col mr-2">
//             <div className="row">
//                 <div className="col">
//                     <img src={platform.imageUrl} alt="Platform Profile Image" id="pictureBox"/>
//                 </div>
//                 <div className="col" id="contactInfo">
//                     <h3>{platform.displayName}</h3>
//                     <h5>{platform.city}, {platform.state}</h5>
//                     <h6>{platform.address1}</h6>
//                     <h6>{platform.address2}</h6>
//                     <h6>{platform.postalCode}</h6>
//                     <h6>{platform.phone}</h6>
//                     <h3>
//                         <a href={`https://www.facebook.com/${platform.facebookUsername}`} className='mx-2'><FaFacebook color="blue"/></a>
//                         <a href={`https://www.twitter.com/${platform.twitterUsername}`} className='mx-2'><FaTwitter color="lightblue"/></a>
//                         <a href={`https://www.youtube.com/${platform.youtubeUsername}`} className='mx-2'><FaYoutube color="red"/></a>
//                     </h3>
//                 </div>
//             </div>

//             <div className="row mt-5">
//                 <div className="col">
//                     <h3>About {platform.displayName}</h3>
//                     {platform.description}
//                 </div>
//             </div>

            
//         </div>

//         <div className="col ml-2">
//             <div className="row mt-4">
//                 <div className="col" id="portfolio">
//                     <h3>Gigs</h3>
//                     {gigs.map(g => <GigCard key={g.id} gig={g}/>)}
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// : ""}