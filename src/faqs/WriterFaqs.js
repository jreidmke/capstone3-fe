import { FaPenFancy } from 'react-icons/fa';

function WriterFaqs() {
    return(
        <div className="container">
            <div className="row">
                <h1>Writer FAQs</h1>
            </div>
            <div className="row">
                <FaPenFancy/><small>Welcome to Print, a platform to connect writers with content hosts of all kinds.</small>
            </div>
            <div className="row">
                <h6>How To Use</h6>
                <small>After submitting your information, you will be redirected to your profile page.</small>
            </div>

        </div>
    )
};

export default WriterFaqs;