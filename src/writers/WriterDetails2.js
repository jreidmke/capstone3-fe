import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import PortfolioCard from '../portfolios/PortfolioCard';
import UserContext from '../auth/UserContext';
import WriterFeed from "./WriterFeed";
import WriterFollows from './WriterFollows';
import "./WriterDetails.css";

function WriterDetails2() {
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
            if(+writerId === currentUser.writerId) {
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
            {console.log(writer)}
            {writer ?
            <div className="container">

                <div className="row mt-4">
                    <div className="col">
                        <div className="row"><img src={writer.imageUrl} id="writerImg" className="rounded" alt="Writer Profile Image"/></div>
                        <div className="row">
                            <h1 className="text-center">{writer.firstName} {writer.lastName}</h1>
                            <h3>{writer.city}, {writer.state}</h3>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            : ""}
        </div>
    )
};

export default WriterDetails2
