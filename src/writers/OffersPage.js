import { useState, useEffect, useContext } from 'react';
import PrintApi from '../api/api';
import UserContext from "../auth/UserContext";
import { Redirect, useParams, Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { FaCheck, FaTimes } from 'react-icons/fa';

function OffersPage() {
    const { currentUser } = useContext(UserContext);
    const [offers, setOffers] = useState();
    const { writerId } = useParams();

    useEffect(() => {
        async function getOffers() {
            const res = await PrintApi.getOffersByWriterId(writerId);
            setOffers(res);
        };
        getOffers();
    }, []);

    if(currentUser.platformId || currentUser.writerId !== +writerId) return <Redirect to={"/login"}/>

    return(
        <div>
            {offers ? 
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Offers</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                        <Accordion>
                            {offers.map(o => 
                            <div key={o.id}>
                                <Accordion.Toggle variant="link" eventKey="0">
                                    <li className="list-group-item">{o.displayName} made an Offer for Gig ${o.gigTitle}</li>
                                </Accordion.Toggle>

                                <Accordion.Collapse eventKey="0">
                                    <div className="row">
                                        <div className="col">
                                            <p>{o.message}</p>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Compensation</th>
                                                        <th>Word Count</th>
                                                        <th>$ Per Word Rate</th>
                                                        <th>Is Remote</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{o.compensation}</td>
                                                        <td>{o.wordCount}</td>
                                                        <td>{o.compensation/o.wordCount}</td>
                                                        <td>{o.isRemote ? <FaCheck color="green"/> : <FaTimes color="red"/>}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <h6><Link to={`/gigs/${o.gigId}/apply`}>Apply To Job</Link></h6>
                                        </div>
                                    </div>
                                </Accordion.Collapse>
                            </div>
                            )}
                        </Accordion>
                    </div>

                </div>
            </div>
             : ""}
        </div>
    )
}

export default OffersPage;