import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams } from "react-router-dom";
import PieceCard from '../pieces/PieceCard';

function WriterPieces() {
    const { writerId } = useParams();
    const [pieces, setPieces] = useState();

    useEffect(() => {
        async function getPiecesByWriterId() {
            const pieceResp = await PrintApi.getPiecesByWriterId(writerId);
            setPieces(pieceResp);
        };
        getPiecesByWriterId();
    }, []);

    return(
        <div>
            {pieces ? pieces.map(p => <PieceCard piece={p}/>) : ""}
        </div>
    )
};

export default WriterPieces