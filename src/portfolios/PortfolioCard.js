import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserContext from '../auth/UserContext';

function PortfolioCard({portfolio}) {
    const { currentUser } = useContext(UserContext);

    return(
        <div className="card">
            <div className="card-text">
                <Link to={`/portfolios/${portfolio.id}`}>
                    {portfolio.title} |
                </Link>
                {currentUser.writerId === portfolio.writerId ? 
                <Link to={`/portfolios/${portfolio.id}/edit`}>
                    | Edit
                </Link>
                : ""}
            </div>
        </div>
    )
};

export default PortfolioCard;