import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import removeFromArr from '../helpers/removeFromArr';
import { FaTimes, FaPlus } from 'react-icons/fa';
import "./EditGigForm.css";

function EditGigForm() {
    //what we need: User ID, PortfolioId, list of all user pieces
    const { currentUser } = useContext(UserContext);
    const {gigId} = useParams();
    const [gig, setGig] = useState();
    const [tagsOn, setTagsOn] = useState();
    const [tagsOff, setTagsOff] = useState();
    const history = useHistory();
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        compensation: "",
        isRemote: "",
        wordCount: "",
        deadline: ""
    });

    useEffect(() => {
        async function getItems() {
            const gigRes = await PrintApi.getGigById(gigId);
            setGig(gigRes);
            setTagsOn(gigRes.tags);
            setFormData({
                title: gigRes.title,
                description: gigRes.description,
                compensation: gigRes.compensation,
                isRemote: gigRes.isRemote,
                wordCount: gigRes.wordCount,
                deadline: gigRes.deadline
            });

            if(gigRes.platformId !== currentUser.platformId) history.push("/login");

            const tagRes = await PrintApi.getAllTags();
            setTagsOff(removeFromArr(tagRes, gigRes.tags));
            console.log(removeFromArr(tagRes, gigRes.tags));
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
        let result = await PrintApi.updateGig(currentUser.platformId, gigId, formData);
        // setFormData({
        //     title: result.title,
        //     description: result.description,
        //     compensation: result.compensation,
        //     isRemote: result.isRemote,
        //     wordCount: result.wordCount,
        //     isActive: result.isActive
        // });
        history.push(`/gigs/${gigId}/relatedPieces`)
    };

    async function addTagToGig(platformId, gigId, tagId) {
        console.log(tagsOff.length)
        let addedTag = tagsOff.splice(tagsOff.map(t => t.id).indexOf(tagId), 1)[0];
        console.log(tagsOff.length)
        setTagsOff(tagsOff)

        await PrintApi.addTagToGig(platformId, gigId, tagId);

        setTagsOn([...tagsOn, addedTag]);
    };

    async function removeTagFromGig(platformId, gigId, tagId) {
        let removedTag = tagsOn.splice(tagsOn.map(t => t.id).indexOf(tagId), 1)[0];

        setTagsOn(tagsOn);

        await PrintApi.removeTagFromGig(platformId, gigId, tagId);
        setTagsOff([...tagsOff, removedTag]);
    };

    async function deleteGig(platformId, gigId) {
        if(window.confirm("Are you sure you want to delete this gig?")) {
            await PrintApi.deleteGig(platformId, gigId);
            history.push(`/platforms/${currentUser.platformId}`);
        } else {
            return;
        }
    };
    
    return(
        <div className="container">
            <div className="row">
                <div className="col">
                <form>
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
                        </form>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <h3>Gig Tags</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-2"/>
                <div className="col-4" id="tagCol">
                    <h4>Tagged</h4>
                    <ul>
                        {tagsOn ? tagsOn.map(t => 
                        <li>
                            {t.title} <FaTimes onClick={()=>removeTagFromGig(currentUser.platformId, gigId, t.id)} color="red"/>
                        </li>
                        ) : ""}
                    </ul>
                </div>
                <div className="col-4" id="tagCol">
                    <h4>Not Tagged</h4>
                    <ul>
                        {tagsOff ? tagsOff.map(t => 
                        <li>
                            {t.title} <FaPlus onClick={()=>addTagToGig(currentUser.platformId, gigId, t.id)} color="green"/>
                        </li>) 
                        : ""}
                    </ul>
                </div>

                <div className="col-2">
                    <div className="row">
                        <button className="btn btn-info" onClick={submit}>Update Gig</button>
                        <button className="btn btn-danger" onClick={() => deleteGig(currentUser.platformId, gigId)}>Delete Gig</button>
                    </div>
                </div>
            </div>

            

            


        </div>
    )
};

export default EditGigForm;