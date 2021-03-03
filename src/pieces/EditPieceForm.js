import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import removeFromArr from '../helpers/removeFromArr';
import "./EditPieceForm.css";
import { FaPlus, FaTimes } from 'react-icons/fa';

function EditPieceForm() {
    //what we need: User ID, PortfolioId, list of all user pieces
    const { currentUser } = useContext(UserContext);
    const {pieceId} = useParams();
    const [piece, setPiece] = useState();
    const [tagsOn, setTagsOn] = useState();
    const [tagsOff, setTagsOff] = useState();
    const history = useHistory();
    
    const [formData, setFormData] = useState({
        title: "",
        text: ""
    });


    useEffect(() => {
        async function getItems() {
            const pieceRes = await PrintApi.getPieceById(pieceId);
            setPiece(pieceRes);
            setFormData({
                title: pieceRes.title,
                text: pieceRes.text
            });

            setTagsOn(pieceRes.tags);

            if(pieceRes.writerId !== currentUser.writerId) history.push("/login");

            const tagRes = await PrintApi.getAllTags();
            setTagsOff(removeFromArr(tagRes, pieceRes.tags));
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
        let result = await PrintApi.updatePiece(piece.writerId, pieceId, formData);
        setFormData({
            title: result.title,
            text: result.text
        });
    };

    async function addTagToPiece(writerId, pieceId, tagId) {
        // //remove piece from pices out on fe
        let addedTag = tagsOff.splice(tagsOff.map(t => t.id).indexOf(tagId), 1)[0];

        setTagsOff(tagsOff)

        await PrintApi.addTagToPiece(writerId, pieceId, tagId);

        setTagsOn([...tagsOn, addedTag]);
    };

    async function removeTagFromPiece(writerId, pieceId, tagId) {
        let removedTag = tagsOn.splice(tagsOn.map(p => p.id).indexOf(tagId), 1)[0];

        setTagsOn(tagsOn);

        await PrintApi.removeTagFromPiece(writerId, pieceId, tagId);
        setTagsOff([...tagsOff, removedTag]);
    };

    async function deletePiece(writerId, pieceId) {
        if(window.confirm("Are you sure you want to delete this piece?")) {
            await PrintApi.deletePiece(writerId, pieceId);
            history.push(`/writers/${currentUser.writerId}`);
        } else {
            return;
        }
    };
    
    return(
        <div className="container">
            {piece ? 
            <div className="container">

                <div className="row">
                    <div className="col"><h1>Edit Piece: {piece.title} <FaTimes color="red" onClick={()=> deletePiece(piece.writerId, piece.id)}/></h1></div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col-2">
                                <label className="mr-2">Piece Title: </label>
                            </div>
                            <div className="col">
                                <label className="mr-2">Piece Text: </label>

                            </div>
                        </div>

                        <form onSubmit={submit}>
                            <div className="row">
                                <div className="col-2">
                                    <input
                                        name="title"
                                        value={formData.title}
                                        type="text"
                                        onChange={handleChange}
                                        placeholder={piece ? piece.title : "Title"}/>
                                </div>

                                <div className="col">
                                    <textarea 
                                        name="text"
                                        value={formData.text}
                                        type="text"
                                        onChange={handleChange}
                                        placeholder={piece ? piece.title : "Text"}
                                        rows="10"
                                        cols="80"/>
                                </div>
                            </div>
                            
                            <button className="btn btn-info">Commit Changes</button>
                        </form>
                    </div>
                </div>
            
                <div className="row mt-3">
                    <div className="col">
                        <h6>Select Tags to Add to Your Piece</h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h4>Tags</h4>
                            <ul>
                                {tagsOn ? tagsOn.map(p => 
                                <li>
                                    {p.title} <FaTimes onClick={()=>removeTagFromPiece(currentUser.writerId, piece.id, p.id)} color="red"/>
                                </li>
                                ) : ""}
                            </ul>
                    </div>
                    <div className="col">
                        <h4>Not Tagged</h4>
                            <ul>
                                {tagsOff ? tagsOff.map(t => 
                                <li>
                                    {t.title} <FaPlus onClick={()=>addTagToPiece(currentUser.writerId, pieceId, t.id)} color="green"/>
                                </li>) 
                                : ""}
                            </ul>
                    </div>

                </div>

                    

                
            </div>

            : ""}
        </div>
    )
};

export default EditPieceForm;

{/* <button className="button btn-info" onClick={() => history.push(`/pieces/${piece.id}`)}>Confirm</button> */}