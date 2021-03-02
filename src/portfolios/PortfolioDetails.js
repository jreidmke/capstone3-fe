import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import { Link } from 'react-router-dom';
import "./PortfolioDetails.css";

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
        <div className="container mt-2">
            {portfolio ?
            <div>

               <div className="row">
                   <div className="col">
                       <h1>{portfolio.title}</h1>
                       <h5>
                           A Portfolio By: {portfolio.firstName} {portfolio.lastName}
                        </h5>
                        {currentUser && portfolio && currentUser.writerId == portfolio.writerId ? <h5><Link to={`/portfolios/${portfolio.id}/edit`}>Edit or Add Pieces</Link></h5>: ""}

                   </div>
               </div>

                <div className="row">
                    <div className="col-4">
                        <h5>Includes Pieces Tagged With:</h5>
                        <ul id="tagList">
                            {portfolio.tags.map(t => <li key={t.id}>{t.title}</li>)}
                        </ul>
                    </div>

                    <div className="col">
                        {portfolio.pieces.map(p => 
                        <div key={p.id} className="overflow-auto" id="pieces">
                            <h5><b>{p.title}</b></h5>
                            <p>Submitted At: {p.createdAt.slice(0, 10)}</p>
                            <p>{p.text}</p>
                        </div>)
                        }
                    </div>
                </div>

            </div>

            : ""}

        </div>
    )
};

export default PortfolioDetails;

