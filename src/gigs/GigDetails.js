import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from '../auth/UserContext';
import {FaCheck, FaTimes, FaEdit} from 'react-icons/fa';
import RelatedItems from "./RelatedItems";
import ApplicationCard from '../applications/ApplicationCard';

function GigDetails() {
    const { currentUser } = useContext(UserContext);
    const { gigId } = useParams();
    const [gig, setGig] = useState();
    const [applications, setApplications] = useState();
    const history = useHistory();
    const [formData, setFormData] = useState({
        status: ""
    });

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

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    async function submit(applicationId) {
        const res = await PrintApi.updateApplicationStatus(gig.platformId, applicationId, formData);
        const updatedAppIdx = applications.map(a => a.id).indexOf(applicationId);
        const updatedApp = applications.splice(applications.map(a => a.id).indexOf(applicationId), 1)[0];
        updatedApp.status = res.status;
        applications.splice(updatedAppIdx, 0, updatedApp);
        setApplications([...applications]);
    }

    const colors = {
        "Pending": "yellow",
        "Rejected": "red",
        "Accepted": "green"
    };

    return(
        <div>
            {gig ? 
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h1>{gig.title}</h1>
                        <h4>From Platform: <Link to={`/platforms/${gig.platformId}`}>{gig.displayName}</Link>{currentUser.platformId === gig.platformId ? <Link to={`/gigs/${gigId}/edit`}><FaEdit className="ml-2 mb-1"/></Link> : ""}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2 border-right">
                        <p>Gig Tagged With:</p>
                        <ul>
                            {gig.tags.map(g => <li key={g.id}>{g.title[0].toUpperCase() + g.title.slice(1)}</li>)}
                        </ul>
                    </div>
                    <div className="col mt-3">
                        <small><b>Gig Description: </b>{gig.description}</small>
                    </div>
                </div>
                <div className="row">
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
                {currentUser.writerId ? 
                <div className="row">
                    <Link to={`/gigs/${gigId}/apply`}><button className="btn btn-info">Apply!</button></Link>
                </div> 
                : ""}
                {currentUser.platformId === gig.platformId && applications ? 
                <div>
                    <div className="row mt-2">
                                <div className="col" id="applications">
                                    <table className="table text-center">
                                        <thead>
                                            <tr>
                                                <th>Gig Title</th>
                                                <th>Writer</th>
                                                <th>Portfolio Submitted</th>
                                                <th>Status</th>
                                                <th>Update Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.map(a => 
                                            <tr key={a.id}>
                                                <td><Link to={`/gigs/${a.gigId}`}>{a.gigTitle}</Link></td>
                                                <td><Link to={`/writers/${a.writerId}`}>{a.firstName} {a.lastName}</Link></td>
                                                <td><Link to={`/portfolios/${a.portfolioId}`}>{a.portfolioTitle}</Link></td>
                                                <td style={{backgroundColor: colors[a.status]}}>{a.status}</td>
                                                <td>
                                                    <select name="status" id="status-select" defaultValue={a.status} onChange={handleChange}>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Accepted">Accepted</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                    <button className="btn btn-success btn-sm mb-2 ml-2" onClick={() => submit(a.id)}>Update</button>
                                                </td>
                                            
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                </div>
                : ""}
                <div className="row">
                    {currentUser.platformId === gig.platformId ? 
                    <div className="col mt-5">
                        <p className="text-center">Writers and Pieces with Related Tags</p>
                        <RelatedItems/> 
                    </div>
                    : "" }
                </div>
            </div>
            :""}
        </div>


            
    )};

export default GigDetails

