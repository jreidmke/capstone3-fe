import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useTitle from '../hooks/useTitle';

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
        bio: ""
    });

    const [formErrors, setFormErrors] = useState([]);

    async function submit(e) {
        e.preventDefault();
        let result = await register(formData);
        if(result.success) {
            history.push("/");
        } else {
            console.log(result.error)
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
                        <label>Additional Address (Suite or Office Number)</label>
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

                <button className="btn btn-info mt-5">Create Profile!</button>
            </form>
        </div>
    )
};


export default WriterRegisterForm;