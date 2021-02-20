import { Link } from 'react-router-dom';

function PortfolioCard({portfolio}) {
    return(
        <div className="card">
            <div className="card-text">
                <Link to={`/portfolios/${portfolio.id}`}>{portfolio.title}</Link>
            </div>
        </div>
    )
};

export default PortfolioCard;