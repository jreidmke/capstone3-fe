import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from "react-router-dom";
import UserContext from '../auth/UserContext';

function GigDetails() {
    const { currentUser } = useContext(UserContext);
    const { gigId } = useParams();
    const [gig, setGig] = useState();
    const [tags, setTags] = useState();

    useEffect(() => {
        async function getGig() {
            const gigRes = await PrintApi.getGigById(gigId);
            setGig(gigRes);
            setTags(gigRes.tags);
        };
        getGig();
    }, []);

    return(
        <div>
            {gig ? <h1>{gig.title} {gig.description}</h1> : ""}
            {tags ? tags.map(t => <li>{t.title}</li>) : ""}
            {!currentUser.platformId ? <Link to={`/gigs/${gigId}/apply`}>Apply Today</Link> : ""}
        </div>
    )
};

export default GigDetails