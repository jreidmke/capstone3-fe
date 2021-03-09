import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PrintApi from '../api/api';
import "./Homepage.css";
import WriterCard from "../writers/WriterCard"
import { FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';
import PieceCard from '../pieces/PieceCard';

function PlatformHomepage({platform}) {
    const [writer, setWriter] = useState();
    const [pieces, setPieces] = useState();
    const [applications, setApplications] = useState();
    const [gigs, setGigs] = useState();
    
    useEffect(() => {
        async function getItemsOfTheWeek() {
            const writerRes = await PrintApi.getWriterById(3);
            const pieceRes = await PrintApi.getAllPieces();
            const appRes = await PrintApi.getApplictionByPlatformId(platform.platformId);
            const gigRes = await PrintApi.getAllGigs({platformId: platform.platformId});
            setGigs(gigRes);
            setWriter(writerRes);
            setPieces(pieceRes);
            setApplications(appRes.filter(a => a.status === "Pending"));
        };
        getItemsOfTheWeek();
    }, []);

    return(
        <div>
            {applications && gigs && writer && pieces ? 
            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <h1 className="display-4">Welcome Back {platform.displayName}</h1>
                        <small><span className="badge badge-warning">You currently have {applications.length} applications labled pending.</span></small><br/>
                        <small><span className="badge badge-success">You currently have {gigs.filter(g => g.isActive).length} active Gig Postings.</span></small><br/>
                        <small><span className="badge badge-info">You currently have {gigs.filter(g => !g.isActive).length} Ongoing Gigs.</span></small><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <p>Writer of the Week</p>
                        <img src={writer.imageUrl} id="writer-week-img"/>
                        <p id='writer-week-name'><Link to={`/writers/${writer.id}`}>{writer.firstName} {writer.lastName}</Link></p>
                        <small>{writer.city}, {writer.state}</small>
                        <hr/>
                        <small>{writer.bio.slice(0, 200)}...</small>
                        <br/>
                        <small><b>Expertise In: </b>{writer.expertise1Title[0].toUpperCase() + writer.expertise1Title.slice(1)}</small><br/>
                        <small><b>Recent Portfolios<br/></b>{writer.portfolios.map(p => <span><Link to={`/portfolios/${p.id}`}>-{p.title}</Link><br/></span>)}</small>
                    </div>
                    <div className="col"/>
                    <div className="col-8">
                        <p>Most Recent Pieces</p>
                        {pieces.slice(0, 2).map(p => <PieceCard piece={p}/>)}
                    </div>
                </div>
            </div>
             : ""}
        </div>
    )
};

export default PlatformHomepage;