import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import PieceCard from '../pieces/PieceCard';
import shuffle from '../helpers/arrayShuffle';

function PlatformFeed({platformId}) {
    const { platformWriterFollows, platformTagFollows } = useContext(UserContext);
    const [pieces, setPieces] = useState();

    useEffect(() => {
        async function getGigs() {
            let tagRes;
            let writerRes;
            if(platformTagFollows.length) {
                tagRes = await PrintApi.getPiecesForFeedFromTags(platformId, platformTagFollows.map(f => f.tagId));
            }
            if(platformTagFollows.length) {
                writerRes = await PrintApi.getPiecesForFeedFromWriters(platformId, platformWriterFollows.map(f => f.writerId));
            }
            const feed = shuffle([writerRes, tagRes].flat().filter(x => x !== undefined));
            const pieceIds = feed.map(p => p.pieceId);
            const filterd = feed.filter(({pieceId}, index) => !pieceIds.includes(pieceId, index+1));
            setPieces(filterd);
        };
        getGigs();
    }, []);

    return(
        <div>
            {pieces ? pieces.map(p => <PieceCard key={p.pieceId * Math.random()} piece={p}/>) : ""}
        </div>
    )
};

export default PlatformFeed;