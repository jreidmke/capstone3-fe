import { useContext, useState } from 'react';
import PrintApi from '../api/api';
import { useHistory } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import "./PortfolioForm.css";

function NewPortfolioForm() {
    const { currentUser } = useContext(UserContext);
    const history = useHistory();


    const [formData, setFormdata] = useState({
        title: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormdata({...formData, [name]: value});
    };

    async function submit(e) {
        e.preventDefault();
        const newPortfolio = await PrintApi.createPortfolio(currentUser.writerId, formData);
        history.push(`/portfolios/${newPortfolio.id}/edit`);
    };

    return(
        <div className="container mt-3">
            <div className="row" id="new-portfolio-form">
                <div className="col">
                    <h4 className="text-center">Simply title your portfolio right now. You'll add pieces to it after you submit!</h4>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <form onSubmit={submit}>
                        <input 
                            type="text"
                            name="title"
                            onChange={handleChange}
                            value={formData.title}
                            placeholder="Portfolio Title"
                            className="form-control"
                            id="new-portfolio-input"/>
                        <button className="btn btn-lg btn-block btn-info">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default NewPortfolioForm;