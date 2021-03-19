import { useContext  } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import {FaCheck, FaTimes, FaEdit} from 'react-icons/fa';
import "../pieces/PieceCard";

function GigCard({gig}) {
    const { currentUser } = useContext(UserContext);
    return(
        <div className="container" id="piece-card">
            <div className="row text-center">
                <div className="col-3">
                    <img src={gig.imageUrl} id="piece-img"/>
                    <p id="name"><Link to={`/gigs/${gig.id}`}>{gig.title}</Link></p>
                    <small><Link to={`/platforms/${gig.platformId}`}>{gig.displayName}</Link></small><br/>
                    <small>{gig.city}, {gig.state}</small><br/>
                </div>
                <div className="col">
                    <div className="row">
                        <small><b>Gig Description</b>: {gig.description.length > 700 ? <span>{gig.description.slice(0, 700)}...</span> : gig.description}</small>
                    </div>
                    <div className="row mt-2">
                        <table className="table">
                            <thead>
                                <tr id="gig-table-head">
                                    <th>Compensation</th>
                                    <th>Word Count</th>
                                    <th>$ Per Word</th>
                                    <th>Deadline</th>
                                    <th>Is Remote</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><small>{gig.compensation}</small></td>
                                    <td><small>{gig.wordCount}</small></td>
                                    <td><small>{(gig.compensation / gig.wordCount).toFixed(2)}</small></td>
                                    <td><small>{gig.deadline.slice(0, 10)}</small></td>
                                    <td><small>{gig.isRemote ? <FaCheck color="green"/> : <FaTimes color="red"/>}</small></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>  
                </div>              
            </div>
        </div>
        
    )
};


// compensation: "521.00"
// description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// displayName: "History on TV"
// id: 9
// imageUrl: "https://miro.medium.com/max/8000/1*JrHDbEdqGsVfnBYtxOitcw.jpeg"
// isActive: true
// isRemote: true
// platformId: 5
// title: "We Need a Biographer to Write About the Civil War"
// wordCount: 943
export default GigCard;

{/* <div className="container my-5" id="gigCard">
            <div className="row">
                <div className="col-2">
                    <img src={gig.imageUrl} id="gigImg" alt="gig image"/>
                </div>
                <div className="col">
                    <h4>
                        <Link to={`/gigs/${gig.id}`}>{gig.title}</Link>
                        {currentUser.gigId===gig.gigId ? 
                        <Link to={`/gigs/${gig.id}/edit`} className="ml-2"><FaEdit/></Link>
                        : ""}
                    </h4>
                    <p>gig: <Link to={`/gigs/${gig.gigId}`}>{gig.displayName}</Link></p>
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
        </div> */}