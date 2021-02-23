import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import GigCard from '../gigs/GigCard';

function WriterFeed(writerId) {
    const { currentUser, writerPlatformFollows, writerTagFollows } = useContext(UserContext);
    const [gigs, setGigs] = useState();

    useEffect(() => {
        async function getGigs() {
            const tagRes = await PrintApi.getGigsForFeedFromTags(writerId.writerId, writerTagFollows.map(f => f.tagId));
            const platformRes = await PrintApi.getGigsForFeedFromPlatforms(writerId.writerId, writerPlatformFollows.map(f => f.platformId));
            setGigs([platformRes, tagRes].flat());
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