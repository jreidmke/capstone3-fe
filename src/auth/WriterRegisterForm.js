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
    useTitle("Login Form");
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
        console.log(typeof (parseInt(formData.postalCode)))
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
        <div>
            <h1>Login Form</h1>
            <form onSubmit={submit}>
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
    <br/>
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
        </div>
    )
};


export default WriterRegisterForm;