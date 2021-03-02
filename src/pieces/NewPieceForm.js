import { useContext, useState } from 'react';
import PrintApi from '../api/api';
import { useHistory } from 'react-router-dom';
import UserContext from '../auth/UserContext';

function NewPieceForm() {
    const { currentUser } = useContext(UserContext);
    const history = useHistory();

    const [formData, setFormdata] = useState({
        title: "",
        text: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormdata({...formData, [name]: value});
    };

    async function submit(e) {
        e.preventDefault();
        const newPiece = await PrintApi.createPiece(currentUser.writerId, formData);
        history.push(`/pieces/${newPiece.id}/edit`);
    };

    return(
        <div>
            <p>Simply write up your piece right now. You'll add tags to it after you create the piece!</p>
            <form onSubmit={submit}>
                <input 
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                    placeholder="Piece Title"/>
                <textarea 
                    type="text"
                    name="text"
                    onChange={handleChange}
                    value={formData.text}
                    placeholder="Piece Text"
                    rows="4" 
                    cols="50"/>
                <button>Submit</button>
            </form>
        </div>
    )
};

export default NewPieceForm;