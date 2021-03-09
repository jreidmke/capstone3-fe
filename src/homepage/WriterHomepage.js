import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PrintApi from '../api/api';
import "./Homepage.css";
import { FaTwitter, FaFacebook, FaYoutube} from 'react-icons/fa';
import GigCard from "../gigs/GigCard";

function WriterHomepage({writer}) {
    const [platform, setPlatform] = useState();
    const [gigs, setGigs] = useState();
    const [applications, setApplications] = useState();
    const [ongoingGigs, setOngoingGigs] = useState();

    useEffect(() => {
        async function getItemsOfTheWeek() {
            const platformRes = await PrintApi.getPlatformById(2);
            const gigsRes = await PrintApi.getAllGigs();
            const appRes = await PrintApi.getApplicationsByWriterId(writer.writerId);
            const ongoingRes = await PrintApi.getOngoingWriterGigs(writer.writerId);
            setApplications(appRes.filter(a => a.status==="Pending"));
            setOngoingGigs(ongoingRes);
            setPlatform(platformRes);
            setGigs(gigsRes);
        };
        getItemsOfTheWeek();
    }, []);
    console.log(writer)
    return(
        <div>
            {applications && ongoingGigs && platform && gigs ? 
            <div className="container">
                <div className="row text-center">
                    <div className="col">
                        <h1 className="display-4">Welcome Back {writer.firstName}</h1>
                        <small><span className="badge badge-warning">You  currently have {applications.length} applications labled pending.</span></small><br/>      
                        <small><span className="badge badge-info">You currently have {ongoingGigs.length} Ongoing Gigs.</span></small><br/>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-3">
                        <p>Platform of the Week</p>
                        <img src={writer.imageUrl} id="writer-week-img"/>
                        <p id='writer-week-name'><Link to={`/platform/${platform.id}`}>{platform.displayName}</Link></p>
                        <small>{platform.city}, {platform.state}</small><br/>
                        <small>
                            <a className='mr-3' href={`https://www.twitter.com/${platform.twitterUsername}`}><FaTwitter/></a>
                            <a className='mx-3' href={`https://www.facebook.com/${platform.facebookUsername}`}><FaFacebook/></a>
                            <a className='ml-3' href={`https://www.youtube.com/${platform.youtubeUsername}`}><FaYoutube/></a>
                        </small>
                        <hr/>
                        <small>{writer.bio.slice(0, 200)}...</small>
                        <br/>
                        <small><b>Recently Posted Gigs:</b></small><br/>
                        {platform.gigs.map(g => <span><small><Link to={`/gigs/${g.id}`}>{g.title}</Link></small><br/></span>)}
                    </div>
                    <div className="col"/>
                    <div className="col-8">
                        <p>Recently Posted Gigs</p>
                        {gigs.slice(0, 2).map(g => <GigCard gig={g}/>)}
                    </div>
                </div>
            </div>
            :""}
        </div>
    )
};

export default WriterHomepage;

{/* <div>
<br/>
<h1>Welcome back {writer.firstName}!</h1>

<div className="container">
    <div className="row">

        {platform ? 
        <div className="card mr-5" style={{width: 30+'em'}} id="weekCard">
            <h3 className="my-2">Platform of the Week</h3>
            <hr/>
            <h3 className='card-title'><Link to={`/platforms/${platform.id}`}>{platform.displayName}</Link>-{platform.city}, {platform.state}</h3>
            <img className="card-img-top" src={platform.imageUrl} alt="Platform of the week img"/>
            <div className='card-body'>
                <h2>
                    <a className='mr-5' href={`https://www.twitter.com/${platform.twitterUsername}`}><FaTwitter/></a>
                    <a className='mx-5' href={`https://www.facebook.com/${platform.facebookUsername}`}><FaFacebook/></a>
                    <a className='ml-5' href={`https://www.youtube.com/${platform.youtubeUsername}`}><FaYoutube/></a>
                </h2>
                <p className='card-text'>{platform.description}</p>

                <h5 className='card-title'>Current Gigs</h5>
                <ul className="list-group list-group-flush">
                    {platform.gigs.map(g => <li key={g.id} className="list-group-item"><Link to={`/gigs/${g.id}`}>{g.title}</Link></li>)}
                </ul>
                <hr/>
                <h4><Link to="/platforms">More Platforms</Link></h4>
            </div>
        </div>
        : ""}


        {gig ?
        <div className='card ml-5' style={{width: 30+'em'}} id="weekCard">
            <h3 className="my-2">Gig of the Week</h3>
            <hr/>
            <div className='card-body'>
                <h3 className="card-title"><Link to={`/gigs/${gig.id}`}>{gig.title}</Link></h3>
                <h4 className="card-title">Platform: <Link to={`/platforms/${gig.platformId}`}>{gig.displayName}</Link></h4>
                <p className='card-text'>{gig.description}</p>
                <table className="table">
                    <thead>
                        <tr>
                            <td className="col">Compensation</td>
                            <td className="col">Word Count</td>
                            <td className="col">Remote</td>
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

                <p><b>Tagged:</b> {gig.tags.map(g =>`  ${g.title} | `)}</p>

                <button className="btn btn-success"><Link to={`/gigs/${gig.id}/apply`}>Apply Now!</Link></button>

                <hr/>
                <h4><Link to="/gigs">More Gigs</Link></h4>

            </div>
        </div>
        : ""}

    </div>
</div>
</div> */}

