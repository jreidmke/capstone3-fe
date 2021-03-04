import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import { FaEdit } from 'react-icons/fa';
import "./PieceCard.css";

function PieceCard({piece}) {
    const { currentUser } = useContext(UserContext);
    return(
        <div className="container" id="pieceCard">
            <div className="row">
                <div className="col-3">
                    <img src={piece.imageUrl} id="platformImg"/>
                    <p><Link to={`/writers/${piece.writerId}`}>{piece.firstName} {piece.lastName}</Link></p>
                    <small>Submitted On: {piece.createdAt.slice(0,10)}</small>
                </div>
                <div className="col">
                    <h6><Link to={`/pieces/${piece.id}`}>{piece.title}</Link> {currentUser.writerId===piece.writerId ? <Link to={`/pieces/${piece.id}/edit`} className="ml-3"><FaEdit/></Link> : ""}</h6>
                    <p>{piece.text.length > 500 ? `${piece.text.slice(0, 400)}...` : piece.text}</p>
                    <p><Link to={`/pieces/${piece.id}`}>Click to read more!</Link></p>
                </div>
            </div>
        </div>
    )
};

export default PieceCard;

