import { useEffect, useState, useContext } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import removeFromArr from '../helpers/removeFromArr';

function PortfolioEditForm() {
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
        let result = await PrintApi.updatePortfolio(portfolio.id, currentUser.writerId, formData);
        setFormData({
            title: result.title
        });
    };

    async function addPieceToPortfolio(writerId, portfolioId, pieceId) {
        //remove piece from pices out on fe
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
        if(window.confirm("Are you sure you want to delete this portfolio?")) {
            await PrintApi.deletePortfolio(writerId, portfolioId);
            console.log("JFIPODS")
            history.push(`/writers/${currentUser.writerId}`);
        } else {
            return;
        }
    };
    
    return(
        <div>
            <form onSubmit={submit}>
                <input
                    name="title"
                    value={formData.title}
                    type="text"
                    onChange={handleChange}
                    placeholder={portfolio ? portfolio.title : "Title"}/>
                <button>Sumbit</button>
            </form>


            <h4>In Portfolio</h4>
            <ul>
                {piecesIn ? piecesIn.map(p => 
                <li>
                    {p.title} <button onClick={()=>removePieceFromPortfolio(currentUser.writerId, portfolio.id, p.id)}>X</button>
                </li>
                ) : ""}
            </ul>

            <h4>Not In Portfolio</h4>
            <ul>
                {piecesOut ? piecesOut.map(p => 
                <li>
                    {p.title} <button onClick={()=>addPieceToPortfolio(currentUser.writerId, portfolio.id, p.id)}>O</button>
                </li>) 
                : ""}
            </ul>
            <button className="button btn-info" onClick={() => history.push(`/writers/${currentUser.writerId}`)}>Confirm</button>
            <button className="button btn-danger" onClick={() => deletePortfolio(currentUser.writerId, portfolioId)}>DELETE</button>
        </div>
    )
};

export default PortfolioEditForm;