import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import "./PieceCard.css";

function PieceCard({piece}) {
    const { currentUser } = useContext(UserContext);
    return(
        <div className="card" id="pieceCard">
            <div className="card-text">
                <p><Link to={`/pieces/${piece.id}`}>{piece.title}</Link> || Submitted On {piece.createdAt.slice(0, 10)}</p>
                {currentUser.writerId == piece.writerId ? <Link to={`/pieces/${piece.id}/edit`}>Edit</Link> : ""}
                <p>{piece.text.substring(0, 200)}...</p>
                <p><Link to={`/pieces/${piece.id}`}>Click to Read More!</Link></p>
            </div>
        </div>
    )
};

export default PieceCard;