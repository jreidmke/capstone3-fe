import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';

function WriterFollows() {
    const { writerTagFollows, writerPlatformFollows } = useContext(UserContext);

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