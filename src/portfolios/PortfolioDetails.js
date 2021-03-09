import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import { Link } from 'react-router-dom';
import "./PortfolioDetails.css";
import {FaEdit, FaPenAlt} from 'react-icons/fa';

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
            {portfolio ? 
            <div className="container">
                <div className="row mt-3">
                    <div className="col-4">
                        <h4>{portfolio.title}{currentUser.writerId === portfolio.writerId ? 
                        <Link to={`/portfolios/${portfolioId}/edit`}><FaEdit className="mb-1"/></Link> : 
                        
                        <small><Link to={`/writers/${portfolio.writerId}/make-query`}><button id="query-btn"><FaPenAlt className="m-1"/><small>Query Writer</small></button></Link></small>
}</h4>
                        <h5>A Portfolio By: <Link to={`/writers/${portfolio.writerId}`}>{portfolio.firstName} {portfolio.lastName}</Link></h5>
                        <h6>Created On: {portfolio.createdAt.slice(0, 10)}</h6>
                        <ul>
                            <small className="text-success">Contains Pieces Tagged:</small>
                            {portfolio.tags.map(t => <li key={t.id}><small>{t.title[0].toUpperCase() + t.title.slice(1)}</small></li>)}
                        </ul>
                    </div>

                    <div className="col-8">
                        {portfolio.pieces.map(p => 
                        <div key={p.id} className="overflow-auto" id="pieces">
                            <p><b><Link to={`/pieces/${p.id}`}>{p.title} </Link></b><small> Submitted At: {p.createdAt.slice(0, 10)}</small></p>
                            
                            <p>{p.text.slice(0, 300)}...</p>
                            <Link to={`/pieces/${p.id}`}>Click to read more.</Link>
                        </div>
                            )}
                    </div>
                </div>

            </div>  
        :""}
        </div>
    )
};

export default PortfolioDetails;

// <div className="container mt-2">
// {portfolio ?
// <div>

//    <div className="row">
//        <div className="col">
//            <h1>
            //    {portfolio.title}
//                {currentUser.writerId===portfolio.writerId ?
//                 <Link to={`/pieces/${portfolioId}/edit`} className="ml-3"><FaEdit color="green"/></Link>
//             :""}
//             </h1>
//            <h3>
//                A Portfolio By: <Link to={`/writers/${portfolio.writerId}`}>{portfolio.firstName} {portfolio.lastName}</Link>
//                {currentUser.platformId ? <h4><span className="badge badge-success"><Link to={`/writers/${portfolio.writerId}/make-query`}>Query this Writer for a Gig</Link></span></h4> : ""}
//             </h3>
//        </div>
//    </div>

//     <div className="row">
//         <div className="col-4">
//             <h5 className="text-success">Includes Pieces Tagged With:</h5>
//             <ul id="tagList">
//                 {portfolio.tags.map(t => <li key={t.id}>{t.title}</li>)}
//             </ul>
//             {currentUser.writerId === portfolio.writerId ? <small>*to add or remove tags, select the edit button</small> : ""}
//         </div>

//         <div className="col">
//             {portfolio.pieces.map(p => 
//             <div key={p.id} className="overflow-auto" id="pieces">
                // <h5><b><Link to={`/pieces/${p.id}`}>{p.title}</Link></b></h5>
                // <p>Submitted At: {p.createdAt.slice(0, 10)}</p>
                // <p>{p.text.slice(0, 300)}...</p>
                // <Link to={`/pieces/${p.id}`}>Click to read more.</Link>
//             </div>)
//             }
//         </div>
//     </div>

// </div>

// : ""}

// </div>
