import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import PrintApi from '../api/api';
import "./WriterHomepage.css";
import { FaTwitter, FaFacebook, FaYoutube, FaCheck, FaTimes} from 'react-icons/fa';

function WriterHomepage({writer}) {
    const [platform, setPlatform] = useState();
    const [gig, setGig] = useState();
    const [tags, setTags] = useState();


    useEffect(() => {
        async function getItemsOfTheWeek() {
            const platformRes = await PrintApi.getPlatformById(2);
            const gigRes = await PrintApi.getGigById(1);
            const tagRes = await PrintApi.getAllTags();
            setPlatform(platformRes);
            setGig(gigRes);
            setTags(tagRes.slice(0, 5));
        };
        getItemsOfTheWeek();
    }, []);
    return(
        <div>
            <br/>
            <h1>Welcome back {writer.firstName}!</h1>

        <div>

            {platform ? 
            <div className="card ml-5" style={{width: 30+'em'}}>
                <h3>Platform of the Week</h3>
                <img className="card-img-top" src={platform.imageUrl} alt="Platform of the week img"/>
                <div className='card-body'>
                    <h3 className='card-title'>{platform.displayName}</h3>
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
                </div>
            </div>
             : ""}


            {gig ?
            <div className='card mx-3' style={{width: 30+'em'}}>
                <h3>Gig of the Week</h3>
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
                </div>
            </div>
            : ""}

            </div>
        </div>
    )
};

export default WriterHomepage;

