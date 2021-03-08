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
        <div className="container">
            <div className="row my-4">
                <div className="col">
                    <h4 className="text-center">Simply write your piece right now. You'll tag it after you submit.</h4>
                </div>
            </div>
            <div>
                <form onSubmit={submit}>
                    <div className="row my-1">
                        <input 
                            type="text"
                            name="title"
                            onChange={handleChange}
                            value={formData.title}
                            placeholder="Piece Title"
                            className="form-control"
                            required/>
                    </div>
                    <div className="row">
                        <textarea 
                            type="text"
                            name="text"
                            onChange={handleChange}
                            value={formData.text}
                            placeholder="Piece Text"
                            rows="15" 
                            cols="50"
                            className="form-control"
                            required/>
                    </div>
                    <div className="row">
                        <button className="btn btn-lg btn-block btn-info">Submit</button>
                    </div>
                </form>
            </div>
                
                
        </div>
    )
};

export default NewPieceForm;