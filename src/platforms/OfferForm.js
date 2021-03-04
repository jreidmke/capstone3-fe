import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import PrintApi from "../api/api";
import "./OfferForm.css"

function OfferForm() {
    const { currentUser } = useContext(UserContext); 
    const { writerId } = useParams();
    const [platform, setPlatform] = useState();
    const [writer, setWriter] = useState();
    const [formData, setFormData] = useState({
        gig: "",
        message: ""
    });
    const history = useHistory();

    useEffect(() => {
        async function getGigs() {
            const platformRes = await PrintApi.getPlatformById(currentUser.platformId);
            const writerRes = await PrintApi.getWriterById(writerId);
            setPlatform(platformRes);
            setWriter(writerRes);
        };
        getGigs();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    };

    async function submit(e) {
        e.preventDefault();
        await PrintApi.makeOffer(platform.id, formData.gig, writerId, formData);
        history.push(`/platforms/${platform.id}`);
    }

    if(currentUser.writerId) {
        return history.push("/login");
    };

    return(
        <div>
            {platform && writer ? 
            
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Make An Offer</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <img src={writer.imageUrl} id="writerImg"/>
                        <h3><Link to={`/writers/${writerId}`}>{writer.firstName} {writer.lastName}</Link></h3>
                        <h6>{writer.city}, {writer.state}</h6>
                    </div>

                    <div className="col">
                        <form onSubmit={submit}>
                            <div className="row">
                                <label htmlFor="gig-select">Select the Gig You Would Like to Offer the Writer</label>
                                <select name="gig" id="gig" value={formData.gig} onChange={handleChange} className="form-control">
                                    <option value="">--</option>
                                    {platform.gigs.map(g => <option value={g.id}>{g.title}</option>)}
                                </select>
                            </div>

                            <div className="row mt-2">
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    type="text"
                                    onChange={handleChange}
                                    placeholder={"Message"}
                                    className="form-control"
                                    rows="5"/>
                            </div>

                            <div className="row mt-2">
                                <button className="btn btn-info btn-lg btn-block">Make Offer</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        
            : ""}
        </div>
    )

}

export default OfferForm; 