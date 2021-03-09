import {useState, useEffect} from 'react';
import WriterCard from './WriterCard';
import PrintApi from '../api/api';
import { useHistory } from "react-router-dom";
import "./WriterList.css";

function WriterList() {
    const [writers, setWriters] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        city: "",
        state: ""
    })
    const history = useHistory();
    
    useEffect(() => {
        async function getWriters() {
            const writerRes = await PrintApi.getWriters();
            setWriters(writerRes);
            let states = writerRes.map(w => w.state);
            let cities = writerRes.map(w => w.city);
            setCities(Array.from(new Set(cities)));
        };
        getWriters();
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    async function submit(e) {
        e.preventDefault();
        const writerRes = await PrintApi.getWriters(formData);
        setWriters(writerRes);
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <form onSubmit={submit}>
                        <label htmlFor="city" id="filter">Filter By City:</label>

                        <select name="city" id="filter" value={formData.city} onChange={handleChange} className="form-control">
                            <option value={null}></option>
                            {!cities.length ? <option></option> : cities.map(c => {
                                return <option value={c} key={c}>{c}</option>
                            })}
                        </select>
                        <button className="btn btn-outline-secondary mb-1">Submit</button>
                    </form>
                </div>
            
            </div>

            {!writers.length ? "Loading..." : writers.map(w => 
            <div className="row">
                <WriterCard key={w.id} writer={w}/>
            </div>
            
            )}
        </div>
    )
};

export default WriterList;

