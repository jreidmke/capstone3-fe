import { useContext, useState } from 'react';
import PrintApi from '../api/api';
import { useHistory, useParams } from 'react-router-dom';
import UserContext from '../auth/UserContext';

function NewPortfolioForm() {
    const { writerId } = useParams();
    const { currentUser } = useContext(UserContext);
    const history = useHistory();

    if(writerId != currentUser.writerId) history.push("/login");

    const [formData, setFormdata] = useState({
        title: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormdata({...formData, [name]: value});
    };

    async function submit(e) {
        e.preventDefault();
        const newPortfolio = await PrintApi.createPortfolio(writerId, formData);
        console.log(newPortfolio);
        history.push(`/portfolios/${newPortfolio.id}/edit`);
    };

    return(
        <div>
            <p>Simply title your portfolio right now. You'll add pieces to it after you create the title!</p>
            <form onSubmit={submit}>
                <input 
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                    placeholder="Portfolio Title"/>
                <button>Submit</button>
            </form>
        </div>
    )
};

export default NewPortfolioForm;