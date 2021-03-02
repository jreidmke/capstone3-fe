import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {FaCheck, FaTimes} from 'react-icons/fa';
import "./GigCard.css";

function GigCard({gig}) {
    const { currentUser } = useContext(UserContext);

    return(
       <div className="container m-2" id="gigCard">
            <div className="row">

               <div className="col-3">
                   {currentUser.platformId === gig.platformId ? <div className="mt-5"><Link to={`/gigs/${gig.id}/edit`}>Edit Gig</Link></div> : <Link to={`/platforms/${gig.platformId}`}><img src={gig.imageUrl} alt="Platform Image" id="platformImg"/></Link>}
               </div>

               <div className="col">
                    <p><Link to={`/gigs/${gig.id}`}>{gig.title}</Link></p>
                    <p>{gig.description.slice(0,100)}...<Link to={`/gigs/${gig.id}`}>Click to read more and apply!</Link></p>
               </div>
           </div>
           <div className="row">
                <div className="col">

                    <table className="table">
                        <thead>
                            <tr>
                                <td>Compensation</td>
                                <td>Word Count</td>
                                <td>Is Remote</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{gig.compensation}</td>
                                <td>{gig.wordCount}</td>
                                <td>{gig.isRemote ? <FaCheck color="green"/> : <FaTimes color="red"/>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

       </div>
    )
};

export default GigCard;

// {currentUser.platformId == gig.platformId ? <Link to={`/gigs/${gig.id}/edit`}>Edit Gig</Link> : ""}

{/* <img src="..." alt="..." class="img-thumbnail"> */}

{/* <div className="card">
<div className="card-text">
    <Link to={`/gigs/${gig.id}`}>
        {gig.title}
    </Link>
    <p>{gig.description.substring(0, 100)}...</p>
</div>
</div> */}

{/* <p><Link to={`/platforms/${gig.platformId}`}>{gig.displayName}</Link></p> */}
