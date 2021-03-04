import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useTitle from '../hooks/useTitle';
import Alert from "../common/Alert";

function LoginForm({ login }) {
    useTitle("Login Form");
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    async function submit(e) {
        e.preventDefault();
        let result = await login(formData);
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

            {formErrors.length ?
            <Alert type="danger" messages={formErrors}/>
            : ""}

            <button>Submit</button>
            </form>
        </div>
    )
};

export default LoginForm;