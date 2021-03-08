import { useContext  } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {FaCheck, FaTimes, FaEdit} from 'react-icons/fa';
import "./GigCard.css";

function GigCard({gig}) {
    const { currentUser } = useContext(UserContext);
    return(
        <div className="container my-5" id="gigCard">
            <div className="row">
                <div className="col-2">
                    <img src={gig.imageUrl} id="platformImg" alt="platform image"/>
                </div>
                <div className="col">
                    <h4>
                        <Link to={`/gigs/${gig.id}`}>{gig.title}</Link>
                        {currentUser.platformId===gig.platformId ? 
                        <Link to={`/gigs/${gig.id}/edit`} className="ml-2"><FaEdit/></Link>
                        : ""}
                    </h4>
                    <p>Platform: <Link to={`/platforms/${gig.platformId}`}>{gig.displayName}</Link></p>
                    <p>Gig Description: {gig.description.slice(0, 400)}... {currentUser.writerId ? <Link to={`/gigs/${gig.id}`}>Click to read more and apply!</Link> : ""}</p>
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
                                <td>Per Word Rate:</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{gig.compensation}</td>
                                <td>{gig.wordCount}</td>
                                <td>{gig.isRemote ? <FaCheck color="green"/> : <FaTimes color="red"/>}</td>
                                <td>${(gig.compensation / gig.wordCount).toFixed(2)} a word</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default GigCard;