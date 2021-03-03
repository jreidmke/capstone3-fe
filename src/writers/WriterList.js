import {useState, useEffect} from 'react';
import WriterCard from './WriterCard';
import PrintApi from '../api/api';
import { useHistory } from "react-router-dom";

function WriterList() {
    const [writers, setWriters] = useState([]);
    const [states, setStates] = useState([]);
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
            setStates(Array.from(new Set(states)));
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
        <div>
            <form onSubmit={submit}>
                <label htmlFor="city">Filter By City:</label>

                <select name="city" id="cities" value={formData.city} onChange={handleChange}>
                    <option value={null}></option>
                    {!cities.length ? <option></option> : cities.map(c => {
                        return <option value={c} key={c}>{c}</option>
                    })}
                </select>

                
                <button>Submit</button>
            </form>
            {!writers.length ? "Loading..." : writers.map(w => <WriterCard key={w.id} writer={w}/>)}
        </div>
    )
};

export default WriterList;

{/* <label htmlFor="state">Filter By State:</label>

<select name="state" id="states" value={formData.state} onChange={handleChange}>
    <option value={null}></option>
    {!states.length ? <option></option> : states.map(s => {
        return <option value={s} key={s}>{s}</option>
    })}
</select> */}

