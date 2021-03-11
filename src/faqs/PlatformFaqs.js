import { FaPlusCircle, FaPenAlt, FaUserPlus } from 'react-icons/fa';
import profile from "../images/pProfile.png";
import newGig from "../images/pNewGig.png";
import addTagsToGig from "../images/pAddTagsToGig.png";
import openGigs from "../images/pOpenGigs.png";
import pendingApps from "../images/pPendingApplication.png";
import ongoingGigs from "../images/pOngoingGig.png";
import pieceFeed from "../images/pPieceFeed.png";
import queryForm from "../images/pQueryForm.png";
import {Tab} from "react-bootstrap";
import "./Faqs.css";

function PlatformFaqs() {
    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Platform Faqs</h1>
                </div>
            </div>
            <div className="row">
                <small>Welcome to <b>Print.</b> A place to connect your platform with the best writers available.</small>
            </div>
            <div className="row">
                <div className="col">
                    <img src={profile} alt="platform profile" id="fiftyRem"/>
                </div>
                <div className="col">
                    <p>After submitting your information, you will be redirected to your profile page. Look at the green, yellow and blue numbers to the right of your name. According to these, we currently have 0 Open Gig Postings, 0 Ongoing Gigs and 0 Pending Applications.</p>
                    <p>It's going to be tough running a platform without any of these. So start by posting a gig!</p>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <p>To add a gig, begin by pressing the <button id="add-gig-btn"><FaPlusCircle className="m-1"/><small>Add Gig</small></button> button on the top right of your profile page.</p>
                    <br/>
                    <p>Fill in the information on the Create Gig Form and hit <button className="btn btn-info">Create Gig</button> button.</p>
                </div>
                <div className="col-4">
                    <img src={newGig} alt="new gig form" id="twentyRem"/>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <img src={addTagsToGig} alt="add tags to gig" id="fiftyRem"/>
                </div>
                <div className="col">
                    <p>To attract writers to your newly created gig, add tags to it! Writers who follow these tags will see your gig on their homepages now!</p>
                    <p>When you've completed adding tags to your gigs, his the update gig button.</p>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-4 border-right">
                    <img src={openGigs} alt="open gigs" id="twentyRem"/>

                    <p>Look! You created a gig!</p>
                    <p>If you've tagged the gig, more likely than not, a writer will apply very soon!</p>
                </div>
                <div className="col">
                    <p>Wow! Someone already applied! This is great. Each application comes with a <i>portfolio</i>, a collection of pieces by this writer they submitted to show you their style and capabilities. To learn more about the writer or their submitted portfolio, click on the links.</p>
                    <p>When you are ready to make a decision about the applicant, update their status to either <b className="text-success">Accepted</b> or <b className="text-danger">Rejected</b>.</p>
                    <img src={pendingApps} alt="pending apps" id="fortyRem"/>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <img src={ongoingGigs} alt="ongoing-gigs" id="thirty"/>
                </div>
                <div className="col">
                    <p>It looks like the writer has accepted your gig! Now it has moved from the <b className="text-success">Open Gigs</b> tab to the <b className="text-info">Ongoing Gigs</b> tab.</p>
                    <p>Keep an eye on these ongoing gigs. We'll notify you when the deadline is approaching.</p>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <p>If you are having trouble finding writers to fullfill your gigs, you have a few options. We reccommend starting with you <i>Piece Feed</i>.</p>

                    <p>The Piece Feed keeps track of the writers and tags you follow and populates your timeline with the most current pieces.</p>

                              
                    <p>To bolster your piece feed, make sure to <i>Follow Writers</i>. Do this by pressing the <button id="follow-btn"><FaUserPlus className="m-1"/>Follow Writer</button> button.</p>
                </div>
                <div className="col">
                    <img src={pieceFeed} alt="piece feed" id="fiftyRem"/>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <img src={queryForm} alt="query form" id="fiftyRem"/>
                </div>
                <div className="col-3">             
                    <p>You can reach out to writers by <i>making a query</i>. To make a query to a writer, keep an eye out for the <button id="query-btn"><FaPenAlt className="m-1"/><small>Query Writer</small></button> or <button id="query-btn"><FaPenAlt className="m-1"/></button> buttons.</p>
                    <p>Making a query will send information about your platform and specified gig directly to the writer! Simply kick back and wait to hear their response.</p>
                </div>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
};

export default PlatformFaqs;