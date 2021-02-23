import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import PortfolioCard from '../portfolios/PortfolioCard';
import UserContext from '../auth/UserContext';

function WriterDetails() {
    const { currentUser, platformWriterFollows, setPlatformWriterFollows } = useContext(UserContext);
    const { writerId } = useParams();
    const [writer, setWriter] = useState();
    
    const [applications, setApplications] = useState();

    //BOOLEAN used to see if writer followed
    const [followed, setFollowed] = useState();
    
    useEffect(() => {
        async function getWriter() {
            const writerRes = await PrintApi.getWriterById(writerId);
            setWriter(writerRes);
            if(writerId == currentUser.writerId) {
                const appRes = await PrintApi.getApplicationsByWriterId(writerId);
                setApplications(appRes);
            };
            if(currentUser.writerId === null) {
                setFollowed(platformWriterFollows.map(f => f.writerId).indexOf(parseInt(writerId)) !== -1);
            }
        };
        getWriter();
    }, [writerId]);
    
    async function follow(platformId) {
        const followRes = await PrintApi.platformFollowWriter(platformId, writerId);
        setFollowed(true);
        setPlatformWriterFollows([...platformWriterFollows, followRes]);
    };

    async function unfollow(platformId) {
        await PrintApi.platformUnfollowWriter(platformId, writerId);
        setFollowed(false);
        platformWriterFollows.splice(platformWriterFollows.map(f => f.writerId).indexOf(writerId), 1);
    };

    async function withdrawApplication(writerId, gigId) {
        if(window.confirm("Are you sure you want to withdraw this application?")) {
            await PrintApi.withdrawApplication(writerId, gigId);
            applications.splice(applications.map(a => a.gigId).indexOf(gigId), 1);
            setApplications([...applications]);
        } else {
            return;
        }
    };

    return(
        <div>
            <h1>Writer Details</h1>

            {currentUser.writerId===null ? 
                
                <div>
                    {followed ? <button onClick={() => unfollow(currentUser.platformId)}>Unfollow</button> : 
                            
                            <button onClick={() => follow(currentUser.platformId)}>Follow</button>}
                </div>

             : ""}
            

            {writer ? <h1>{writer.firstName} {writer.lastName} {writer.bio}</h1> : <h1>Loading</h1>}

            <h2>Portfolios</h2> {currentUser.writerId==writerId ? <button><Link to={`/writers/${writerId}/portfolios/new`}>Add New Portfolio</Link></button> : ""}

            {writer ? writer.portfolios.map(p => <PortfolioCard portfolio={p} key={p.id}/>) : ""}

            <h2>Pieces {currentUser.writerId==writerId ? 
            
            <button><Link to={`/writers/${writerId}/pieces/new`}>Add New Piece</Link></button> : ""}</h2>

            <h2><Link to={`/writers/${writerId}/pieces`}>Click here to see writer pieces</Link></h2>

            <h5>Applications</h5>

            {applications ? applications.map(a => 
            <li key={a.id}>
                <Link to={`/gigs/${a.gigId}`}>
                    {a.gigId}
                </Link>
                 <Link to={`/portfolios/${a.portfolioId}`}>
                     {a.portfolioId}
                </Link>
                <button onClick={() => withdrawApplication(a.writerId, a.gigId)}>X</button>
            </li>) : ""}

            {currentUser.writerId == writerId ? <h1>This belongs to the writer</h1> : "THIS DOES NOT BELONG TO WRITER"}
        </div>
    )
};

export default WriterDetails