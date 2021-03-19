import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import GigCard from '../gigs/GigCard';
import shuffle from "../helpers/arrayShuffle";

function WriterFeed({writerId}) {
    const { writerPlatformFollows, writerTagFollows } = useContext(UserContext);
    const [gigs, setGigs] = useState();

    function removeFromArray(gigArr, appArr) {
        for(let i = 0; i < gigArr.length - 1; i++) {
            for(let v of appArr) {
                if(gigArr[i].id === v.gigId) {
                    gigArr.splice(i, 1);
                }; 
            };    
        };
        return gigArr;
    }

    useEffect(() => {
        async function getGigs() {
            const appliedRes = await PrintApi.getApplicationsByWriterId(writerId);
            let tagRes;
            let platformRes;
            if(writerTagFollows.length) {
                tagRes = await PrintApi.getGigsForFeedFromTags(writerId, writerTagFollows.map(f => f.tagId));
            };
            if(writerPlatformFollows.length) {
                platformRes = await PrintApi.getGigsForFeedFromPlatforms(writerId, writerPlatformFollows.map(f => f.platformId));
            }
            let feed = shuffle([tagRes, platformRes].flat().filter(x => x !== undefined && x.isActive));
            feed = removeFromArray(feed, appliedRes)
            setGigs(feed);
        };
        getGigs();
    }, []);

    return(
        <div>
            {gigs ? gigs.map(g => <GigCard key={g.id * Math.random()} gig={g}/>) : ""}
        </div>
    )
};

export default WriterFeed;