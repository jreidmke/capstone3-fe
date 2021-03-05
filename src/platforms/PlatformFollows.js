import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';

function PlatformFollows() {
    const { platformTagFollows, platformWriterFollows } = useContext(UserContext);

    return(
        <div>
            <h1>Followed Tags</h1>
            <ul>
                {platformTagFollows.map(t => <li>{t.title}</li>)}
            </ul>
            <h1>Followed Writers</h1>
            <ul>
                {platformWriterFollows.map(w => <Link to={`/writers/${w.writerId}`}><li>{w.firstName} {w.lastName}</li></Link>)}
            </ul>
        </div>
    ) 
};

export default PlatformFollows;