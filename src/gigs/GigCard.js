import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';

function GigCard({gig}) {
    const { currentUser } = useContext(UserContext);
    return(
        <div className="card">
            <div className="card-text">
                <Link to={`/gigs/${gig.id}`}>{gig.title}</Link>{currentUser.platformId == gig.platformId ? <Link to={`/gigs/${gig.id}/edit`}>Edit Gig</Link> : ""}
                <p>{gig.description.substring(0, 500)}...</p>
            </div>
        </div>
    )
};

export default GigCard;