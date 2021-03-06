import { useState, useEffect, useContext } from 'react';
import PrintApi from '../api/api';
import { useParams, Link } from 'react-router-dom';
import { FaPenFancy } from 'react-icons/fa';

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
                            <h3>Your Gig Includes {length} tags:</h3>
                        </div>
                    </div>
                    <div className="row">
                        {tags.slice(0, 3).map(t => 
                        <div className="col" key={t}>
                            <h4>{t[0].toUpperCase() + t.slice(1)}</h4>
                            <hr/>
                            {pieces.filter(p => p.tagTitle===t).slice(0, 2).map(p => 
                            <div key={p.id} className="card my-2 pt-2">
                                <div className="card-title">
                                    <h5><Link to={`/pieces/${p.id}`} className="card-link">{p.pieceTitle}</Link></h5>
                                    <h6>By: <Link to={`/writers/${p.writerId}`}>{p.firstName} {p.lastName}</Link></h6>
                                </div>
                            </div>
                            )}
                        </div>)}
                    </div>
                    {length > 3 ? 
                    <div>    
                        <div className="row">
                            <div className="col">
                                <h5>Click to See Pieces Marked With Your Other Tags</h5>
                            </div>
                        </div>
                        <div className="row">
                                {tags.slice(3).map(t => <Link to={`/pieces?tag-title=${t}`}><p className="mr-2">-{t[0].toUpperCase() + t.slice(1)}</p></Link>)}
                        </div>
                    </div>
                    
                     : ""}

                    <div className="row">
                        <div className="col">
                            <h3>Writers with Expertise that Matches Your Gig</h3> 
                        </div>
                    </div>
                    <div className="row">
                        {writers.slice(0, 3).map(w => 
                        <div className="col">
                            <div className="card my-2 pt-2">
                                <div className="col">
                                    <img src={w.imageUrl} id="platformImg"/>
                                    <h5><Link to={`/writers/${w.id}`}>{w.firstName} {w.lastName}</Link></h5>
                                    <h6>{w.city}, {w.state}</h6>
                                    <p>Expertise In: {w.tagTitle[0].toUpperCase() + w.tagTitle.slice(1)}</p>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>

                    {length > 3 ? 
                    <div>    
                        <div className="row">
                            <div className="col">
                                <h5>Click to See Other Writers Marked With Your Tags</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {writers.slice(3).map(w => <Link to={`/writers/${w.id}`}><p className="mr-2">-{w.firstName} {w.lastName} ({w.tagTitle})</p></Link>)}
                            </div>
                        </div>
                    </div>

                    
                     : ""}

                </div> 
        : ""}

<FaPenFancy size="3rem" className="mb-5"/>    

        </div>
    )
};

export default RelatedPieces;