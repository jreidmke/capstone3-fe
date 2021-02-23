import PrintApi from "../api/api";
import { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import ApplicationCard from "./ApplicationCard";

function ApplicationDetails() {
    const { platformId, appId } = useParams();
    const [application, setApplication] = useState();
    const [formData, setFormData] = useState({
        status: ""
    });
    const history = useHistory();

    useEffect(() => {
        async function getApplication() {
            const appRes = await PrintApi.getApplicationById(platformId, appId);
            if(appRes.platformId != platformId) history.push(`/platforms/${platformId}`);
            setApplication(appRes);
            setFormData({
                status: appRes.status
            })
            console.log(appRes.platformId);
        };
        getApplication();
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    async function submit(e) {
        e.preventDefault();
        await PrintApi.updateApplicationStatus(platformId, appId, formData);
        history.push(`/gigs/${application.gigId}`);
    }

    return(
        <div>
            {application ? <ApplicationCard app={application}/> : ""}
            <form onSubmit={submit}>
                <label htmlFor="appStatus">Status</label>
                <select name="status" id="status" value={formData.status} onChange={handleChange}>
                    <option value="">--</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <button>Submit</button>
            </form>
        </div>
    )
};

export default ApplicationDetails;

