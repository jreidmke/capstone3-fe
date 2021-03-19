import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import { FaEdit } from 'react-icons/fa';
import "./PieceCard.css";

function PieceCard({piece}) {
    const { currentUser } = useContext(UserContext);
    return(
        
        <div className="container" id="piece-card">
            <div className="row">
                <div className="col-2">
                    <img src={piece.imageUrl} id="piece-img"/>
                    <p id="name"><Link to={`/writers/${piece.writerId}`}>{piece.firstName} {piece.lastName}</Link></p>
                    <small>Submitted: {piece.createdAt.slice(0,10)}</small>
                </div>
                <div className="col">
                    <p><Link to={`/pieces/${piece.id || piece.pieceId}`}>{piece.title}</Link> {currentUser.writerId===piece.writerId ? <Link to={`/pieces/${piece.id}/edit`} className="ml-3"><FaEdit/></Link> : ""}</p>
                    <small>{piece.text.length > 500 ? `${piece.text.slice(0, 400)}...` : piece.text}</small>
                    <br/>
                    <small><Link to={`/pieces/${piece.id}`}>Click to read more!</Link></small>
                </div>
            </div>
        </div>
    )
};

export default PieceCard;

