import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { Link } from "react-router-dom";
import PortfolioCard from '../portfolios/PortfolioCard';
import WriterFeed from "./WriterFeed";
import "./WriterDetails.css";
import { FaTwitter, FaFacebook, FaYoutube, FaTimes, FaEdit, FaPlus, FaRegClock, FaSearch } from 'react-icons/fa';

function WriterDetailsAuth({writerId}) {
    const [writer, setWriter] = useState();
    const [applications, setApplications] = useState();
    const [pieces, setPieces] = useState();
    
    useEffect(() => {
        async function getWriter() {
            const writerRes = await PrintApi.getWriterById(writerId);
            const appRes = await PrintApi.getApplicationsByWriterId(writerId);
            const pieceRes = await PrintApi.getPiecesByWriterId(writerId);
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
        <div>
            {console.log(writer)}
            <div className="container">
                <div className="row mt-4">
                        <div className="col-2 mr-3">
                            <img src="https://searchengineland.com/figz/wp-content/seloads/2018/09/writer-writing-ss-1920.jpg" alt="writer image" id="profile-image"/>
                        </div>
                        <div className="col-2 mt-5 mr-5 border-right">
                            <h5 className="float-left">Writer Name</h5>
                            <p className="float-left">City, State</p>
                        </div>
                        <div className="col-4">
                            <div className="row mt-5">
                                <FaRegClock className="mt-1"/>
                                <p className="ml-3"><span className="text-secondary">Last Login At:</span> 2021-07-03</p>
                            </div>
                            <div className="row">
                                <FaSearch className="mt-1"/>
                                <p className="ml-3"><span className="text-secondary">Gig Search: </span>Active</p>
                            </div>
                        </div>

                </div>
            </div>
        </div>
    )
};

export default WriterDetailsAuth

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