import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from '../auth/UserContext';
import {FaCheck, FaTimes} from 'react-icons/fa';

function GigDetails() {
    const { currentUser } = useContext(UserContext);
    const { gigId } = useParams();
    const [gig, setGig] = useState();
    const [applications, setApplications] = useState();
    const history = useHistory();

    useEffect(() => {
        async function getGig() {
            const gigRes = await PrintApi.getGigById(gigId);
            setGig(gigRes);
            if(currentUser.platformId === gigRes.platformId) {
                const appRes = await PrintApi.getApplicationsByGigId(gigRes.platformId, gigId);
                setApplications(appRes);
            }
        };
        getGig();
    }, []);

    async function deleteGig(platformId, gigId) {
        if(window.confirm("Are you sure you want to delete this gig?")) {
            await PrintApi.deleteGig(platformId, gigId);
            history.push(`/platforms/${currentUser.platformId}`);
        } else {
            return;
        }
    };

    return(
        <div>

            {gig ? 
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>{gig.title}</h1>
                        <h4>Posted By {gig.displayName}</h4>
                        {gig.platformId === currentUser.platformId ? <h4><Link to={`/gigs/${gigId}/edit`}>Edit Gig</Link></h4> : ""}
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h5>Quick Facts</h5>
                        <p>Compensation: {gig.compensation}</p>
                        <p>Word Count: {gig.wordCount}</p>
                        <p>Remote: {gig.isRemote ? <FaCheck color="green"/> : <FaTimes color="red"/>}</p>
                        <p>Posted On: {gig.createdAt.slice(0, 10)}</p>
                        <p><b>Tags:</b></p> 
                        {gig.tags.map(t => <p key={t.id}>-{t.title}</p>)}
                    </div>
                    <div className="col">
                        <h5>Gig Description</h5>
                        <p>{gig.description}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        {currentUser.writerId ? <h1><Link to={`/gigs/${gigId}/apply`}>Apply Today!</Link></h1> : ""}
                    </div>
                </div>

                {applications ? 
                <div className="row">
                    <div className="col">
                        <h4>Applications</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Applicant Name</td>
                                    <td>Portfolio Submitted</td>
                                    <td>Applied Date</td>
                                    <td>Status</td>
                                    <td>Update Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map(a => 
                                    <tr key={a.id}>
                                        <td><Link to={`/writers/${a.writerId}`}>{a.firstName} {a.lastName}</Link></td>
                                        <td><Link to={`/portfolios/${a.portfolioId}`}>{a.portfolioTitle}</Link></td>
                                        <td>{a.createdAt.slice(0,10)}</td>
                                        <td>{a.status}</td>
                                        <td><Link to={`/platforms/${a.platformId}/applications/${a.id}`}>Update Status</Link></td>
                                    </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                : ""}

                {gig.platformId === currentUser.platformId ? <button className="btn btn-danger" onClick={() => deleteGig(currentUser.platformId, gigId)}>Delete Gig</button> : ""}

            </div>
            : ""}
        </div>
    )};

export default GigDetails

