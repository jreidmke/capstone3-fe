import { useState, useEffect, useContext } from 'react';
import PrintApi from '../api/api';
import UserContext from "../auth/UserContext";
import { useParams, Link } from 'react-router-dom';
import { FaPenFancy } from 'react-icons/fa';

function RelatedPieces() {
    const { currentUser } = useContext(UserContext);
    const { gigId } = useParams();
    const [gig, setGig] = useState();
    const [tags, setTags] = useState();
    const [pieces, setPieces] = useState();

    useEffect(() => {
        async function getItems() {
            const gigRes = await PrintApi.getGigById(gigId);
            setGig(gigRes);
            setTags(gigRes.tags.slice(0, 3).map(t => t.title))
            const pieceRes = await PrintApi.getRelatedPieces(gigId, gigRes.tags.map(t => t.id));
            setPieces(pieceRes);
        };
        getItems();
    }, []);

    return(
        <div>
            {console.log(tags)}
            {gig && pieces && tags ? 
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>Related Pieces</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h5>To help you get off on the right foot, we've collected a sampling of recent pieces that match the tags you've selected for your newly created gig.</h5>
                            <h5>If you see a piece that would be a good fit for this gig, click on the title and make a <i>Query</i> to the writer.</h5>
                            <h6>*Reminder, a <i>Query</i> is NOT a job offer. Think of it as an invitation for a writer to apply to a specified gig.<Link to={`/faq`}> Click here to learn more.</Link></h6>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <h3>Gig Title: {gig.title}</h3>
                            <h4>Gig Description: {gig.description}</h4>
                            <FaPenFancy size="3rem"/>    
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h3>Your Gig Includes {tags.length} tags:</h3>
                        </div>
                    </div>
                    <div className="row">
                        {tags.map(t => 
                        <div className="col" key={t}>
                            <h4>{t[0].toUpperCase() + t.slice(1)}</h4>
                            <hr/>
                            {pieces.filter(p => p.tagTitle===t).slice(0, 2).map(p => 
                            <div className="card my-2 py-4">
                                <div className="card-title">
                                    <h5><Link to={`/pieces/${p.id}`} className="card-link">{p.pieceTitle}</Link></h5>
                                    <h6>By: <Link to={`/writers/${p.writerId}`}>{p.firstName} {p.lastName}</Link></h6>
                                    <p>Submitted On: {p.createdAt.slice(0,10)}</p>
                                </div>
                                <div className="card-body"><p>{p.text.slice(0, 400)}...</p></div>
                                <Link to={`/pieces/${p.id}`} className="card-link">Click to Read More!</Link>
                            </div>
                            )}
                        </div>)}
                    </div>
                </div> 
        : ""}
        </div>
    )
};

export default RelatedPieces;