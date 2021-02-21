import { Link } from 'react-router-dom';

function PieceCard({piece}) {
    return(
        <div className="card">
            <div className="card-text">
                <Link to={`/pieces/${piece.id}`}>{piece.title}</Link>
                <p>{piece.text.substring(0, 500)}</p>
            </div>
        </div>
    )
};

export default PieceCard;