import {useState, useEffect} from 'react';
import PlatformCard from './PlatformCard';
import PrintApi from '../api/api';
import { useHistory } from "react-router-dom";
import "./PlatformList.css";
function PlatformList() {
    const [platforms, setPlatforms] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        city: "",
        state: ""
    })
    const history = useHistory();
    
    useEffect(() => {
        async function getWriters() {
            const platformRes = await PrintApi.getAllPlatforms();
            setPlatforms(platformRes);
            let states = platformRes.map(p => p.state);
            let cities = platformRes.map(p => p.city);
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
        const platformRes = await PrintApi.getAllPlatforms(formData);
        setPlatforms(platformRes);
    }

    return(
        <div>
            <form onSubmit={submit}>
                <label htmlFor="city" id='filter'>Filter By City:</label>

                <select name="city" id="filter" value={formData.city} onChange={handleChange}>
                    <option value={null}></option>
                    {!cities.length ? <option></option> : cities.map(c => {
                        return <option value={c} key={c}>{c}</option>
                    })}
                </select>

                <button className="btn btn-outline-secondary mb-1">Submit</button>
            </form>
            {!platforms.length ? "Loading..." : platforms.map(p => <PlatformCard key={p.id} platform={p}/>)}
        </div>
    )
};

export default PlatformList;

{/* <select name="state" id="states" value={formData.state} onChange={handleChange}>
                    <option value={null}></option>
                    {!states.length ? <option></option> : states.map(s => {
                        return <option value={s} key={s}>{s}</option>
                    })}
                </select> */}
                // <label htmlFor="state">Filter By State:</label>

