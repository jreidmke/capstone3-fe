import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from '../auth/UserContext';

function GigDetails() {
    const { currentUser } = useContext(UserContext);
    const { gigId } = useParams();
    const [gig, setGig] = useState();
    const [tags, setTags] = useState();
    const history = useHistory();

    useEffect(() => {
        async function getGig() {
            const gigRes = await PrintApi.getGigById(gigId);
            setGig(gigRes);
            setTags(gigRes.tags);
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
            {tags ? tags.map(t => <li>{t.title}</li>) : ""}
            {gig && currentUser.platformId == gig.platformId ? <Link to={`/gigs/${gigId}/edit`}>Edit Gig</Link> : ""}
            {gig && currentUser.platformId == gig.platformId ? <button className="button btn-danger" onClick={() => deleteGig(currentUser.platformId, gigId)}>Delete</button> : ""}
            {!currentUser.platformId ? <Link to={`/gigs/${gigId}/apply`}>Apply Today</Link> : ""}
        </div>
    )};

export default GigDetails