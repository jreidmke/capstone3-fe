import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';

function PieceCard({piece}) {
    const { currentUser } = useContext(UserContext);
    return(
        <div className="card">
            <div className="card-text">
                <Link to={`/pieces/${piece.id}`}>{piece.title}</Link> {currentUser.writerId == piece.writerId ? <Link to={`/pieces/${piece.id}/edit`}>Edit</Link> : ""}
                <p>{piece.text.substring(0, 500)}</p>
            </div>
        </div>
    )
};

export default PieceCard;