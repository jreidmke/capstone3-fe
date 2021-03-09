import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import removeFromFollowedArray from '../helpers/removeFromFollowedArray';
import Alert from '../common/Alert';
import { FaPlus, FaTimes } from 'react-icons/fa';

function EditWriterProfile({ logout }) {
    const { currentUser, writerTagFollows, setWriterTagFollows } = useContext(UserContext);
    const { writerId } = useParams();
    const history = useHistory();

    const [writer, setWriter] = useState();
    const [followedTags, setFollowedTags] = useState(writerTagFollows);
    const [notFollowedTags, setNotFollowedTags] = useState();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        bio: "",
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


    if(currentUser.writerId != writerId) history.push("/login");

    useEffect(() => {
        async function getWriter() {
            const writerRes = await PrintApi.getWriterById(writerId);
            setWriter(writerRes);
            setFormData({
                firstName: writerRes.firstName,
                lastName: writerRes.lastName,
                age: writerRes.age,
                bio: writerRes.bio,
                imageUrl: writerRes.imageUrl,
                address1: writerRes.address1,
                address2: writerRes.address2,
                city: writerRes.city,
                state: writerRes.state,
                postalCode: writerRes.postalCode,
                phone: writerRes.phone,
                twitterUsername: writerRes.twitterUsername,
                facebookUsername: writerRes.facebookUsername,
                youtubeUsername: writerRes.youtubeUsername
            });
            let tagRes = await PrintApi.getAllTags();
            setNotFollowedTags(removeFromFollowedArray(tagRes, followedTags));
        };
        getWriter();
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
            writerData: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                age: formData.age,
                bio: formData.bio
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
        }
        const result = await PrintApi.updateWriterProfile(writerId, submissionData);
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
                firstName: result.writerData.firstName,
                lastName: result.writerData.lastName,
                age: result.writerData.age,
                bio: result.writerData.bio
            });
            setIsUpdated(true);
        } else {
            setFormErrors(result.errors);
        }
        
    };

    async function followTag(tagId) {
        let addedTag = notFollowedTags.splice(notFollowedTags.map(t => t.id).indexOf(tagId), 1)[0];

        setNotFollowedTags([...notFollowedTags]);

        await PrintApi.writerFollowTag(writerId, tagId);

        setFollowedTags([...followedTags, addedTag]);
    };

    async function unfollowTag(tagId) {
        let removedTag = followedTags.splice(followedTags.map(f => f.tagId).indexOf(tagId), 1)[0];

        setFollowedTags([...followedTags]);

        await PrintApi.writerUnfollowTag(writerId, tagId);

        setNotFollowedTags([...notFollowedTags, removedTag]);
    };

    async function deleteProfile() {
        if(window.confirm("Are you sure you want to delete this profile?")) {
            await PrintApi.deleteWriterAccount(writerId);
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
                    <div className="col-4">
                        <label>First Name</label>
                        <input 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="form-control"

                        />
                    </div>
                    <div className="col-4">
                        <label>Last Name</label>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="form-control"

                            />
                    </div>
                    <div className="col-4">
                        <label>Age</label>
                        <input
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="form-control"
                            type="number"
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
                        <label>Additional Address (Ex: Appartment Number)</label>
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
                        <label>About the Author</label>
                        <textarea
                            name="biography"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="About the Author"
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

export default EditWriterProfile;

