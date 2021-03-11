import { FaRegKeyboard, FaPlus, FaTimes, FaUserPlus, FaEnvelopeSquare } from 'react-icons/fa';
import emptyApp from './../images/wEmptyApp.png';
import newPieceBtn2 from "../images/wNewPieceBtn2.png";
import newPiece from "../images/wNewPiece.png";
import addTagToPiece from "../images/wAddTagToPiece.png";
import newPortfolioBtn from "../images/wNewPortfolioBtn.png";
import newPortfolio from "../images/wNewPortfolio.png";
import addPieceToPortfolio from "../images/wAddPieceToPortfolio.png";
import gigFeed from "../images/wGigFeed.png";
import applyToGig from "../images/wApplyToGig.png";
import pendingApp from "../images/wPendingApp.png";
import mail from "../images/wMail.png";
import acceptGig from "../images/wAcceptGig.png";
import ongoingGigs from "../images/wOngoingGigs.png";

import "./Faqs.css";
import { useContext } from 'react';
import UserContext from '../auth/UserContext';
import { Link } from "react-router-dom";

function WriterFaqs() {
    const { currentUser } = useContext(UserContext);
    return(
        <div className="container">
            <div className="row" id="top-row">
                <div className="col">
                    <h1 className="display-4 text-center">How to Use Print as a Writer</h1>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <p>Welcome to <b>Print.</b> A place to connect you with the best platforms and publishers for your work.</p>
                    <p>We use AI to put your work in front of platforms who share your passion for words.</p>
                    <p>To begin, hit the <FaUserPlus color="blue"/> icon and create a Writer profile!</p>
                </div>
            </div>
            <hr/>

            <div className="row" id="step-row">
                <div className="col">
                    <img src={emptyApp} id="wEmptyApp"/>
                </div>
                <div className="col">
                    <h3>Step One:</h3>
                    <p className="mt-3">After submitting your information, you will be redirected to your profile page. Your application box is empty! Let's fix that.</p>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col-3">
                    <h3>Step Two:</h3>
                    <p>Before you can start applying to gigs, you'll need to write some <i>pieces</i> first. To write a new piece, select either the <button id="follow-btn"><FaRegKeyboard className="m-1"/><small>Write Piece</small></button> or the <FaPlus color="green"/> button on the end of the Pieces Tab!</p>
                </div>
                <div className="col">
                    <img src={newPieceBtn2} alt="other new piece button" id="newPieceBtn2"/>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col">
                    <img src={newPiece} alt="creating a new piece" id="newPieceForm"/>
                </div>
                <div className="col mt-5">
                    <h3>Step Three:</h3>
                    <p>This will take you to the create piece form. Here you can write your piece!</p>
                    <p>When you've completed writing your piece, simply hit <button className="btn btn-info">Submit</button>!</p>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col mt-5">
                    <h3>Step Four:</h3>
                    <p>This will take you to the Edit Piece Form. Here you can double check your work and even more importantly, <i>add tags to your piece!</i></p>

                    <p>Tagging your piece will keep it on Platform Timelines and <b>increase your chances of getting a gig query</b>.</p>
                    <p>To add a tag, just press the green <FaPlus color="green"/> next to it. To remove it, press the red <FaTimes color="red"/></p>
                    <p>When finished, press <button className="btn btn-info">Submit</button>.</p>
                </div>
                <div className="col">
                    <img src={addTagToPiece} alt="add tag to piece" id="fiftyRem"/>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col">
                    <img src={newPortfolioBtn} alt="new portfolio button" id="fiftyRem"/>
                    <img src={newPortfolio} alt="new portfolio form" id="fiftyRem"/>
                </div>
                <div className="col">
                    <h3>Step Five:</h3>
                    <p>But you can't start applying just yet. On <b>Print</b>, you don't apply to gigs with pieces, you apply with <i>Portfolios</i>, which are a collection of pieces. To create a new portfolio, hit the green <FaPlus color="green"/> in the Portfolios Tab of you Profile Page.</p>
                    <p>Title your <i>portfolio</i> and hit submit!</p>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col">
                    <h3>Step Six:</h3>
                    <p>This will redirect you to the <i>edit portfolio</i> page. Here, you can change your portfolio's title as well as adding or removing pieces!</p>
                    <p>To add a piece, just press the green <FaPlus color="green"/> next to it. To remove it, press the red <FaTimes color="red"/></p>
                </div>
                <div className="col">
                    <img src={addPieceToPortfolio} alt="add piece to portfolio" id="fiftyRem"/>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col">
                    <img src={gigFeed} alt="writer gig feed" id="fiftyRem"/>
                </div>
                <div className="col">
                    <h3>Step Seven:</h3>
                    <p>It's time to apply to a gig!</p>
                    <p>There are multiple ways to find a gig, but the way we reccomend is by following tags and checking your Gig Feed.</p>
                    <p>Here you will find a list of gigs based on the <i>tags</i> and <i>platforms</i> you follow!</p>
                    <p>Find a gig you like and click the title.</p>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col">
                    <h3>Step Eight:</h3>
                    <p>If the gig interests you, hit the <button className="btn btn-info">Apply!</button> button!</p>
                    <p>To apply to a gig, all you need to do is submit a portfolio.</p>
                    <p>Make sure to double check the contents of the chosen portfolio before you submit!</p>
                </div>
                <div className="col">
                    <img src={applyToGig} alt="apply to gig" id="fiftyRem"/>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col">
                    <img src={pendingApp} alt="pending applications" id="fiftyRem"/>
                </div>
                <div className="col mt-2">
                    <p>Wow, look! You applied to a gig! Now there is a pending gig in your applications folder! This is great!</p>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col">
                    <h3>Step Nine:</h3>
                    <p>Keep an eye on your mailbox (<FaEnvelopeSquare color="blue"/>). It's an icon in the top right of the navbar. This is how prospective employers will let you know the status of your application. <img src={mail} alt="writer mail" id="mail"/></p>
                    
                </div>
                <div className="col">
                    <img src={acceptGig} alt="accept gig" id="twentyRem"/>
                    <p>Whoa! Check that out! You must know alot about capitalism. To accept the gig, simply press the green button. To decline, press red.</p>
                </div>
                
            </div>
            <div className="row" id="step-row">
                <div className="col">
                    <h3>Step Ten:</h3>
                    <p>To keep track of your ongoing gigs, just check the ongoing gigs tab of your profile!</p>
                    <img src={ongoingGigs} alt="ongoing gigs" id="fortyRem"/>
                </div>
                <div className="col" id="sevenDown">
                    <p>Be sure to Follow Platforms to keep your Gig Feed heavily populated with the most up to date gigs!</p>
                    <p>To follow a platform, go to their page and click the <button id="follow-btn"><FaUserPlus className="m-1"/>Follow Platform</button> button.</p>
                </div>
            </div>

            <div className="row" id="step-row">
                <div className="col">
                    <h1 className="text-center"><Link to={`/writers/${currentUser.writerId}`}>Click Here To Get Started!</Link></h1>
                </div>
            </div>
        </div>
    )
};


export default WriterFaqs;