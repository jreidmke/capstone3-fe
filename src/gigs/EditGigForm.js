import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import removeFromArr from '../helpers/removeFromArr';

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
        isActive: ""
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
                isActive: gigRes.isActive
            });

            if(gigRes.platformId !== currentUser.platformId) history.push("/login");

            const tagRes = await PrintApi.getAllTags();
            setTagsOff(removeFromArr(tagRes, gigRes.tags));
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
        setFormData({
            title: result.title,
            description: result.description,
            compensation: result.compensation,
            isRemote: result.isRemote,
            wordCount: result.wordCount,
            isActive: result.isActive
        });
        history.push(`/gigs/${gigId}`)
    };

    async function addTagToGig(platformId, gigId, tagId) {
        // //remove piece from pices out on fe
        let addedTag = tagsOff.splice(tagsOff.map(t => t.id).indexOf(tagId), 1)[0];

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
        <div>
            <form onSubmit={submit}>
                <input
                    name="title"
                    value={formData.title}
                    type="text"
                    onChange={handleChange}
                    placeholder={gig ? gig.title : "Title"}/>

                <textarea 
                    name="description"
                    value={formData.description}
                    type="text"
                    onChange={handleChange}
                    placeholder={gig ? gig.title : "Text"}/>

                <input
                    name="compensation"
                    value={formData.compensation}
                    type="number"
                    onChange={handleChange}
                    placeholder="Compensation"
                />

            <label htmlFor="isRemote">Is Remote</label>
                <select name="isRemote" id="isRemote" value={formData.isRemote} onChange={handleChange}>
                    <option value="">--</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>     
            
            <label htmlFor="isActive">Is Active</label>
                <select name="isActive" id="isActive" value={formData.isActive} onChange={handleChange}>
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
                />

<button>Sumbit</button>

            </form>


            <h4>Tags</h4>
            <ul>
                {tagsOn ? tagsOn.map(t => 
                <li>
                    {t.title} <button onClick={()=>removeTagFromGig(currentUser.platformId, gigId, t.id)}>X</button>
                </li>
                ) : ""}
            </ul>

            <h4>Not Tagged</h4>
            <ul>
                {tagsOff ? tagsOff.map(t => 
                <li>
                    {t.title} <button onClick={()=>addTagToGig(currentUser.platformId, gigId, t.id)}>O</button>
                </li>) 
                : ""}
            </ul>


            <button className="button btn-info" onClick={() => history.push(`/platforms/${currentUser.platformId}`)}>Confirm</button>
            <button className="button btn-danger" onClick={() => deleteGig(currentUser.platformId, gigId)}>DELETE</button>
        </div>
    )
};

export default EditGigForm;