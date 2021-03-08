import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import removeFromArr from '../helpers/removeFromArr';
import "./EditPortfolioForm.css";
import { FaTimes, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function EditPortfolioForm() {
    //what we need: User ID, PortfolioId, list of all user pieces
    const { currentUser } = useContext(UserContext);
    const {portfolioId} = useParams();
    
    const [portfolio, setPortfolio] = useState();
    const [piecesIn, setPiecesIn] = useState();
    const [piecesOut, setPiecesOut] = useState();
    const history = useHistory();
    
    const [formData, setFormData] = useState({
        title: ""
    });


    useEffect(() => {
        async function getItems() {
            const portfolioRes = await PrintApi.getPortfolioById(portfolioId);
            setPortfolio(portfolioRes);

            setFormData({
                title: portfolioRes.title
            });

            setPiecesIn(portfolioRes.pieces);

            if(portfolioRes.writerId !== currentUser.writerId) history.push("/login");

            const piecesRes = await PrintApi.getPiecesByWriterId(currentUser.writerId);
            setPiecesOut(removeFromArr(piecesRes, portfolioRes.pieces));
        };
        getItems();
    }, []);

    function handleChange(e) {
        const { name, value }= e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    async function submit(e) {
        e.preventDefault();
        await PrintApi.updatePortfolio(portfolio.id, currentUser.writerId, formData);
        history.push(`/portfolios/${portfolioId}`)
    };

    async function addPieceToPortfolio(writerId, portfolioId, pieceId) {
        let addedPiece = piecesOut.splice(piecesOut.map(p => p.id).indexOf(pieceId), 1)[0];

        setPiecesOut(piecesOut)

        await PrintApi.addPieceToPortfolio(writerId, portfolioId, pieceId);

        setPiecesIn([...piecesIn, addedPiece]);
    };

    async function removePieceFromPortfolio(writerId, portfolioId, pieceId) {
        let removedPiece = piecesIn.splice(piecesIn.map(p => p.id).indexOf(pieceId), 1)[0];

        setPiecesIn(piecesIn);

        await PrintApi.removePieceFromPortfolio(writerId, portfolioId, pieceId);
        setPiecesOut([...piecesOut, removedPiece]);
    };

    async function deletePortfolio(writerId, portfolioId) {
        if(window.confirm("Are you sure you want to delete this portfolio? Note: This will not delete the pieces in the portfolio.")) {
            await PrintApi.deletePortfolio(writerId, portfolioId);
            history.push(`/writers/${currentUser.writerId}`);
        } else {
            return;
        }
    };
    
    return(
        <div>
            {portfolio ? 
            <div className="container">
                <div className="row mt-3">
                    <div className="col">
                        <h4 className="text-center">Edit Portfolio: {portfolio.title}</h4>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <form onSubmit={submit}>
                            <input
                                name="title"
                                value={formData.title}
                                type="text"
                                onChange={handleChange}
                                placeholder={portfolio ? portfolio.title : "Title"}
                                id="portfolioTitleInput"
                                className="form-control"/>
                            <button className="btn btn-info btn-lg btn-block">Update Portfolio</button>
                        </form>
                        <button className="btn btn-danger btn-lg btn-block" onClick={() => deletePortfolio(currentUser.writerId, portfolioId)}>Delete Portfolio</button>

                    </div>
                    <div className="col-1"/>
                    <div className="col-4">
                        <div className="row">
                            <h6 className="text-center">Select the pieces you want in this portfolio below. Try to select pieces of a consistent theme as this is your submission material for <Link to={`/gigs`}>gigs.</Link></h6>
                        </div>
                        <div className="row">

                            <div className="col">
                                <h4 className="text-success text-center">In</h4>
                                <ul>
                                    {piecesIn ? piecesIn.map(p => 
                                    <li>
                                        <Link to={`/pieces/${p.id}`}>{p.title}</Link>
                                        <FaTimes onClick={()=>removePieceFromPortfolio(currentUser.writerId, portfolio.id, p.id)} color="red"/>
                                    </li>
                                    ) : ""}
                                </ul>
                            </div>

                            <div className="col">
                                <h4 className="text-danger text-center">Not In</h4>
                                <ul>
                                    {piecesOut ? piecesOut.map(p => 
                                    <li>
                                        <Link to={`/pieces/${p.id}`}>{p.title}</Link>
                                        <FaPlus onClick={()=>addPieceToPortfolio(currentUser.writerId, portfolio.id, p.id)} color="green"/>
                                    </li>) 
                                    : ""}
                                </ul>
                            </div>


                        </div>
                    </div>  
                </div>

            </div>
            : ""}
        </div>
    )
};

export default EditPortfolioForm;