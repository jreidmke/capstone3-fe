import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Alert from '../common/Alert';
import PrintApi from "../api/api";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function WriterRegisterForm({ register }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        imageUrl: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
        twitterUsername: "",
        facebookUsername: "",
        youtubeUsername: "",
        firstName: "",
        lastName: "",
        age: "",
        bio: "",
        expertise1: ""
    });
    const [tags, setTags] = useState();
    const [formErrors, setFormErrors] = useState([]);

    useEffect(() => {
        async function getTags() {
            const tagRes = await PrintApi.getAllTags();
            setTags(tagRes);
        };
        getTags();
    }, [])

    async function submit(e) {
        e.preventDefault();
        console.log(formData);
        let result = await register(formData);
        if(result.success) {
            history.push("/home");
        } else {
            setFormErrors(result.error);
        };
    };

    function handleChange(e) {
        const { name, value }= e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

    return(
        <div className="container">
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-6">
                        <label>Email</label>
                        <input
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            id="emailInput"
                            placeholder="Email"
                            type="text"
                            required
                        />
                    </div>
                    <div className="col-6">
                        <label>Password</label>
                        <input
                            name="password"
                            className="form-control"
                            value={formData.password}
                            type="password"
                            onChange={handleChange}
                            placeholder="Password"
                            id="passwordInput"
                            required
                        />
                    </div>
                </div>

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
                    <div className="col-2">
                        <label>Select an Expertise</label>
                        <select name="expertise1" id="expertise1" onChange={handleChange} value={formData.expertise1} className="form-control">
                            <option value="">--</option>
                            {tags ? tags.map(t => <option key={t.id} value={t.id}>{t.title}</option>) : ""}
                        </select>
                    </div>
                    <div className="col-2">
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
                    <div className="col-2">
                        <label>State</label>
                        <select name="state" id="state" onChange={handleChange} className="form-control">
                            <option value="">--</option>
                            {states.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="col">
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
                            name="bio"
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
                <button className="btn btn-info mt-5">Create Profile!</button>
            </form>
        </div>
    )
};


export default WriterRegisterForm;