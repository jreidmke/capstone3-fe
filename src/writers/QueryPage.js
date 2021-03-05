import { useState, useEffect, useContext } from 'react';
import PrintApi from '../api/api';
import UserContext from "../auth/UserContext";
import { Redirect, useParams, Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { FaCheck, FaTimes } from 'react-icons/fa';

function QueriesPage() {
    const { currentUser } = useContext(UserContext);
    const [queries, setQueries] = useState();
    const { writerId } = useParams();

    useEffect(() => {
        async function getQueries() {
            const res = await PrintApi.getQueriesByWriterId(writerId);
            setQueries(res);
        };
        getQueries();
    }, []);

    if(currentUser.platformId || currentUser.writerId !== +writerId) return <Redirect to={"/login"}/>

    return(
        <div>
            {queries ? 
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Queries</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                        <Accordion>
                            {queries.map(q => 
                            <div key={q.id}>
                                <Accordion.Toggle variant="link" eventKey="0">
                                    <li className="list-group-item">{q.displayName} made an Query for Gig ${q.gigTitle}</li>
                                </Accordion.Toggle>

                                <Accordion.Collapse eventKey="0">
                                    <div className="row">
                                        <div className="col">
                                            <p>{q.message}</p>
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
                                                        <td>{q.compensation}</td>
                                                        <td>{q.wordCount}</td>
                                                        <td>{q.compensation/q.wordCount}</td>
                                                        <td>{q.isRemote ? <FaCheck color="green"/> : <FaTimes color="red"/>}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <h6><Link to={`/gigs/${q.gigId}/apply`}>Apply To Job</Link></h6>
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

export default QueriesPage;