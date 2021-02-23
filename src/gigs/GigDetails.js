import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from '../auth/UserContext';
import ApplicationCard from '../applications/ApplicationCard';

function GigDetails() {
    const { currentUser } = useContext(UserContext);
    const { gigId } = useParams();
    const [gig, setGig] = useState();
    const [tags, setTags] = useState();
    const [applications, setApplications] = useState();
    const history = useHistory();

    useEffect(() => {
        async function getGig() {
            const gigRes = await PrintApi.getGigById(gigId);
            setGig(gigRes);
            setTags(gigRes.tags);
            if(currentUser.platformId == gigRes.platformId) {
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
            {gig ? <h1>{gig.title} {gig.description}</h1> : ""}

            {gig ? <h5>{gig.compensation}//{gig.wordCount}//{gig.isRemote.toString()}</h5> : ""}


            {tags ? tags.map(t => <li key={t.id}>{t.title}</li>) : ""}

            <h1>Applications</h1>
            {applications ? applications.map(a => <ApplicationCard app={a} key={a.id}/>) : ""}


            {applications ? <Link to={`/gigs/${gigId}/edit`}>Edit Gig</Link> : ""}


            {applications ? <button className="button btn-danger" onClick={() => deleteGig(currentUser.platformId, gigId)}>Delete</button> : ""}


            {!currentUser.platformId ? <Link to={`/gigs/${gigId}/apply`}>Apply Today</Link> : ""}

        </div>
    )};

export default GigDetails