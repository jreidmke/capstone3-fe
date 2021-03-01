//THIS IS WHERE YOU CAN PUT THE ADD/REMOVE FOLLOWED TAGS TOO

import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import removeFromFollowedArray from '../helpers/removeFromFollowedArray';

function EditPlatformProfile() {
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
    };

    async function followTag(platformId, tagId) {
        // //remove piece from pices out on fe
        let addedTag = notFollowedTags.splice(notFollowedTags.map(t => t.id).indexOf(tagId), 1)[0];

        setNotFollowedTags([...notFollowedTags]);

        await PrintApi.platformFollowTag(platformId, tagId);

        setFollowedTags([...followedTags, addedTag]);
    };

    async function unfollowTag(platformId, tagId) {
        let removedTag = followedTags.splice(followedTags.map(f => f.tagId).indexOf(tagId), 1)[0];

        setFollowedTags([...followedTags]);

        await PrintApi.platformUnfollowTag(platformId, tagId);
        setNotFollowedTags([...notFollowedTags, removedTag]);
    };


    return(
        <div>
            <h1>Update Writer Form</h1>
            <form onSubmit={submit}>

    <br/>

                <label>Image Url</label>
                <input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Image Url"
                />
                <br/>
                <label>Street Address</label>
                <input
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    placeholder="Street Address"
                />
                <br/>
                <label>Address 2</label>
                <input
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    placeholder="Address 2"
                />

                <label>City</label>
                <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                />
                <label>State</label>
                <input
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                />

                <br/>
                <label>Zip Code</label>
                <input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Zip Code"
                />
                <br/>
                <label>Phone</label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
                <br/>
                <label>Twitter Username</label>
                <input
                    name="twitterUsername"
                    value={formData.twitterUsername}
                    onChange={handleChange}
                    placeholder="Twitter Username"
                />
                <br/>
                <label>Facebook Username</label>
                <input
                    name="facebookUsername"
                    value={formData.facebookUsername}
                    onChange={handleChange}
                    placeholder="Facebook Username"
                />
                <label>Youtube Username</label>
                <input 
                    name="youtubeUsername"
                    value={formData.youtubeUsername}
                    onChange={handleChange}
                    placeholder="Youtube Username"
                />
    <br/>
                <label>Display Name</label>
                <input 
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <label>Description</label>
                <input
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Last Name"
                />

            <button>Submit</button>
            </form>

            <div>
                <h1>Followed Tags</h1>
                {followedTags ? followedTags.map(t => <li key={t.id}>{t.title} <button onClick={() => unfollowTag(currentUser.platformId, t.tagId)}>X</button></li>) : ""}

                <h1>Not Followed Tags</h1>
                {notFollowedTags ? notFollowedTags.map(t => <li key={t.id}>{t.title} <button onClick={() => followTag(currentUser.platformId, t.id)}>O</button></li>) : ""}
            </div>

        </div>
    )
};

export default EditPlatformProfile;