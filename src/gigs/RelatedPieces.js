import { useState, useEffect, useContext } from 'react';
import PrintApi from '../api/api';
import UserContext from "../auth/UserContext";
import { useParams, Link, useHistory } from 'react-router-dom';

function RelatedPieces() {
    const { currentUser } = useContext(UserContext);
    const { gigId } = useParams();
    const [gig, setGig] = useState();
    const [pieces, setPieces] = useState();

    useEffect(() => {
        async function getItems() {
            const gigRes = await PrintApi.getGigById(gigId);
            setGig(gigRes);
            const pieceRes = await PrintApi.getRelatedPieces(gigId, gigRes.tags.map(t => t.id));
            setPieces(pieceRes);
        };
        getItems();
    }, []);

    return(
        <div>
            {console.log(gig)}
        </div>
    )
};

export default RelatedPieces;