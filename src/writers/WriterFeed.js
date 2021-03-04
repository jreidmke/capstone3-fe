import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import GigCard from '../gigs/GigCard';

function WriterFeed({writerId}) {
    const { currentUser, writerPlatformFollows, writerTagFollows } = useContext(UserContext);
    const [gigs, setGigs] = useState();

    useEffect(() => {
        async function getGigs() {
            let tagRes;
            let platformRes;
            if(writerTagFollows.length) {
                tagRes = await PrintApi.getGigsForFeedFromTags(writerId, writerTagFollows.map(f => f.tagId));
            };
            if(writerPlatformFollows.length) {
                platformRes = await PrintApi.getGigsForFeedFromPlatforms(writerId, writerPlatformFollows.map(f => f.platformId));
            }
            
            setGigs([tagRes, platformRes].flat().filter(x => x !== undefined));
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