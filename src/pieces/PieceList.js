import {useState, useEffect} from 'react';
import PieceCard from './PieceCard';
import PrintApi from '../api/api';
import { useHistory, useLocation } from "react-router-dom";
import "./PieceList.css";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PieceList() {
    const [pieces, setPieces] = useState([]);
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({
        tagTitle: ""
    })
    const history = useHistory();
    const query = useQuery();
    console.log();
    
    useEffect(() => {
        async function getPieces() {
            let q = query.get("tag-title") ? query.get("tag-title") : ""
            const piecesRes = await PrintApi.getAllPieces({tagTitle: q});
            setPieces(piecesRes);
            const tagRes = await PrintApi.getAllTags();
            setTags(tagRes);
        };
        getPieces();
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    async function submit(e) {
        e.preventDefault();
        const piecesRes = await PrintApi.getAllPieces(formData);
        setPieces(piecesRes);
    }

    return(
        <div className="container">

            <form onSubmit={submit}>

                <div className="row">
                    <div className="col-4">
                        <label htmlFor="tags">Filter By Tag:</label>
                        <select name="tagTitle" id="filter" value={formData.city} onChange={handleChange}>
                            <option value={null}></option>
                            {!tags.length ? <option></option> : tags.map(t => {
                                return <option value={t.title} key={t.id}>{t.title}</option>
                            })}
                        </select>
                    </div>

                    <div className="col-4">
                        <label htmlFor="text">Search By Text:</label>
                        <input
                            type='text'
                            name='text'
                            onChange={handleChange}
                            placeholder="Text"
                            id="filter"/>
                    </div>

                    <button className="btn btn-outline-secondary" id="submitFilterBtn">Submit</button>
                </div>
            </form>
                    {!pieces.length ? "Loading..." : pieces.map(p => <PieceCard key={p.id} piece={p}/>)}
        </div>
    )
};

export default PieceList;

