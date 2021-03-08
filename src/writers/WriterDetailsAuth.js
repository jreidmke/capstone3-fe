import "./WriterDetails.css";
import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { Link } from "react-router-dom";
import PortfolioCard from '../portfolios/PortfolioCard';
import WriterFeed from "./WriterFeed";
import { FaTwitter, FaFacebook, FaYoutube, FaTimes, FaEdit, FaPlus, FaRegClock, FaSearch, FaPenAlt, FaBirthdayCake, FaRegEnvelopeOpen, FaCity, FaHome, FaBuilding, FaPhone, FaUserPlus, FaBookReader, FaClock, FaRegKeyboard, FaMoneyBillWave } from 'react-icons/fa';
import {Tabs, Tab} from "react-bootstrap";

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

    async function withdrawApplication(writerId, gigId) {
        if(window.confirm("Are you sure you want to withdraw this application?")) {
            await PrintApi.withdrawApplication(writerId, gigId);
            applications.splice(applications.map(a => a.gigId).indexOf(gigId), 1);
            setApplications([...applications]);
        } else {
            return;
        }
    };

    const statusColors = {
        "Pending": "yellow",
        "Accepted": "green",
        "Rejected": "red"
    };

    return(
            <div className="container">
                <div className="row mt-4">
                    <div className="col-2">
                        <img src="https://searchengineland.com/figz/wp-content/seloads/2018/09/writer-writing-ss-1920.jpg" alt="writer image" id="profile-image"/>
                    </div>
                    <div className="col-2 border-right" id="name-col">
                        <div className="row">
                            <h5 className="float-left">Writer Name</h5>
                        </div>
                        <div className="row">
                            <p className="float-left">City, State</p>
                        </div>
                    </div>
                    <div className="col-3" id="status-col">
                        <div className="row my-3">
                            <FaRegClock id="status-icon"/>
                            <small><span className="text-secondary">Last Login At:</span> 2021-07-03</small>
                        </div>
                        <div className="row">
                            <FaSearch id="status-icon"/>
                            <small id="statusIcon"><span className="text-secondary">Gig Search: </span>Active</small>
                        </div>
                    </div>
                    <div className="col-4" id="btn-col">
                        <div className="row">
                            <button id="query-btn"><FaPenAlt className="m-1"/><small>Query Writer</small></button>
                            <button id="edit-btn"><FaEdit className="m-1"/><small>Edit Profile</small></button>
                        </div>
                    </div>
                </div>
            <div>
                <div id="writer-nav">
                    <Tabs defaultActiveKey="fourth" title="writer navigation" id="writer-nav">
                        <Tab eventKey="first" title="About the Author">
                            <div className="row" id="info-row">
                                <div className="col-4">                            
                                    <ul className="list-group">
                                        <li className="list-group-item"><small><b>About the Author</b></small></li>
                                        <li className="list-group-item">
                                            <FaBookReader color="lightgrey"/>
                                            <small className="ml-2">Expertise: <b>Humor</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaBirthdayCake color="lightgrey"/>
                                            <small className="ml-2">Age: <b>32</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaTwitter color="lightblue"/>
                                            <small className="ml-2">Twitter: 
                                                <b className="ml-1">
                                                    <a href={`http://twitter.com/jreidmke`}>
                                                        jreidmke
                                                    </a>
                                                </b>
                                            </small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaFacebook color="blue"/>
                                            <small className="ml-2">Facebook: 
                                                <b className="ml-1">
                                                    <a href={`http://facebook.com/jreidmke`}>
                                                        jreidmke
                                                    </a>
                                                </b>
                                            </small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaYoutube color="red"/>
                                            <small className="ml-2">Youtube: 
                                                <b className="ml-1">
                                                    <a href={`http://youtube.com/jreidmke`}>
                                                        jreidmke
                                                    </a>
                                                </b>
                                            </small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaRegEnvelopeOpen color="lightgrey"/>
                                            <small className="ml-2">Email: <b>jreidmke@gmail.com</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaCity color="lightgrey"/>
                                            <small className="ml-2">Location: <b>Milwaukee, WI</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaHome color="lightgrey"/>
                                            <small className="ml-2">Street Address: <b>3180 South Brust Ave.</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaBuilding color="lightgrey"/>
                                            <small className="ml-2">Address Two: <b>Apt. 202</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaPhone color="lightgrey"/>
                                            <small className="ml-2">Phone: <b>(630)338-5693</b></small>
                                        </li>
                                        <li className="list-group-item">
                                            <FaUserPlus color="lightgrey"/>
                                            <small className="ml-2">Account Created: <b>2020-12-11</b></small>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <p>Biography: </p>
                                    <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    <br/>
                                    <br/>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    <br/>
                                    <br/>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
                                    <tr className="text-center">
                                        <td><Link to={`/platforms/2`}>Sci Fi</Link></td>
                                        <td><Link to={`/gigs/3`}>We Need A New Star Wars</Link></td>
                                        <td><Link to={`/portfolios/3`}>Future Stuff</Link></td>
                                        <td>20201/03/12</td>
                                        <td style={{backgroundColor: statusColors["Accepted"]}}>Accepted</td>
                                        <td><FaTimes color="red"/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </Tab>

                        <Tab eventKey="third" title="Ongoing Gigs">
                            <div className="card" id="ongoing-gig-card">
                                <p className="card-title"><b><Link to={`/gigs/3`}>Come Write the Stargate Reboot</Link></b></p>
                                <small><FaClock color="red" className="mr-1"/><b>Deadline:</b> 2021-03-10</small>
                                <small>Posted By <b><Link to={`/platforms/2`}>Sci Fi</Link></b></small>
                                
                                <small className="mt-2"><b>Gig Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</small>

                                <small><FaRegKeyboard color="lightgrey" className="mr-2"/>Word Count: 500</small>
                                <small><FaMoneyBillWave color="lightgrey" className="mr-2"/>Compensation: $740.00</small>
                                                                
                            </div>
                        </Tab>
                        <Tab eventKey="fourth" title="Pieces and Portfolios">
                            <div className="row mt-3">
                                <div className="col-6">
                                    <ul className="list-group text-center">
                                        <li className="list-group-item"><b>Pieces</b></li>
                                        <li className="list-group-item">
                                            <small><b>Pizza</b></small><br/>
                                            <small>Submitted On: 2020-01-24</small>
                                        </li>
                                        <li className="list-group-item">
                                            <small><b>Pizza</b></small><br/>
                                            <small>Submitted On: 2020-01-24</small>
                                        </li>
                                        <li className="list-group-item">
                                            <small><b>Pizza</b></small><br/>
                                            <small>Submitted On: 2020-01-24</small>
                                        </li>
                                        <li className="list-group-item">
                                            <small><b>Pizza</b></small><br/>
                                            <small>Submitted On: 2020-01-24</small>
                                        </li>
                                        <li className="list-group-item">
                                            <small><b>Pizza</b></small><br/>
                                            <small>Submitted On: 2020-01-24</small>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-6">
                                    <ul className="list-group text-center">
                                        <li className="list-group-item"><b>Portfolios</b></li>
                                        <li className="list-group-item">
                                            <small><b>Pizza</b></small><br/>
                                            <small>Submitted On: 2020-01-24</small>
                                        </li>
                                        <li className="list-group-item">
                                            <small><b>Pizza</b></small><br/>
                                            <small>Submitted On: 2020-01-24</small>
                                        </li>
                                        <li className="list-group-item">
                                            <small><b>Pizza</b></small><br/>
                                            <small>Submitted On: 2020-01-24</small>
                                        </li>
                                        <li className="list-group-item">
                                            <small><b>Pizza</b></small><br/>
                                            <small>Submitted On: 2020-01-24</small>
                                        </li>
                                        <li className="list-group-item">
                                            <small><b>Pizza</b></small><br/>
                                            <small>Submitted On: 2020-01-24</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>


            </div>
    )
};

export default WriterDetailsAuth


// <div className="row" id="writer-nav">
//                     <Tab.Container defaultActiveKey="first">
//                         <div className="row">
//                             <Nav variant="tabs">
//                                 <Nav.Item>
//                                     <Nav.Link eventKey="first">About the Author</Nav.Link>
//                                 </Nav.Item>
//                                 <Nav.Item>
//                                     <Nav.Link eventKey="second">Applications</Nav.Link>
//                                 </Nav.Item>
//                                 <Nav.Item>
//                                     <Nav.Link eventKey="third">Ongoing Gigs</Nav.Link>
//                                 </Nav.Item>
//                                 <Nav.Item>
//                                     <Nav.Link eventKey="fourth">Pieces and Portfolios</Nav.Link>
//                                 </Nav.Item>
//                             </Nav>
//                             <div className="col">
//                             <Tab.Content>
//                                 <Tab.Pane eventKey="first">
//                                     <h1>1</h1>
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="second">
//                                     <h1>2</h1>
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="third">
//                                     <h1>3</h1>
//                                 </Tab.Pane>
//                                 <Tab.Pane eventKey="fourth">
//                                     <h1>4</h1>
//                                 </Tab.Pane>
//                             </Tab.Content>
//                             </div>
//                         </div>
//                     </Tab.Container>
//                 </div>

// <div>
//             {writer && applications && pieces ?
//                 <div className="container mt-5">
//                     <div className="row">

//                         <div className="col mr-2">
//                             <div className="row">
//                                 <div className="col">
//                                     <img src={writer.imageUrl} alt="Writer Profile Image" id="pictureBox"/>
//                                 </div>
//                                 <div className="col" id="contactInfo">
//                                     <h3>{writer.firstName} {writer.lastName}<Link className="ml-2" to={`/writers/${writerId}/edit`}><FaEdit/></Link></h3>
//                                     <h5>{writer.city}, {writer.state}</h5>
//                                     <h3>
//                                         <a href={`https://www.facebook.com/${writer.facebookUsername}`} className='mx-2'><FaFacebook color="blue"/></a>
//                                         <a href={`https://www.twitter.com/${writer.twitterUsername}`} className='mx-2'><FaTwitter color="lightblue"/></a>
//                                         <a href={`https://www.youtube.com/${writer.youtubeUsername}`} className='mx-2'><FaYoutube color="red"/></a>
//                                     </h3>
//                                     <h5><Link to={`/writers/${writerId}/ongoing`}>Ongoing Gigs</Link></h5>
//                                     <h5><Link to={`/writers/${writerId}/queries`}>Messages</Link></h5>

//                                     {/* <p>Add headline functionality like status in FB.</p> */}
//                                 </div>
//                             </div>

//                             <div className="row">
//                                 <div className="col overflow-auto" id="feed">
//                                     <h5>Gig Feed</h5>
//                                     <WriterFeed writerId={writerId}/>
//                                 </div>
//                             </div>

//                             <div className="row">
//                                 <div className="col" id="applications">
//                                     <h5>Applications</h5>
//                                     <table className="table">
//                                         <thead>
//                                             <tr>
//                                                 <th id="titleCol">Gig Title</th>
//                                                 <th>Platform</th>
//                                                 <th>Portfolio Submitted</th>
//                                                 <th>Status</th>
//                                                 <th>Withdraw</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {applications.map(a => 
//                                             <tr key={a.id}>
//                                                 <td><Link to={`/gigs/${a.gigId}`}>{a.gigTitle}</Link></td>
//                                                 <td><Link to={`/platforms/${a.platformId}`}>{a.platformName}</Link></td>
//                                                 <td><Link to={`/portfolios/${a.portfolioId}`}>{a.portfolioTitle}</Link></td>
//                                                 <td style={{backgroundColor: statusColors[a.status]}}>{a.status}</td>
//                                                 <td><FaTimes color="red" onClick={()=>withdrawApplication(a.writerId, a.gigId)}/></td>
//                                             </tr>)}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col ml-2">
                            
                            
//                             <div className="row mt-5">
//                                 <div className="col" id="portfolio">
//                                     <h5>Portfolios<Link to={`/portfolios/new`} className="float-right"><FaPlus/></Link></h5>
//                                     {writer.portfolios.map(p => <PortfolioCard key={p.id} portfolio={p}/>)}
//                                 </div>

//                                 <div className="col">
//                                     <h5>Pieces <Link to={`/pieces/new`} className="float-right mr-5"><FaPlus/></Link></h5>
//                                     <div className="overflow-auto" id="pieces">
//                                         {pieces.map(p => 
//                                         <div className="card">
//                                             <div className="card-body">
//                                                 <Link to={`/pieces/${p.id}`}>
//                                                     {p.title}
//                                                 </Link>
//                                                 <Link to={`/pieces/${p.id}/edit`} className="ml-3">
//                                                     <FaEdit/>
//                                                 </Link>
//                                             </div>
//                                         </div>)}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             : ""}
//         </div>