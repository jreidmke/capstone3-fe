import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import { FaTimes, FaEdit, FaPenAlt } from 'react-icons/fa';
import "./PieceDetails.css";

function PieceDetails() {
    const { currentUser } = useContext(UserContext);
    const {pieceId} = useParams();
    const [piece, setPiece] = useState();
    const history = useHistory();

    useEffect(() => {
        async function getpiece() {
            const pieceRes = await PrintApi.getPieceById(pieceId);
            setPiece(pieceRes);
        };
        getpiece();
    }, []);

    async function deletePiece(writerId, pieceId) {
        if(window.confirm("Are you sure you want to delete this piece?")) {
            await PrintApi.deletePiece(writerId, pieceId);
            history.push(`/writers/${currentUser.writerId}/piece`);
        } else {
            return;
        }
    };

    return(
        <div>
        {piece ? 
        <div className="container">
            <div className="row mt-3">
                <div className="col-4 text-center">
                    <h4>{piece.title}{currentUser.writerId === piece.writerId ? 
                    <Link to={`/piece/${pieceId}/edit`}><FaEdit className="mb-1"/></Link> : 
                    
                    <small><Link to={`/writers/${piece.writerId}/make-query`}><button id="query-btn"><FaPenAlt className="m-1"/></button></Link></small>
}</h4>
                    <img src={piece.imageUrl} id="writer-img"/>
                    <h5>A piece By: <Link to={`/writers/${piece.writerId}`}>{piece.firstName} {piece.lastName}</Link></h5>
                    <h6>Created On: {piece.createdAt.slice(0, 10)}</h6>
                    <ul>
                        <small className="text-success">Contains piece Tagged:</small>
                        {piece.tags.map(t => <li key={t.id}><Link to={`/pieces?tag-title=${t.title}`}><small>{t.title[0].toUpperCase() + t.title.slice(1)}</small></Link></li>)}
                    </ul>
                </div>
                <div className="col" id="piece-text">
                    <p>{piece.text}</p>
                </div>

                
            </div>

        </div>  
    :""}
    </div>
    )
};

export default PieceDetails;


{/* <div>
{piece ? 
<div className="container">
    <div className="row mt-3">
        <div className="col-4">
            <img src={piece.imageUrl} id="writerImage"/>

            {currentUser.platformId ? <div className="row">
                <div className="col">
                    <h4><span className="badge badge-success"><Link to={`/writers/${piece.writerId}/make-query`}>Query This Writer On Gig</Link></span></h4>
                </div>
            </div> : ""}

            <h2>By: <Link to={`/writers/${piece.writerId}`}>{piece.firstName} {piece.lastName}</Link></h2>
            <h6>Submitted: {piece.createdAt.slice(0, 10)}</h6>
            <ul className="mb-3">
            <div className="text-success" id="listLabel">Tagged With:</div>
                {piece.tags.map(t => <li>{t.title}</li>)}
            </ul>
            {currentUser.writerId ? <small>*to add or remove tags, select the edit button at the top.</small> : ""} 
        </div>
        <div className="col mt-5">
            <h1>{piece.title} {currentUser.writerId===piece.writerId ? 
            <span>
                <Link to={`/piece/${piece.id}/edit`} className="ml-1"><FaEdit/></Link>
            </span>
            : ""}</h1>
            <p className="mt-3">{piece.text}</p>
        </div>
    </div> 
    
</div>
: ""}
</div> */}