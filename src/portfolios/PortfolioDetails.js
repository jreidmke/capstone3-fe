import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import { Link } from 'react-router-dom';

function PortfolioDetails() {
    const { currentUser } = useContext(UserContext);
    const {portfolioId} = useParams();
    const [portfolio, setPortfolio] = useState();

    useEffect(() => {
        async function getPortfolio() {
            const portfolioRes = await PrintApi.getPortfolioById(portfolioId);
            setPortfolio(portfolioRes);
        };
        getPortfolio();
    }, []);

    return(
        <div>
            {portfolio ? <h1>{portfolio.title} </h1> : "Loading"}

            {}

            {portfolio ? portfolio.pieces.map(p => <p><Link to={`/pieces/${p.id}`}>{p.title}</Link> {p.text}</p>): "Pieces"}

            {portfolio ? portfolio.tags.map(t => <p>{t.title}</p>) : "Tags"}

            {currentUser && portfolio && currentUser.writerId == portfolio.writerId ? <Link to={`/portfolios/${portfolio.id}/edit`}>Edit</Link> : "This portfolio doesn't belong to writer"}

        </div>
    )
};

export default PortfolioDetails;