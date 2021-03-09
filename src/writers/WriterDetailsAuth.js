import "./WriterDetails.css";
import {useState, useEffect} from 'react';
import PrintApi from '../api/api';
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaYoutube, FaTimes, FaEdit, FaPlus, FaRegClock, FaSearch, FaBirthdayCake, FaRegEnvelopeOpen, FaCity, FaHome, FaBuilding, FaPhone, FaUserPlus, FaBookReader, FaClock, FaRegKeyboard, FaMoneyBillWave } from 'react-icons/fa';
import {Tabs, Tab} from "react-bootstrap";
import WriterFeed from "./WriterFeed"

function WriterDetailsAuth({writerId}) {
    const [writer, setWriter] = useState();
    const [applications, setApplications] = useState();
    const [pieces, setPieces] = useState();
    const [gigs, setGigs] = useState();

    useEffect(() => {
        async function getWriter() {
            const writerRes = await PrintApi.getWriterById(writerId);
            const appRes = await PrintApi.getApplicationsByWriterId(writerId);
            const pieceRes = await PrintApi.getPiecesByWriterId(writerId);
            const gigRes = await PrintApi.getOngoingWriterGigs(writerId);
            setGigs(gigRes);
            setWriter(writerRes);
            setApplications(appRes);
            setPieces(pieceRes);
        };
        getWriter();
    }, [writerId]);

    async function withdrawApplication(gigId) {
        if(window.confirm("Are you sure you want to withdraw this application?")) {
            await PrintApi.withdrawApplication(writerId, gigId);
            applications.splice(applications.map(a => a.gigId).indexOf(gigId), 1);
            setApplications([...applications]);
        } else {
            return;
        }
    };

    async function acceptGig(applicationId) {
        if(window.confirm("You are accepting this position. This will notify the Platform that you are confirming your acceptance. Proceed?")) {
            await PrintApi.acceptGig(writerId, applicationId);
            applications.splice(applications.map(a => a.id).indexOf(applicationId), 1);
            setApplications([...applications]);
        } else {
            return;
        }
    };


    async function declineGig(applicationId) {
        if(window.confirm("Are you sure you want to decline this gig? This will notify Platform.")) {
            await PrintApi.declineGig(writerId, applicationId);
            applications.splice(applications.map(a => a.id).indexOf(applicationId), 1);
            setApplications([...applications]);
        };
        return;
    };

    const statusColors = {
        "Pending": "yellow",
        "Accepted": "green",
        "Rejected": "red"
    };
    return(
        <div>
            {writer && applications && gigs && pieces ? 
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
                    <div className="col-4" id="btn-col">
                    <Link to={`/writers/${writerId}/edit`}><button id="edit-btn"><FaEdit className="m-1"/><small>Edit Profile</small></button></Link>
                    </div>
                </div>
                <div id="writer-nav">
                    <Tabs defaultActiveKey="second" title="writer navigation" id="writer-nav">
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
                                        {writer.twitterUserName ? <li className="list-group-item">
                                            <FaTwitter color="lightblue"/>
                                            <small className="ml-2">Twitter: 
                                                <b className="ml-1">
                                                    <a href={`http://twitter.com/${writer.twitterUserName}`}>
                                                        {writer.twitterUserName}
                                                    </a>
                                                </b>
                                            </small>
                                        </li> : ""}
                                        {writer.facebookUsername ? <li className="list-group-item">
                                            <FaFacebook color="blue"/>
                                            <small className="ml-2">Facebook: 
                                                <b className="ml-1">
                                                    <a href={`http://facebook.com/${writer.facebookUsername}`}>
                                                        {writer.facebookUsername}
                                                    </a>
                                                </b>
                                            </small>
                                        </li> : ""}
                                        {writer.youtubeUsername ? <li className="list-group-item">
                                            <FaYoutube color="red"/>
                                            <small className="ml-2">Youtube: 
                                                <b className="ml-1">
                                                    <a href={`http://youtube.com/${writer.youtubeUsername}`}>
                                                        {writer.youtubeUsername}
                                                    </a>
                                                </b>
                                            </small>
                                        </li> : ""}
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

                        <Tab eventKey="second" title="Applications">
                            <table className="table mt-3">
                                <thead className="text-center">
                                    <tr>
                                        <th>Platform</th>
                                        <th>Gig Title</th>
                                        <th>Submission</th>
                                        <th>Date Applied</th>
                                        <th>Status</th>
                                        <th>Withdraw</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log(applications)}
                                    {applications.map(a => 
                                        <tr key={a.id} className="text-center">
                                            <td><Link to={`/platforms/${a.platformId}`}>{a.platformName}</Link></td>
                                            <td><Link to={`/gigs/${a.gigId}`}>{a.gigTitle}</Link></td>
                                            <td><Link to={`/portfolios/${a.portfolioId}`}>{a.portfolioTitle}</Link></td>
                                            <td>{a.createdAt.slice(0,10)}</td>
                                            
                                            {a.status === "Accepted" ? 
                                            <td style={{backgroundColor: "lightgreen"}}>
                                                <button className="btn btn-sm btn-success" onClick={() => acceptGig(a.id)}>Accept Gig</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => declineGig(a.id)}>Decline Gig</button>
                                            </td> :
                                            <td style={{backgroundColor: statusColors[a.status]}}>{a.status}</td>
                                            }
                                            <td onClick={() => withdrawApplication(a.gigId)}><FaTimes color="red"/></td>
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </table>
                        </Tab>

                        <Tab eventKey="third" title="Ongoing Gigs">
                            <div className="row">
                                {gigs.map(g => 
                                    <div key={g.id} className="card" id="ongoing-gig-card">
                                        <p className="card-title"><b><Link to={`/gigs/${g.gigId}`}>{g.title}</Link></b></p>
                                        <small><FaClock color="red" className="mr-1"/><b>Deadline:</b> {g.deadline.slice(0, 10)}</small>
                                        <small>Posted By <b><Link to={`/platforms/${g.platformId}`}>{g.displayName}</Link></b></small>
                                        
                                        <small className="mt-2"><b>Gig Description: </b>{g.description}</small>

                                        <small><FaRegKeyboard color="lightgrey" className="mr-2"/>Word Count: {g.wordCount}</small>
                                        <small><FaMoneyBillWave color="lightgrey" className="mr-2"/>Compensation: ${g.compensation}</small>                                  
                                    </div>
                                )}
                            </div>
                            
                        </Tab>
                        <Tab eventKey="fourth" title="Pieces and Portfolios">
                            <div className="row mt-3">
                                <div className="col-6">
                                    <ul className="list-group text-center">
                                        <li className="list-group-item"><b>Pieces</b><Link to={`/pieces/new`}><FaPlus color="green" className="float-right"/></Link></li>
                                        {pieces.map(p => 
                                            <li key={p.id} className="list-group-item">
                                                <small><b><Link to={`/pieces/${p.id}`}>{p.title}</Link></b><Link to={`/pieces/${p.id}/edit`}><FaEdit className="ml-2 mb-1"/></Link></small><br/>
                                                <small>Submitted On: {p.createdAt.slice(0, 10)}</small>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="col-6">
                                    <ul className="list-group text-center">
                                        <li className="list-group-item"><b>Portfolios</b><Link to={`/portfolios/new`}><FaPlus color="green" className="float-right"/></Link></li>
                                        
                                        {writer.portfolios.map(p =>                                        
                                            <li key={p.id} className="list-group-item">
                                                <small><b><Link to={`/portfolios/${p.id}`}>{p.title}</Link><Link to={`/portfolios/${p.id}/edit`}><FaEdit className="ml-2 mb-1"/></Link></b></small><br/>
                                                <small>Submitted On: {p.createdAt.slice(0, 10)}</small>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="fifth" title="Gig Feed">
                            <WriterFeed writerId={writerId}/>
                        </Tab>
                    </Tabs>
                </div>
            </div> : ""}
        </div>
    )
};

export default WriterDetailsAuth