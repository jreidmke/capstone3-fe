import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import removeFromArr from '../helpers/removeFromArr';

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
        <div>
            <form onSubmit={submit}>
                <input
                    name="title"
                    value={formData.title}
                    type="text"
                    onChange={handleChange}
                    placeholder={piece ? piece.title : "Title"}/>
                <textarea 
                    name="text"
                    value={formData.text}
                    type="text"
                    onChange={handleChange}
                    placeholder={piece ? piece.title : "Text"}/>
                <button>Sumbit</button>
            </form>


            <h4>Tags</h4>
            <ul>
                {tagsOn ? tagsOn.map(p => 
                <li>
                    {p.title} <button onClick={()=>removeTagFromPiece(currentUser.writerId, piece.id, p.id)}>X</button>
                </li>
                ) : ""}
            </ul>

            <h4>Not Tagged</h4>
            <ul>
                {tagsOff ? tagsOff.map(t => 
                <li>
                    {t.title} <button onClick={()=>addTagToPiece(currentUser.writerId, pieceId, t.id)}>O</button>
                </li>) 
                : ""}
            </ul>


            <button className="button btn-info" onClick={() => history.push(`/writers/${currentUser.writerId}`)}>Confirm</button>
            <button className="button btn-danger" onClick={() => deletePiece(currentUser.writerId, pieceId)}>DELETE</button>
        </div>
    )
};

export default EditPieceForm;