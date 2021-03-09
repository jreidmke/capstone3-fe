//THIS IS WHERE YOU CAN PUT THE ADD/REMOVE FOLLOWED TAGS TOO

import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import removeFromFollowedArray from '../helpers/removeFromFollowedArray';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Alert from '../common/Alert';

function EditPlatformProfile( {logout} ) {
    const { currentUser, platformTagFollows, setPlatformTagFollows } = useContext(UserContext);
    const { platformId } = useParams();
    const history = useHistory();

    const [platform, setPlatform] = useState();
    const [followedTags, setFollowedTags] = useState(platformTagFollows);
    const [notFollowedTags, setNotFollowedTags] = useState();
    const [formData, setFormData] = useState({
        displayName: "",
        description: "",
        imageUrl: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        twitterUsername: "",
        facebookUsername: "",
        youtubeUsername: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    if(currentUser.platformId != platformId) history.push("/login");

    useEffect(() => {
        async function getPlatform() {
            const platformRes = await PrintApi.getPlatformById(platformId);
            setPlatform(platformRes);
            setFormData({
                displayName: platformRes.displayName,
                description: platformRes.description,
                imageUrl: platformRes.imageUrl,
                address1: platformRes.address1,
                address2: platformRes.address2,
                city: platformRes.city,
                state: platformRes.state,
                postalCode: platformRes.postalCode,
                phone: platformRes.phone,
                twitterUsername: platformRes.twitterUsername,
                facebookUsername: platformRes.facebookUsername,
                youtubeUsername: platformRes.youtubeUsername
            });
            let tagRes = await PrintApi.getAllTags();
            setNotFollowedTags(removeFromFollowedArray(tagRes, followedTags));
        };
        getPlatform();
    }, [])

    function handleChange(e) {
        const { name, value }= e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    async function submit(e) {
        e.preventDefault();
        const submissionData = {
            platformData: {
                displayName: formData.displayName,
                description: formData.description
            },
            userData: {
                imageUrl: formData.imageUrl,
                address1: formData.address1,
                address2: formData.address2,
                city: formData.city,
                state: formData.state,
                postalCode: formData.postalCode,
                phone: formData.phone,
                twitterUsername: formData.twitterUsername,
                facebookUsername: formData.facebookUsername,
                youtubeUsername: formData.youtubeUsername
            }
        };

        const result = await PrintApi.updatePlatformProfile(platformId, submissionData);
        if(result) {
            setFormData({
                imageUrl: result.imageUrl,
                address1: result.address1,
                address2: result.address2,
                city: result.city,
                state: result.state,
                postalCode: result.postalCode,
                phone: result.phone,
                twitterUsername: result.twitterUsername,
                facebookUsername: result.facebookUsername,
                youtubeUsername: result.youtubeUsername,
                displayName: result.displayName,
                description: result.description
            });
            setIsUpdated(true);
        } else {
            setFormErrors(result.errors);
        }
        
    };

    async function followTag(tagId) {
        // //remove piece from pices out on fe
        let addedTag = notFollowedTags.splice(notFollowedTags.map(t => t.id).indexOf(tagId), 1)[0];

        setNotFollowedTags([...notFollowedTags]);

        await PrintApi.platformFollowTag(platformId, tagId);

        setFollowedTags([...followedTags, addedTag]);
    };

    async function unfollowTag(tagId) {
        let removedTag = followedTags.splice(followedTags.map(f => f.tagId).indexOf(tagId), 1)[0];

        setFollowedTags([...followedTags]);

        await PrintApi.platformUnfollowTag(platformId, tagId);
        setNotFollowedTags([...notFollowedTags, removedTag]);
    };

    async function deleteProfile() {
        if(window.confirm("Are you sure you want to delete this profile?")) {
            await PrintApi.deletePlatformAccount(platformId);
            logout();
            history.push(`/`);
        } else {
            return;
        }
    }


    return(
        <div className="container">
            <form>
                
                <div className="row">
                    <div className="col">
                        <label>Display Name</label>
                        <input 
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            placeholder="Display Name"
                            className="form-control"

                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label>City</label>
                        <input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="form-control"
                        />
                    </div>
                    <div className="col-4">
                        <label>State (Come back and make this a select)</label>
                        <input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            className="form-control"
                        />
                    </div>
                    <div className="col-4">
                        <label>Phone</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label>Street Address</label>
                        <input
                            name="address1"
                            value={formData.address1}
                            onChange={handleChange}
                            placeholder="Street Address"
                            className="form-control"

                        />
                    </div>
                    <div className="col-4">
                        <label>Additional Address (Ex: Suite Number)</label>
                        <input
                            name="address2"
                            value={formData.address2}
                            onChange={handleChange}
                            placeholder="Address 2"
                            className="form-control"

                        />
                    </div>
                    <div className="col-4">
                        <label>Postal Code</label>
                        <input
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="Zip Code"
                            className="form-control"

                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <label>Twitter Username</label>
                        <input
                            name="twitterUsername"
                            value={formData.twitterUsername}
                            onChange={handleChange}
                            placeholder="Twitter Username"
                            className="form-control"

                        />
                    </div>
                    <div className="col-3">
                        <label>Facebook Username</label>
                        <input
                            name="facebookUsername"
                            value={formData.facebookUsername}
                            onChange={handleChange}
                            placeholder="Facebook Username"
                            className="form-control"

                        />
                    </div>
                    <div className="col-3">
                        <label>Youtube Username</label>
                        <input 
                            name="youtubeUsername"
                            value={formData.youtubeUsername}
                            onChange={handleChange}
                            placeholder="Youtube Username"
                            className="form-control"
                        />
                    </div>
                    <div className="col-3">
                        <label>Image Url</label>
                        <input
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="Image Url"
                            className="form-control"

                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label>About Your Platform</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="About Your Platform"
                            className="form-control"
                            rows="5"
                            cols="10"
                        />
                    </div>
                </div>
                {formErrors.length ?
                <Alert type="danger" messages={formErrors}/>
                : ""}
                
            </form>
            <div className="row">
                <div className="col-6">
                    {isUpdated ? <Alert type="success" messages={["Profile Successfully Updated"]}/> : ""}
                    <button onClick={submit} className="btn btn-info btn-lg btn-block">Update Profile!</button>
                    <button onClick={deleteProfile} className="btn btn-danger btn-lg btn-block">Delete Profile</button>
                </div>
                <div className="col-6 text-center">
                    <div className="row">
                        <h4 className="ml-5">Select the Tags You Want to Follow</h4>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h6 className="text-success text-center">Followed</h6>
                            <ul>
                                {followedTags ? followedTags.map(t => 
                                <li>
                                    <small>{t.title}
                                    <FaTimes onClick={()=>unfollowTag(t.tagId)} color="red"/></small>
                                </li>
                                ) : ""}
                            </ul>
                        </div>

                        <div className="col">
                            <h6 className="text-danger text-center">Not Followed</h6>
                            <ul>
                                {notFollowedTags ? notFollowedTags.map(t => 
                                <li>
                                    <small>{t.title}
                                    <FaPlus onClick={()=>followTag(t.id)} color="green"/></small>
                                </li>) 
                                : ""}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
};

export default EditPlatformProfile;