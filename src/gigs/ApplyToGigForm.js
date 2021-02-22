import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, Link, useHistory } from "react-router-dom";
import UserContext from '../auth/UserContext';
import PrivateRoute from '../routes-nav/PrivateRoute';

function ApplyToGigForm() {
    const { currentUser } = useContext(UserContext);
    const history = useHistory();
    if(currentUser.writerId === null) history.push("/login");

    const { gigId } = useParams();
    const [formData, setFormData] = useState({
        portfolioId: ""
    });
    const [gig, setGig] = useState();
    const [portfolios, setPortfolios] = useState();
    const [applied, setApplied] = useState(false);

    //come back and let people update what profile they selected

    useEffect(() => {
        async function getGig() {
            const gigRes = await PrintApi.getGigById(gigId);
            setGig(gigRes);

            const appRes = (await PrintApi.getApplicationsByWriterId(currentUser.writerId)).map(a => a.gigId);
            if(appRes.indexOf(parseInt(gigId)) !== -1) {
                history.push(`/writers/${currentUser.writerId}`);
            } 


            const portfolioRes = await PrintApi.getWriterById(currentUser.writerId);
            setPortfolios(portfolioRes.portfolios);
        };
        getGig();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    async function submit(e) {
        e.preventDefault();
        await PrintApi.applyToGig(currentUser.writerId, gigId, formData);
        history.push(`/writers/${currentUser.writerId}`);
    };

    return(
        <form onSubmit={submit}>
            <label htmlFor="portfolioId">Select Your Portfolio</label>
            <select name="portfolioId" id="portfolioId" value={formData.portfolioId} onChange={handleChange}>
                <option value="">--</option>
                {portfolios ? portfolios.map(p => <option value={p.id}>{p.title}</option>) : ""}
            </select>

            <button>Submit</button>
        </form>
    )
};

export default ApplyToGigForm;