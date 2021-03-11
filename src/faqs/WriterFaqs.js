import { FaPenFancy, FaPlus, FaTimes } from 'react-icons/fa';
import emptyApp from './../images/wEmptyApp.png';
import newPieceBtn from "../images/wNewPieceBtn.png";
import newPieceBtn2 from "../images/wNewPieceBtn2.png";
import newPiece from "../images/wNewPiece.png";
import addTagToPiece from "../images/wAddTagToPiece.png";
import newPortfolioBtn from "../images/wNewPortfolioBtn.png";
import newPortfolio from "../images/wNewPortfolio.png";
import addPieceToPortfolio from "../images/wAddPieceToPortfolio.png";
import gigFeed from "../images/wGigFeed.png";
import applyBtn from "../images/wApplyButton.png";
import applyToGig from "../images/wApplyToGig.png";
import pendingApp from "../images/wPendingApp.png";
import mail from "../images/wMail.png";
import acceptGig from "../images/wAcceptGig.png";
import ongoingGigs from "../images/wOngoingGigs.png";

import "./WriterFaqs.css";

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
            <hr/>

            <div className="row">
                <div className="col">
                    <img src={emptyApp} id="wEmptyApp"/>
                </div>
                <div className="col">
                    <p className="mt-3">After submitting your information, you will be redirected to your profile page. Your application box is empty! Let's fix that.</p>
                </div>
            </div>
            <hr/>

            <div className="row">
                <div className="col-3">
                    <p>Before you can start applying to gigs, you'll need to write some <i>pieces</i> first. To write a new piece, select one of these buttons!</p>
                </div>
                <div className="col">
                    <img src={newPieceBtn} alt="new piece button" id="newPieceBtn"/>
                    <img src={newPieceBtn2} alt="other new piece button" id="newPieceBtn2"/>
                </div>
            </div>
            <hr/>

            <div className="row">
                <div className="col">
                    <img src={newPiece} alt="creating a new piece" id="newPieceForm"/>
                </div>
                <div className="col mt-5">
                    <p>This will take you to the create piece form. Here you can write your piece!</p>
                    <br/><br/>
                    <p>When you've completed writing your piece, simply hit submit!</p>
                </div>
            </div>
            <hr/>

            <div className="row">
                <div className="col mt-5">
                    <p>This will take you to the Edit Piece Form. Here you can double check your work and even more importantly, <i>add tags to your piece!</i></p>

                    <br/>
                    <p>To add a tag, just press the green <FaPlus color="green"/> next to it. To remove it, press the red <FaTimes color="red"/></p>
                    <p>When finished, press submit.</p>
                </div>
                <div className="col">
                    <img src={addTagToPiece} alt="add tag to piece" id="fiftyRem"/>
                </div>
            </div>
            <hr/>

            <div className="row">
                <div className="col">
                    <img src={newPortfolioBtn} alt="new portfolio button" id="fiftyRem"/>
                </div>
                <div className="col">
                    <p>But you can't start applying just yet. On <b>Print</b>, you don't apply to gigs with pieces, you apply with <i>Portfolios</i>, which are a collection of pieces. To create a new portfolio, hit the green <FaPlus color="green"/> in the Portfolios Tab of you Profile Page.</p>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <p>Title your <i>portfolio</i> and hit submit!</p>
                </div>
                <div className="col">
                    <img src={newPortfolio} alt="new portfolio form" id="fiftyRem"/>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <img src={addPieceToPortfolio} alt="add piece to portfolio" id="fiftyRem"/>
                </div>
                <div className="col">
                    <p>This will redirect you to the <i>edit portfolio</i> page. Here, you can change your portfolio's title as well as adding or removing pieces!</p>
                    <p>To add a piece, just press the green <FaPlus color="green"/> next to it. To remove it, press the red <FaTimes color="red"/></p>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <p>It's time to apply to a gig!</p>
                    <p>There are multiple ways to find a gig, but the way we reccomend is by following tags and checking your Gig Feed.</p>
                    <p>Here you will find a list of gigs based on the <i>tags</i> and <i>platforms</i> you follow!</p>
                    <p>Find a gig you like and click the title.</p>
                </div>
                <div className="col">
                    <img src={gigFeed} alt="writer gig feed" id="fiftyRem"/>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <img src={applyBtn} alt="apply button" id="applyBtn"/>
                    <p>If the gig interests you, hit the apply button!</p>
                    <p>To apply to a gig, all you need to do is submit a portfolio.</p>
                    <p>Make sure to double check the contents of the chosen portfolio before you submit!</p>
                </div>
                <div className="col">
                    <img src={applyToGig} alt="apply to gig" id="fiftyRem"/>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col">
                    <img src={pendingApp} alt="pending applications" id="fiftyRem"/>
                </div>
                <div className="col">
                    <p>Wow, look! You applied to a gig! Now there is a pending gig in your applications folder! This is great!</p>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col-2">
                    <img src={mail} alt="writer mail" id="mail"/>
                    <p>Keep an eye on your mailbox. This is how prospective employers will let you know the status of your application</p>
                </div>
                <div className="col-4">
                    <img src={acceptGig} alt="accept gig" id="twentyRem"/>
                    <p>Whoa! Check that out! You must know alot about capitalism. To accept the gig, simply press the green button. To decline, press red.</p>
                </div>
                <div className="col-6">
                    <p>To keep track of your ongoing gigs, just check the ongoing gigs tab of your profile!</p>
                    <img src={ongoingGigs} alt="ongoing gigs" id="fortyRem"/>
                </div>
            </div>
            <div className="row">
                
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
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
};

export default WriterFaqs;