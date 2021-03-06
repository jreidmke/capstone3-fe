import { useState, useEffect, useContext } from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from 'react-router-dom';
import { FaPenFancy } from 'react-icons/fa';
import RelatedItems from "./RelatedItems";

function RelatedPieces() {
    const { gigId } = useParams();
    const [gig, setGig] = useState();
    const [tags, setTags] = useState();
    const [pieces, setPieces] = useState();
    const [writers, setWriters] = useState();
    const [length, setLength] = useState();

    useEffect(() => {
        async function getItems() {
            const gigRes = await PrintApi.getGigById(gigId);
            setGig(gigRes);
            setLength(gigRes.tags.length);
            setTags(gigRes.tags.map(t => t.title))
            const pieceRes = await PrintApi.getRelatedPieces(gigId, gigRes.tags.map(t => t.id));
            setPieces(pieceRes);
            const writerRes = await PrintApi.getRelatedWriters(gigId, gigRes.tags.map(t => t.id));
            setWriters(writerRes);
        };
        getItems();
    }, []);

    return(
        <div>
            {gig && pieces && tags && writers ? 
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>Related Pieces & Writers</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h5>To help you get off on the right foot, we've collected a sampling of recent pieces as well as writers that match the tags you've selected for your newly created gig.</h5>
                            <h5>If you see a piece that would be a good fit for this gig, click on the title and make a <i>Query</i> to the writer.</h5>
                            <h6>*Reminder, a <i>Query</i> is NOT a job offer. Think of it as an invitation for a writer to apply to a specified gig.<Link to={`/faq`}> Click here to learn more.</Link></h6>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <h3>Gig Title: {gig.title}</h3>
                            <h4>Gig Description: {gig.description}</h4>
                        </div>
                    </div>
                    <RelatedItems/>
                </div>
        : ""}

            <FaPenFancy size="3rem" className="mb-5"/>    

        </div>
    )
};

export default RelatedPieces;