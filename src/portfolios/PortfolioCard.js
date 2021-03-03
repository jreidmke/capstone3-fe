import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../auth/UserContext';
import { FaEdit } from 'react-icons/fa';

function PortfolioCard({portfolio}) {
    const { currentUser } = useContext(UserContext);

    return(
        <div className="card">
            <div className="card-text">
                <Link to={`/portfolios/${portfolio.id}`}>
                    {portfolio.title}
                </Link>
                {currentUser.writerId === portfolio.writerId ? 
                <Link to={`/portfolios/${portfolio.id}/edit`} className="ml-3">
                   <FaEdit/>
                </Link>
                : ""}
            </div>
        </div>
    )
};

export default PortfolioCard;