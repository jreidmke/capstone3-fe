import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import PieceCard from '../pieces/PieceCard';

function PlatformFeed({platformId}) {
    const { currentUser, platformWriterFollows, platformTagFollows } = useContext(UserContext);
    const [pieces, setPieces] = useState();

    useEffect(() => {
        async function getGigs() {
            const tagRes = await PrintApi.getPiecesForFeedFromTags(platformId, platformTagFollows.map(f => f.tagId));
            const writerRes = await PrintApi.getPiecesForFeedFromWriters(platformId, platformWriterFollows.map(f => f.writerId));
            setPieces([writerRes, tagRes].flat());
        };
        getGigs();
    }, []);

    return(
        <div>
            {pieces ? pieces.map(p => <PieceCard key={p.id * Math.random()} piece={p}/>) : ""}
        </div>
    )
};

export default PlatformFeed;