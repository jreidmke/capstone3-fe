import { useContext } from 'react';
import UserContext from "../auth/UserContext";
import { Redirect, useParams, Link } from 'react-router-dom';
import { FaPenFancy, FaTimes } from 'react-icons/fa';
import PrintApi from '../api/api';

function MessagePage() {
    const { currentUser, queries, appMsgs, setAppMsgs } = useContext(UserContext);
    const { writerId } = useParams();
    const length = [queries,appMsgs].flat().length;

    if(currentUser.writerId !== +writerId) return <Redirect to={"/login"}/>

    const statusColors = {
        "Pending": "yellow",
        "Accepted": "green",
        "Rejected": "red"
    };

    async function dismissMessage(msgId) {
        if(window.confirm("Are you sure you want to dismiss this message? You will not be able to retrieve it.")) {
            await PrintApi.dismissApplicationMessage(writerId, msgId);
            appMsgs.splice(appMsgs.map(a => a.id).indexOf(msgId), 1);
            setAppMsgs([...appMsgs]);
        };
        return;
    };

    // async function withdrawApplication(writerId, gigId) {
    //     if(window.confirm("Are you sure you want to withdraw this application?")) {
    //         await PrintApi.withdrawApplication(writerId, gigId);
    //         applications.splice(applications.map(a => a.gigId).indexOf(gigId), 1);
    //         setApplications([...applications]);
    //     } else {
    //         return;
    //     }
    // };


    console.log(appMsgs);

    if(currentUser.platformId || currentUser.writerId !== +writerId) return <Redirect to={"/login"}/>
    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>There are {length} messages for {currentUser.firstName}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <h4>Gig Queries</h4>
                    {queries.map(q => 
                        <div key={q.id} className="card py-2 my-2">
                            <div className="card-title">
                                <h5><Link to={`/gigs/${q.gigId}`}>{q.gigTitle}</Link></h5>
                                <h6>Posted By: <Link to={`/platforms/${q.platformId}`}>{q.displayName}</Link></h6>
                                <h6>Query Sent On: {q.createdAt.slice(0,10)}</h6>
                            </div>
                            <div className="card-body">
                                <p><b>Gig Description: </b>{q.gigDescription}</p>
                                <p>Message From {q.displayName}: {q.message}</p>
                                <Link to={`gigs/${q.gigId}/apply`} className="card-link">Apply Now!</Link>
                            </div>
                        </div>
                        )}
                </div>
                <div className="col"/>
                <div className="col-5">
                    <h4>Application Updates</h4>
                    {appMsgs.map(a =>
                    <div key={a.id} className="card py-2 my-2">
                        <div className="card-title">
                            <FaTimes color="red" className="float-right mr-2" size="2rem" onClick={() => dismissMessage(a.id)}/>
                            <h5>
                                On {a.createdAt.slice(0, 10)}, your application for Gig: <Link to={`/gigs/${a.gigId}`}>{a.gigTitle}</Link> was updated to <span style={{color: statusColors[a.status]}}>{a.status}</span>.
                            </h5>
                            <FaPenFancy color={statusColors[a.status]} size="3rem"/>
                            <h6><Link to={`/platforms/${a.platformId}`} className="card-link">Reach Out to {a.displayName}</Link></h6>
                        </div>
                    </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default MessagePage;