import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import { Link } from 'react-router-dom';
import "./PortfolioDetails.css";
import {FaEdit} from 'react-icons/fa';

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
                       <h1>
                           {portfolio.title}
                           {currentUser.writerId===portfolio.writerId ?
                            <Link to={`/pieces/${portfolioId}/edit`} className="ml-3"><FaEdit color="green"/></Link>
                        :""}
                        </h1>
                       <h3>
                           A Portfolio By: <Link to={`/writers/${portfolio.writerId}`}>{portfolio.firstName} {portfolio.lastName}</Link>
                        </h3>
                   </div>
               </div>

                <div className="row">
                    <div className="col-4">
                        <h5 className="text-success">Includes Pieces Tagged With:</h5>
                        <ul id="tagList">
                            {portfolio.tags.map(t => <li key={t.id}>{t.title}</li>)}
                        </ul>
                        <small>*to add or remove tags, select the edit button</small>
                    </div>

                    <div className="col">
                        {portfolio.pieces.map(p => 
                        <div key={p.id} className="overflow-auto" id="pieces">
                            <h5><b><Link to={`/pieces/${p.id}`}>{p.title}</Link></b></h5>
                            <p>Submitted At: {p.createdAt.slice(0, 10)}</p>
                            <p>{p.text.slice(0, 300)}...</p>
                            <Link to={`/pieces/${p.id}`}>Click to read more.</Link>
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

