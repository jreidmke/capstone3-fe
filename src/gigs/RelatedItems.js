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

    useEffect(() => {
        async function getItems() {
            const gigRes = await PrintApi.getGigById(gigId);
            setGig(gigRes);
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
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <p>Your Gig Includes {tags.length} tags:</p>
                        </div>
                    </div>
                    <div className="row">
                        {tags.slice(0, 3).map(t => 
                        <div className="col" key={t}>
                            <p><b>{t[0].toUpperCase() + t.slice(1)}</b></p>
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
                    {tags.length > 3 ? 
                            <div className="col">
                                <p>Click to See Pieces Marked With Gig's Other Tags: 
                                {tags.slice(3).map(t => <Link to={`/pieces?tag-title=${t}`}> {t[0].toUpperCase() + t.slice(1)} </Link>)}</p>

                            </div>
                     : ""}
                    <div className="row">
                        <div className="col">
                            <p><b>Writers with Expertise that Matches Your Gig</b></p> 
                        </div>
                    </div>
                    <div className="row">
                        {writers.slice(0, 3).map(w => 
                        <div className="col">
                            <div className="card my-2 pt-2">
                                <div className="col">
                                    <img src={w.imageUrl} id="piece-img"/>
                                    <h5><Link to={`/writers/${w.id}`}>{w.firstName} {w.lastName}</Link></h5>
                                    <h6>{w.city}, {w.state}</h6>
                                    <p>Expertise In: {w.tagTitle[0].toUpperCase() + w.tagTitle.slice(1)}</p>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>

                    {writers.length > 3 ? 
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


        </div>
    )
};

export default RelatedPieces;