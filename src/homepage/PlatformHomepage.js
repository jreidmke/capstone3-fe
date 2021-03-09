import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PrintApi from '../api/api';
import "./Homepage.css";
import WriterCard from "../writers/WriterCard"
import { FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

function PlatformHomepage({platform}) {
    const [writer, setWriter] = useState();
    const [pieces, setPieces] = useState();
    const [applications, setApplications] = useState();
    const [gigs, setGigs] = useState();
    
    useEffect(() => {
        async function getItemsOfTheWeek() {
            const writerRes = await PrintApi.getWriterById(3);
            const pieceRes1 = await PrintApi.getPieceById(2);
            const pieceRes2 = await PrintApi.getPieceById(4);
            const appRes = await PrintApi.getApplictionByPlatformId(platform.platformId);
            const gigRes = await PrintApi.getAllGigs({platformId: platform.platformId});
            setGigs(gigRes);
            setWriter(writerRes);
            setPieces([pieceRes1, pieceRes2]);
            setApplications(appRes.filter(a => a.status === "Pending"));
        };
        getItemsOfTheWeek();
    }, []);

    return(
        <div>
            {applications && gigs ? <div className="container">
                <div className="row text-center">
                    <div className="col">
                        <h1 className="display-4">Welcome Back {platform.displayName}</h1>
                        <small><span className="badge badge-warning">You currently have {applications.length} applications labled pending.</span></small><br/>
                        <small><span className="badge badge-success">You currently have {gigs.filter(g => g.isActive).length} active Gig Postings.</span></small><br/>
                        <small><span className="badge badge-info">You currently have {gigs.filter(g => !g.isActive).length} Ongoing Gigs.</span></small><br/>
                    </div>
                </div>
                
            </div> : ""}
        </div>
    )
};


export default PlatformHomepage;

// <div>
//             <br/>
//             <h1>Welcome back {platform.displayName}!</h1>

//             <div className='container'>
//                 <div className="row">
//                     {writer ? 
//                     <div className="card mr-5" style={{width: 30+'em'}} id="weekCard">
//                         <h3>Writer of the Week</h3>
//                         <img className="card-img-top" src={writer.imageUrl} alt="Platform of the week img"/>
//                         <div className='card-body'>
//                             <h3 className='card-title'><Link to={`writers/${writer.id}`}>{writer.firstName} {writer.lastName}</Link>-{writer.city}, {writer.state}</h3>
//                             <h2>
//                                 <a className='mr-5' href={`https://www.twitter.com/${writer.twitterUsername}`}><FaTwitter/></a>
//                                 <a className='mx-5' href={`https://www.facebook.com/${writer.facebookUsername}`}><FaFacebook/></a>
//                                 <a className='ml-5' href={`https://www.youtube.com/${writer.youtubeUsername}`}><FaYoutube/></a>
//                             </h2>
//                             <p className='card-text'>{writer.bio}</p>

//                             <h5 className='card-title'>Current Portfolios</h5>
//                             <ul className="list-group list-group-flush">
//                                 {writer.portfolios.map(p => <li key={p.id} className="list-group-item"><Link to={`/portfolios/${p.id}`}>{p.title}</Link></li>)}
//                             </ul>
//                             <hr/>
//                             <h4><Link to="/writers">More Writers</Link></h4>
//                         </div>
//                     </div>
//                     : ""}

//                     {pieces ?
//                         <div className='card ml-5' style={{width: 30+'em'}} id="weekCard">
//                             <h3>Pieces of the Week</h3>
//                             <div className='card-body'>
//                                 <h3 className="card-title"><Link to={`/pieces/${pieces[0].id}`}>{pieces[0].title}</Link></h3>
//                                 <h4 className="card-title">Writer: <Link to={`/writers/${pieces[0].writerId}`}>{pieces[0].firstName} {pieces[0].lastName}</Link></h4>
//                                 <p className='card-text'>{pieces[0].text}</p>
                                
//                                 <p><b>Tagged:</b> {pieces[0].tags.map(g =>`  ${g.title} | `)}</p>

//                                 <h3 className="card-title"><Link to={`/pieces/${pieces[1].id}`}>{pieces[1].title}</Link></h3>
//                                 <h4 className="card-title">Writer: <Link to={`/writers/${pieces[1].writerId}`}>{pieces[1].firstName} {pieces[1].lastName}</Link></h4>
//                                 <p className='card-text'>{pieces[1].text.slice(0, 300)}</p>
                                
//                                 <p><b>Tagged:</b> {pieces[1].tags.map(g =>`  ${g.title} | `)}</p>

//                                 <hr/>
//                                 <h4><Link to="/pieces">More Pieces</Link></h4>

//                             </div>
//                         </div>
//                         : ""}
//                 </div>
//             </div>
//         </div>