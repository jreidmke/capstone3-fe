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
        deadline: ""
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
        console.log(formData)
        let result = await PrintApi.createGig(currentUser.platformId, formData);
        history.push(`/gigs/${result.id}/edit`);
    };
    
    return(
        <div className="container">
            <div className="row">
                <div className="col"><h1>Post a New Gig</h1></div>
            </div>

                <div className="row">
                    <div className="col-5">

                        <form onSubmit={submit}>
                            <div className="row">
                                <div className="col">
                                    <label>Gig Title</label>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="Title"
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label>Gig Description</label>
                                    <textarea 
                                        name="description"
                                        value={formData.description}
                                        type="text"
                                        onChange={handleChange}
                                        placeholder={"Text"}
                                        className="form-control"
                                        rows="5"
                                        />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label>Compensation</label>
                                    <input
                                        name="compensation"
                                        value={formData.compensation}
                                        type="number"
                                        onChange={handleChange}
                                        placeholder="$100"
                                        className="form-control"
                                        />
                                </div>

                                <div className="col">
                                    <label>Is Remote</label>
                                    <select name="isRemote" id="isRemote" value={formData.isRemote} onChange={handleChange} className="form-control">
                                        <option value="">--</option>
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>
                                    </select>  
                                </div>

                                <div className="col">
                                    <label htmlFor="wordCount">Word Count</label>  
                                    <input name="wordCount"
                                        value={formData.wordCount}
                                        type="number"
                                        onChange={handleChange}
                                        placeholder="5000"
                                        className="form-control"
                                    />
                                </div>

                                <div className="col">
                                    <label>Deadline</label>
                                    <input type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        min="2020-03-06"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <button className="btn btn-lg btn-info btn-block mt-3">Create Gig</button>
                        </form>
                    </div>
                    <div className="col-5 mt-5 ml-2">
                        <img src="https://neilpatel.com/wp-content/uploads/2016/05/writer.jpg" style={{borderRadius:"10%", opacity:".5"}}/>
                    </div>
                </div>
        </div>
    )
};

export default NewGigForm;