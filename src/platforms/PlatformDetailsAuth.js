import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { Link } from "react-router-dom";
import GigCard from '../gigs/GigCard';
import PlatformFeed from "./PlatformFeed";
import { FaFacebook, FaTwitter, FaYoutube, FaPlus } from 'react-icons/fa';

function PlatformDetailsAuth({platformId}) {
    const [platform, setPlatform] = useState();
    const [gigs, setGigs] = useState();
    const [applications, setApplications] = useState();
    const [formData, setFormData] = useState({
        status: ""
    });

    useEffect(() => {
        async function getPlatform() {
            const platformRes = await PrintApi.getPlatformById(platformId);
            let appRes = await PrintApi.getApplictionByPlatformId(platformId);
            setPlatform(platformRes);
            setGigs(platformRes.gigs);
            setApplications(appRes);
        };
        getPlatform();
    }, []);

    const colors = {
        "Pending": "yellow",
        "Rejected": "red",
        "Accepted": "green"
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    async function submit(applicationId) {
        const res = await PrintApi.updateApplicationStatus(platform.id, applicationId, formData);
        const updatedAppIdx = applications.map(a => a.id).indexOf(applicationId);
        const updatedApp = applications.splice(applications.map(a => a.id).indexOf(applicationId), 1)[0];
        updatedApp.status = res.status;
        applications.splice(updatedAppIdx, 0, updatedApp);
        setApplications([...applications]);
    }

    return(
        <div>
        {platform && applications && gigs ?
            <div className="container mt-5">
                <div className="row">
                    <div className="col mr-2">
                        <div className="row">
                            <div className="col">
                                <img src={platform.imageUrl} alt="Platform Profile Image" id="pictureBox"/>
                            </div>
                            <div className="col" id="contactInfo">
                                <h3>{platform.displayName}</h3>
                                <h6><Link to={`/platforms/${platformId}/edit`}><span className="badge badge-info">Edit Profile</span></Link></h6>
                                <h5>{platform.city}, {platform.state}</h5>
                                <h3>
                                    <a href={`https://www.facebook.com/${platform.facebookUsername}`} className='mx-2'><FaFacebook color="blue"/></a>
                                    <a href={`https://www.twitter.com/${platform.twitterUsername}`} className='mx-2'><FaTwitter color="lightblue"/></a>
                                    <a href={`https://www.youtube.com/${platform.youtubeUsername}`} className='mx-2'><FaYoutube color="red"/></a>
                                </h3>
                                <p>Add headline functionality like status in FB.</p>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col" id="applications">
                                <h5>Applications</h5>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Gig Title</td>
                                            <td>Writer</td>
                                            <td>Portfolio Submitted</td>
                                            <td>Status</td>
                                            <td>Update Status</td>
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
                                                <button className="btn btn-success mt-1" onClick={() => submit(a.id)}>Update</button>
                                            </td>
                                           
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col ml-2">
                        <div className="row">
                            <div className="col overflow-auto" id="feed">
                                <h5>Piece Feed</h5>
                                <PlatformFeed platformId={platformId}/>
                            </div>
                        </div>
                        
                        <div className="row mt-5">
                            <div className="col" id="portfolio">
                                <h5>Gigs<Link to={`/gigs/new`} className="float-right"><FaPlus/></Link></h5>
                                {gigs.map(g => <GigCard key={g.id} gig={g}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        : ""}
    </div>
    )
};

export default PlatformDetailsAuth