import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import { FaEdit } from 'react-icons/fa';
import "./PieceCard.css";

function PieceCard({piece}) {
    const { currentUser } = useContext(UserContext);
    console.log(piece);
    return(
        <div className="container" id="pieceCard">
            <div className="row">
                <div className="col-3">
                    <img src={piece.imageUrl} id="platformImg"/>
                    <p><Link to={`/writers/${piece.writerId}`}>{piece.firstName} {piece.lastName}</Link></p>
                </div>
                <div className="col">
                    <h6><Link to={`/pieces/${piece.id}`}>{piece.title}</Link> {currentUser.writerId===piece.writerId ? <Link to={`/pieces/${piece.id}/edit`} className="ml-3"><FaEdit/></Link> : ""}</h6>
                    <p>{piece.text.length > 500 ? `${piece.text.slice(0, 500)}...` : piece.text}</p>
                </div>
            </div>
        </div>
    )
};

export default PieceCard;

