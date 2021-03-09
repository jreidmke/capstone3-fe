import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link, Redirect } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import PrintApi from "../api/api";
import "./QueryForm.css"

function QueryForm() {
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
        await PrintApi.makeQuery(platform.id, formData.gig, writerId, formData);
        history.push(`/platforms/${platform.id}`);
    }

    if(currentUser.writerId) {
        return <Redirect to={`/login`}/>
    };

    return(
        <div>
            {platform && writer ? 
            
            <div className="container">
                <div className="row" id="query-form">
                    <div className="col-2">
                        <img src={writer.imageUrl} id="writerImg"/>
                        <h6 className="text-center" id="writer-name"><Link to={`/writers/${writerId}`}>{writer.firstName} {writer.lastName}</Link></h6>
                        <p className="text-center"><small>{writer.city}, {writer.state}</small></p>
                        <ul className="list-group">
                            <li className="list-group-item"><small><b>Portfolios</b></small></li>
                            {writer.portfolios.map(p => 
                                <li className="list-group-item"><small><b><Link to={`/portfolios/${p.id}`}>{p.title}</Link></b></small></li>
                                )}
                        </ul>
                    </div>

                    <div className="col">
                        <form onSubmit={submit}>
                            <div className="row">
                                <label htmlFor="gig-select">Select the Gig You Would Like to Query the Writer With</label>
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
                                    rows="12"/>
                            </div>

                            <div className="row mt-2">
                                <button className="btn btn-info btn-lg btn-block">Make Query</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        
            : ""}
        </div>
    )

}

export default QueryForm; 