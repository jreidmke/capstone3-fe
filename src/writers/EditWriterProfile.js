//THIS IS WHERE YOU CAN PUT THE ADD/REMOVE FOLLOWED TAGS TOO

import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PrintApi from '../api/api';
import UserContext from '../auth/UserContext';
import removeFromFollowedArray from '../helpers/removeFromFollowedArray';

function EditWriterProfile() {
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

    async function followTag(writerId, tagId) {
        // //remove piece from pices out on fe
        let addedTag = notFollowedTags.splice(notFollowedTags.map(t => t.id).indexOf(tagId), 1)[0];

        setNotFollowedTags([...notFollowedTags]);

        await PrintApi.writerFollowTag(writerId, tagId);

        setFollowedTags([...followedTags, addedTag]);
    };

    async function unfollowTag(writerId, tagId) {
        let removedTag = followedTags.splice(followedTags.map(p => p.id).indexOf(tagId), 1)[0];

        setFollowedTags([...followedTags]);

        await PrintApi.writerUnfollowTag(writerId, tagId);
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
            {console.log(followedTags)}
{console.log(notFollowedTags)}
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
                <label>First Name</label>
                <input 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <label>Last Name</label>
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <label>Age</label>
                <input
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                />
                <label>Bio</label>
                <input
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    type="text-area"
                />
            <button>Submit</button>
            </form>

            <div>
                <h1>Followed Tags</h1>
                {followedTags ? followedTags.map(t => <li key={t.id}>{t.title} <button onClick={() => unfollowTag(currentUser.writerId, t.id)}>X</button></li>) : ""}

                <h1>Not Followed Tags</h1>
                {notFollowedTags ? notFollowedTags.map(t => <li key={t.id}>{t.title} <button onClick={() => followTag(currentUser.writerId, t.id)}>O</button></li>) : ""}
            </div>

        </div>
    )
};

export default EditWriterProfile;