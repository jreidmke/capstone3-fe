import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';

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
        <div>
            {piece ? <h1>{piece.title} {piece.text}</h1> : "Loading"}

            {piece ? piece.tags.map(t => <p>{t.title}</p>) : "Tags"}

            {piece && currentUser.writerId == piece.writerId ? <Link to={`/pieces/${piece.id}/edit`}>EDIT</Link> : ""}

            {piece && currentUser.writerId == piece.writerId ? <button className="button btn-danger" onClick={() => deletePiece(currentUser.writerId, pieceId)}>DELETE</button> : ""}

        </div>
    )
};

export default PieceDetails;