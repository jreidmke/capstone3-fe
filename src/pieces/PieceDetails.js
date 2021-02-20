import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';

function PieceDetails() {
    const { currentUser } = useContext(UserContext);
    const {pieceId} = useParams();
    const [piece, setpiece] = useState();

    useEffect(() => {
        async function getpiece() {
            const pieceRes = await PrintApi.getPieceById(pieceId);
            setpiece(pieceRes);
        };
        getpiece();
    }, []);

    return(
        <div>
            {piece ? <h1>{piece.title} {piece.text}</h1> : "Loading"}

            {piece ? piece.tags.map(t => <p>{t.title}</p>) : "Tags"}

            {currentUser && piece && currentUser.writerId == piece.writerId ? "This piece belongs to writer" : "This piece doesn't belong to writer"}

        </div>
    )
};

export default PieceDetails;