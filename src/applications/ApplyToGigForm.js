import {useState, useEffect, useContext} from 'react';
import PrintApi from '../api/api';
import { useParams, useHistory, Link } from "react-router-dom";
import UserContext from '../auth/UserContext';
import GigCard from "../gigs/GigCard";

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
console.log(gig)
    return(
        <div>
            {gig && portfolios ? 
            <div className="container">
                <div className="row">
                    <div className="col"><h1>Apply to {gig.title}</h1></div>
                </div>
                <div className="row">
                    <div className="col"><GigCard gig={gig}/></div>
                </div>

                <div className="row">
                    <div className="col"><p>Read Your Portfolio Before Submitting</p></div>
                </div>

                <div className="row">
                    <div className="col">{portfolios.map(p => <Link to={`/portfolios/${p.id}`}><p>{p.title}</p></Link>)}</div>
                    <div className="col">
                        <form onSubmit={submit}>
                            <label htmlFor="portfolioId">Select Your Portfolio</label>
                            <select name="portfolioId" id="portfolioId" value={formData.portfolioId} onChange={handleChange} className="form-control"> 
                                <option value="">--</option>
                                {portfolios ? portfolios.map(p => <option value={p.id}>{p.title}</option>) : ""}
                            </select>

                            <button className="btn btn-lg btn-info btn-block">Submit</button>
                        </form>
                    </div>
                </div>

                
            </div> 
            : ""}
        </div>

        
    )
};

export default ApplyToGigForm;