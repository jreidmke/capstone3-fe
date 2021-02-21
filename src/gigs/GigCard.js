import { Link } from 'react-router-dom';

function GigCard({gig}) {
    return(
        <div className="card">
            <div className="card-text">
                <Link to={`/gigs/${gig.id}`}>{gig.title}</Link>
                <p>{gig.description.substring(0, 500)}...</p>
            </div>
        </div>
    )
};

export default GigCard;