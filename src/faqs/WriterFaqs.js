import { FaPenFancy } from 'react-icons/fa';
import emptyApp from './../images/wEmptyApp.png';
import newPieceBtn from "../images/wNewPieceBtn.png";
import newPieceBtn2 from "../images/wNewPieceBtn2.png";
import newPiece from "../images/wNewPiece.png";
import addTagToPiece from "../images/wAddTagToPiece.png";
import newPortfolioBtn from "../images/wNewPortfolioBtn.png";

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

            <div className="row">
                <div className="col">
                    <img src={emptyApp} id="wEmptyApp"/>
                </div>
                <div className="col">
                    <p className="mt-3">After submitting your information, you will be redirected to your profile page. Your application box is empty! Let's fix that.</p>
                </div>
            </div>

            <div className="row">
                <div className="col-3">
                    <p>Before you can start applying to gigs, you'll need to write some <i>pieces</i> first. To write a new piece, select one of these buttons!</p>
                </div>
                <div className="col">
                    <img src={newPieceBtn} alt="new piece button" id="newPieceBtn"/>
                    <img src={newPieceBtn2} alt="other new piece button" id="newPieceBtn2"/>
                </div>
            </div>

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

            <div className="row">
                <div className="col mt-5">
                    <p>This will take you to the Edit Piece Form. Here you can double check your work and even more importantly, <i>add tags to your piece!</i></p>

                    <br/>
                    <p>To add a tag, just press the green <b className="text-success">+</b> next to it. To remove it, press the red <b className="text-danger">X</b></p>
                    <p>When finished, press submit.</p>
                </div>
                <div className="col">
                    <img src={addTagToPiece} alt="add tag to piece" id="addTagToPiece"/>
                </div>
            </div>

            <div className="row">
                <img src={newPortfolioBtn} alt="new portfolio button" id="newPortfolioBtn"/>
            </div>

        </div>
    )
};

export default WriterFaqs;