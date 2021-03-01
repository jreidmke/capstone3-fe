import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';

function WriterFollows() {
    const { writerTagFollows, writerPlatformFollows } = useContext(UserContext);

    return(
        <div>
            <h1>Followed Tags</h1>
            <ul>
                {writerTagFollows.map(t => <li key={t.id}>{t.title}</li>)}
            </ul>

            <h1>Followed Platforms</h1>
            <ul>
                {writerPlatformFollows.map(p => <li key={p.id}><Link to={`/platforms/${p.platformId}`}></Link>{p.displayName}</li>)}
            </ul>
        </div>
    ) 
};

export default WriterFollows;