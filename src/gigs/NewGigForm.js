import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';

function NewGigForm() {
    //what we need: User ID, PortfolioId, list of all user pieces
    const { currentUser } = useContext(UserContext);
    const history = useHistory();

    if(currentUser.platformId === null) history.push("/login");
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        compensation: "",
        isRemote: "",
        wordCount: "",
        isActive: ""
    });

    function handleChange(e) {
        const { name, value }= e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    async function submit(e) {
        e.preventDefault();
        let result = await PrintApi.createGig(currentUser.platformId, formData);
        history.push(`/gigs/${result.id}/edit`);
    };
    
    return(
        <div className="container">
            <form onSubmit={submit}>
                <input
                    name="title"
                    value={formData.title}
                    type="text"
                    onChange={handleChange}
                    placeholder={"Title"}
                    className="form-control"
                    />

                <textarea 
                    name="description"
                    value={formData.description}
                    type="text"
                    onChange={handleChange}
                    placeholder={"Text"}
                    className="form-control"
                    />

                <input
                    name="compensation"
                    value={formData.compensation}
                    type="number"
                    onChange={handleChange}
                    placeholder="Compensation"
                    className="form-control"

                />

            <label htmlFor="isRemote">Is Remote</label>
                <select name="isRemote" id="isRemote" value={formData.isRemote} onChange={handleChange} className="form-control">
                    <option value="">--</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>     
            
            <label htmlFor="isActive">Is Active</label>
                <select name="isActive" id="isActive" value={formData.isActive} onChange={handleChange} className="form-control">
                    <option value="">--</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select> 

            <label htmlFor="wordCount">Word Count</label>  
                <input
                    name="wordCount"
                    value={formData.wordCount}
                    type="number"
                    onChange={handleChange}
                    placeholder="wordCount"
                    className="form-control"

                />

<button>Sumbit</button>

            </form>

        </div>
    )
};

export default NewGigForm;