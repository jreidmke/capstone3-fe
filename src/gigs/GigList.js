import {useState, useEffect} from 'react';
import GigCard from './GigCard';
import PrintApi from '../api/api';
import "./GigList.css";

function GigList() {
    const [gigs, setGigs] = useState([]);
    const [tags, setTags] = useState([]);

    const [formData, setFormData] = useState({
        minCompensation: "",
        maxWordCount: "",
        minWordCount: "",
        isRemote: "",
        tagTitle: ""
    });
    
    useEffect(() => {
        async function getGigs() {
            const gigRes = await PrintApi.getAllGigs();
            setGigs(gigRes.sort((a, b) => {
                return +a.compensation/a.wordCount > +b.compensation/b.wordCount; 
            }));
            const tagRes = await PrintApi.getAllTags();
            setTags(tagRes);
        };
        getGigs();
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    async function submit(e) {
        e.preventDefault();
        const gigRes = await PrintApi.getAllGigs(formData);
        setGigs(gigRes);
    }

    return(
        <div className="container">
            <div className="row">

                <div className="col-3" >

                    <form onSubmit={submit}>
                        <label>Min Compensation</label>
                        <input
                            type="number"
                            name="minCompensation"
                            value={formData.minCompensation}
                            onChange={handleChange}
                        />

                        <label>Max Word Count</label>
                        <input
                            type="number"
                            name="maxWordCount"
                            value={formData.maxWordCount}
                            onChange={handleChange}
                        />

                        <label>Min Word Count</label>
                        <input
                            type="number"
                            name="minWordCount"
                            value={formData.minWordCount}
                            onChange={handleChange}
                        />

                        <label htmlFor="isRemote">Is Remote</label>
                        <select name="isRemote" id="isRemote" value={formData.isRemote} onChange={handleChange}>
                            <option value="">--</option>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </select>

                        <label htmlFor="tagTitle">Tagged</label>
                        <select name="tagTitle" id="tagTitle" value={formData.tagTitle} onChange={handleChange}>
                            <option value="">--</option>
                            {tags.length ? tags.map(t => <option key={t.id} value={t.title}>{t.title}</option>) : ""}
                        </select>
                            <br/>
                        <button className="mt-3">Submit</button>
                    </form>
                </div>

                <div className="col">
                    {!gigs.length ? "Loading..." : gigs.map(g => <GigCard key={g.id} gig={g}/>)}
                </div>

            </div>
        </div>
    )
};

export default GigList;

