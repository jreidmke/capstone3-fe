import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import { FaTimes, FaEdit } from 'react-icons/fa';
import "./PieceDetails.css";

function PieceDetails() {
    const { currentUser } = useContext(UserContext);
    const {pieceId} = useParams();
    const [piece, setpiece] = useState();
    const history = useHistory();

    useEffect(() => {
        async function getpiece() {
            const pieceRes = await PrintApi.getPieceById(pieceId);
            setpiece(pieceRes);
        };
        getpiece();
    }, []);

    async function deletePiece(writerId, pieceId) {
        if(window.confirm("Are you sure you want to delete this piece?")) {
            await PrintApi.deletePiece(writerId, pieceId);
            history.push(`/writers/${currentUser.writerId}/pieces`);
        } else {
            return;
        }
    };

    return(
        <div className="container">
            {piece ? 
            <div>
                <div className="row mt-3">
                    <div className="col-4">
                        <img src={piece.imageUrl} id="writerImage"/>

                        {currentUser.platformId ? <div className="row">
                            <div className="col">
                                <h4><span className="badge badge-success"><Link to={`/writers/${piece.writerId}/make-offer`}>Make this Writer An Offer</Link></span></h4>
                            </div>
                        </div> : ""}

                        <h2>By: <Link to={`/writers/${piece.writerId}`}>{piece.firstName} {piece.lastName}</Link></h2>
                        <h6>Submitted: {piece.createdAt.slice(0, 10)}</h6>
                        <ul className="mb-3">
                        <div className="text-success" id="listLabel">Tagged With:</div>
                            {piece.tags.map(t => <li>{t.title}</li>)}
                        </ul>
                        {currentUser.writerId ? <small>*to add or remove tags, select the edit button at the top.</small> : ""} 
                    </div>
                    <div className="col mt-5">
                        <h1>{piece.title} {currentUser.writerId===piece.writerId ? 
                        <span>
                            <Link to={`/pieces/${piece.id}/edit`} className="ml-1"><FaEdit/></Link>
                            <FaTimes onClick={() => deletePiece(piece.writerId, piece.pieceId)} color='red' className="ml-3" id="deleteBtn"/>
                        </span>
                        : ""}</h1>
                        <p className="mt-3">{piece.text}</p>
                    </div>
                </div> 
                
            </div>
            : ""}
        </div>
    )
};

export default PieceDetails;