import { FaPlusCircle, FaPenAlt, FaUserPlus, FaPlus, FaTimes } from 'react-icons/fa';
import profile from "../images/pProfile.png";
import newGig from "../images/pNewGig.png";
import addTagsToGig from "../images/pAddTagsToGig.png";
import openGigs from "../images/pOpenGigs.png";
import pendingApps from "../images/pPendingApplication.png";
import ongoingGigs from "../images/pOngoingGig.png";
import pieceFeed from "../images/pPieceFeed.png";
import queryForm from "../images/pQueryForm.png";
import "./Faqs.css";
import { useContext } from 'react';
import UserContext from '../auth/UserContext';
import { Link } from 'react-router-dom';

function PlatformFaqs() {
    const { currentUser } = useContext(UserContext);
    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="display-4 text-center">How to Use Print as a Platform</h1>
                </div>
            </div>
            <div className="row" id="step-row">
                <div className="col text-center">
                    <p>Welcome to <b>Print.</b> A place to connect your platform with the best writers available.</p>
                    <p>We use AI to help put you in touch with writers who share expertise with your needs.</p>
                    <p>To begin, hit the <FaUserPlus color="blue"/> icon and create a platform profile!</p>
                </div>
            </div>
            <hr/>
            <div className="row" id="step-row">
                <div className="col">
                    <img src={profile} alt="platform profile" id="fiftyRem"/>
                </div>
                <div className="col" id="sevenDown">
                    <h3>Step One:</h3>
                    <p>After registering and submitting your information, you will be redirected to your profile page that will look like this.</p> 
                    <p>Look at the <b><span className="text-success">green</span>, <span className="text-warning">yellow</span></b> and <b><span className="text-info">blue</span></b> numbers to the right of your name. According to these, we currently have  <b><span className="text-success">0 Open Gigs Posted</span>, <span className="text-warning">0 Pending Applications</span></b> and <b><span className="text-info">0 Ongoing Gigs</span></b></p>
                    <p>It's going to be tough running a platform without any of these. So start by posting a gig!</p>
                </div>
            </div>
            <div className="row" id="step-row">
                <div className="col" id="fiveDown">
                    <h3>Step Two:</h3>
                    <p>To add a gig, begin by pressing the <button id="add-gig-btn"><FaPlusCircle className="m-1"/><small>Add Gig</small></button> button on the top right of your profile page.</p>
                    <br/>
                    <p>Fill in the information on the Create Gig Form and hit <button className="btn btn-info">Create Gig</button> button.</p>
                </div>
                <div className="col-4">
                    <img src={newGig} alt="new gig form" id="twentyRem"/>
                </div>
            </div>
            <div className="row" id="step-row">
                <div className="col">
                    <img src={addTagsToGig} alt="add tags to gig" id="fiftyRem"/>
                </div>
                <div className="col" id="three-down">
                    <h3>Step Three:</h3>
                    <p>To attract writers to your newly created gig, add tags to it! Writers who follow these tags will see your gig on their homepages now!</p>
                    <p>To tag a gig, press the <FaPlus color="green"/> next to the tag. To remove a tag from a gig, press the <FaTimes color="red"/>.</p>
                    <p>When you've completed adding tags to your gigs, his the update gig button.</p>
                </div>
            </div>
            <div className="row" id="step-row">
                <div className="col-4 border-right">
                    <img src={openGigs} alt="open gigs" id="twentyRem"/>
                    <h3>Step Four:</h3>
                    <p>Look! You created a gig!</p>
                    <p>If you've tagged the gig, more likely than not, a writer will apply very soon!</p>
                </div>
                <div className="col">
                    <h3>Step Five:</h3>
                    <p>Wow! Someone already applied! This is great. Each application comes with a <i>portfolio</i>, a collection of pieces by this writer they submitted to show you their style and capabilities. To learn more about the writer or their submitted portfolio, click on the links.</p>
                    <p>When you are ready to make a decision about the applicant, update their status to either <b className="text-success">Accepted</b> or <b className="text-danger">Rejected</b>.</p>
                    <img src={pendingApps} alt="pending apps" id="fortyRem"/>
                </div>
            </div>
            <div className="row" id="step-row">
                <div className="col">
                    <img src={ongoingGigs} alt="ongoing-gigs" id="thirty"/>
                </div>
                <div className="col" id="sevenDown">
                    <h3>Step Six:</h3>
                    <p>It looks like the writer has accepted your gig! Now it has moved from the <b className="text-success">Open Gigs</b> tab to the <b className="text-info">Ongoing Gigs</b> tab.</p>
                    <p>Keep an eye on these ongoing gigs. We'll notify you when the deadline is approaching.</p>
                </div>
            </div>
            <div className="row" id="step-row">
                <div className="col">
                    <h3>Step Seven:</h3>
                    <p>If you are having trouble finding writers to fullfill your gigs, you have a few options. We reccommend starting with you <i>Piece Feed</i>.</p>

                    <p>The Piece Feed keeps track of the writers and tags you follow and populates your timeline with the most current pieces.</p>

                              
                    <p>To bolster your piece feed, make sure to <i>Follow Writers</i>. Do this by pressing the <button id="follow-btn"><FaUserPlus className="m-1"/>Follow Writer</button> button.</p>
                </div>
                <div className="col">
                    <img src={pieceFeed} alt="piece feed" id="fiftyRem"/>
                </div>
            </div>
            <div className="row" id="step-row">
                <div className="col">
                    <img src={queryForm} alt="query form" id="fiftyRem"/>
                </div>
                <div className="col-3">
                    <h3>Step Eight:</h3>             
                    <p>You can reach out to writers by <i>making a query</i>. To make a query to a writer, keep an eye out for the <button id="query-btn"><FaPenAlt className="m-1"/><small>Query Writer</small></button> or <button id="query-btn"><FaPenAlt className="m-1"/></button> buttons.</p>
                    <p>Making a query will send information about your platform and specified gig directly to the writer! Simply kick back and wait to hear their response.</p>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col">
                    <h1 className="text-center"><Link to={`/platforms/${currentUser.platformId}`}>Click Here To Start!</Link></h1>
                </div>
            </div>
        </div>
    )
};

export default PlatformFaqs;