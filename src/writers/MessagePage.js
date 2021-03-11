import { useContext } from 'react';
import UserContext from "../auth/UserContext";
import { Redirect, useParams, Link } from 'react-router-dom';
import { FaPenFancy, FaTimes } from 'react-icons/fa';
import PrintApi from '../api/api';

function MessagePage() {
    const { currentUser, queries, setQueries, appMsgs, setAppMsgs } = useContext(UserContext);
    const { writerId } = useParams();
    const length = [queries,appMsgs].flat().length;

    if(currentUser.platformId || currentUser.writerId !== +writerId) return <Redirect to={"/login"}/>

    const statusColors = {
        "Pending": "yellow",
        "Accepted": "green",
        "Rejected": "red"
    };

    async function acceptGig(applicationId, msgId) {
        if(window.confirm("You are accepting this position. This will notify the Platform that you are confirming your acceptance. Proceed?")) {
            await PrintApi.acceptGig(writerId, applicationId);
            appMsgs.splice(appMsgs.map(a => a.id).indexOf(msgId), 1);
            setAppMsgs([...appMsgs]);
        }
    };

    async function declineGig(msgId) {
        if(window.confirm("Are you sure you want to decline this gig? This will notify Platform.")) {
            await PrintApi.dismissApplicationMessage(writerId, msgId);
            appMsgs.splice(appMsgs.map(a => a.id).indexOf(msgId), 1);
            setAppMsgs([...appMsgs]);
        };
        return;
    };

    async function ignoreQuery(queryId) {
        if(window.confirm("You are ignoring this query. Are you sure?")) {
            await PrintApi.ignoreQuery(writerId, queryId);
            queries.splice(queries.map(q => q.id).indexOf(queryId), 1);
            setQueries([...queries]);
        };
        return;
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="text-center">There {length===1 ? "is" : "are" } {length} new message{length===1 ? "" : "s"} for {currentUser.firstName}</h1>
                </div>
            </div>
            {queries.length || appMsgs.length ? 
            <div className="row">
                <div className="col-5 text-center">
                    <h4>Gig Queries</h4>
                    {queries.map(q => 
                        <div key={q.id} className="card p-2 my-2">
                            <div className="card-title">
                                <h5><Link to={`/gigs/${q.gigId}`}>{q.gigTitle}</Link></h5>
                                <h6>Posted By: <Link to={`/platforms/${q.platformId}`}>{q.displayName}</Link></h6>
                                <h6>Query Sent On: {q.createdAt.slice(0,10)}</h6>
                            </div>
                            <div className="card-body">
                                <p><b>Gig Description: </b>{q.gigDescription}</p>
                                <p>Message From {q.displayName}: {q.message}</p>
                                <Link to={`/gigs/${q.gigId}/apply`} className="card-link"><button className="btn btn-success">Apply Now!</button></Link>
                                <button className="btn btn-danger" onClick={()=>ignoreQuery(q.id)}>Ignore</button>
                            </div>
                        </div>
                        )}
                </div>
                <div className="col"/>
                <div className="col-5 text-center">
                    <h4>Application Updates</h4>
                    {appMsgs.map(a =>
                    <div key={a.id} className="card p-2 my-2 ">
                        <div className="card-title">
                            <h5>
                                On {a.createdAt.slice(0, 10)}, your application for Gig: <Link to={`/gigs/${a.gigId}`}>{a.gigTitle}</Link> was updated to <span style={{color: statusColors[a.status]}}>{a.status}</span>.
                            </h5>
                            {a.status==="Accepted" ? <div><button className="btn btn-sm btn-success mx-3" onClick={() => acceptGig(a.appId, a.id)}>Accept Gig</button>
                            <button className="btn btn-sm btn-danger mx-3" onClick={() => declineGig(a.id)}>Decline Gig</button></div> : ""}
                            <h6><Link to={`/platforms/${a.platformId}`} className="card-link">Reach Out to {a.displayName}</Link></h6>
                        </div>
                    </div>
                        )}
                </div>
            </div>
            :""}

        </div>
    )
}

export default MessagePage;