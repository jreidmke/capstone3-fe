import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { Link } from "react-router-dom";
import PortfolioCard from '../portfolios/PortfolioCard';
import WriterFeed from "./WriterFeed";
import "./WriterDetails.css";
import { FaTwitter, FaFacebook, FaYoutube, FaTimes, FaEdit, FaPlus } from 'react-icons/fa';

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

    return(
        <div>
            {writer && applications && pieces ?
                <div className="container mt-5">
                    <div className="row">

                        <div className="col mr-2">
                            <div className="row">
                                <div className="col">
                                    <img src={writer.imageUrl} alt="Writer Profile Image" id="pictureBox"/>
                                </div>
                                <div className="col" id="contactInfo">
                                    <h3>{writer.firstName} {writer.lastName}<Link className="ml-2" to={`/writers/${writerId}/edit`}><FaEdit/></Link></h3>
                                    <h5>{writer.city}, {writer.state}</h5>
                                    <h3>
                                        <a href={`https://www.facebook.com/${writer.facebookUsername}`} className='mx-2'><FaFacebook color="blue"/></a>
                                        <a href={`https://www.twitter.com/${writer.twitterUsername}`} className='mx-2'><FaTwitter color="lightblue"/></a>
                                        <a href={`https://www.youtube.com/${writer.youtubeUsername}`} className='mx-2'><FaYoutube color="red"/></a>
                                    </h3>
                                    <p>Add headline functionality like status in FB.</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col" id="applications">
                                    <h5>Applications</h5>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td>Gig Title</td>
                                                <td>Platform</td>
                                                <td>Portfolio Submitted</td>
                                                <td>Status</td>
                                                <td>Withdraw</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.map(a => 
                                            <tr key={a.id}>
                                                <td>{a.gigTitle}</td>
                                                <td>{a.platformName}</td>
                                                <td>{a.portfolioTitle}</td>
                                                <td>{a.status}</td>
                                                <td><FaTimes color="red" onClick={()=>withdrawApplication(a.writerId, a.gigId)}/></td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="col ml-2">
                            <div className="row">
                                <div className="col overflow-auto" id="feed">
                                    <h5>Gig Feed</h5>
                                    <WriterFeed writerId={writerId}/>
                                </div>
                            </div>
                            
                            <div className="row mt-5">
                                <div className="col" id="portfolio">
                                    <h5>Portfolios<Link to={`/portfolios/new`} className="float-right"><FaPlus/></Link></h5>
                                    {writer.portfolios.map(p => <PortfolioCard key={p.id} portfolio={p}/>)}
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <h5>Pieces <Link to={`/pieces/new`} className="float-right mr-5"><FaPlus/></Link></h5>
                                    <div className="overflow-auto" id="pieces">
                                        {pieces.map(p => 
                                        <div className="card">
                                            <div className="card-body">
                                                <Link to={`/pieces/${p.id}`}>
                                                    {p.title}
                                                </Link>
                                                <Link to={`/pieces/${p.id}/edit`} className="ml-3">
                                                    <FaEdit/>
                                                </Link>
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            : ""}
        </div>
    )
};

export default WriterDetailsAuth