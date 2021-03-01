import { useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';

function WriterFollows() {
    const { currentUser, writerTagFollows, writerPlatformFollows } = useContext(UserContext);
    const { writerId } = useParams();
    const history = useHistory();

    if(currentUser.writerId !== +writerId) return history.push(`/login`);
    return(
        <div>
            <h1>Followed Tags</h1>
            <ul>
                {writerTagFollows.map(t => <li>{t.title}</li>)}
            </ul>

            <h1>Followed Platforms</h1>
            <ul>
                {writerPlatformFollows.map(p => <Link to={`/platforms/${p.platformId}`}><li>{p.displayName}</li></Link>)}
            </ul>
        </div>
    ) 
};

export default WriterFollows;