import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from '../auth/LoginForm';
import UserRegisterForm from "../auth/UserRegisterForm";
import PrivateRoute from './PrivateRoute';

import Homepage from '../homepage/Homepage';
import LandingPage from '../homepage/LandingPage';

import PieceDetails from "../pieces/PieceDetails";
import NewPieceForm from "../pieces/NewPieceForm";
import EditPieceForm from "../pieces/EditPieceForm";
import PieceList from "../pieces/PieceList";

import PortfolioDetails from "../portfolios/PortfolioDetails";
import EditPortfolioForm from "../portfolios/EditPortfolioForm";
import NewPortfolioForm from "../portfolios/NewPortfolioForm";

import WriterDetails from "../writers/WriterDetails";
import WriterList from "../writers/WriterList";
import WriterPieces from "../writers/WriterPieces";
import EditWriterProfile from "../writers/EditWriterProfile";

import PlatformList from "../platforms/PlatformList";
import PlatformDetails from "../platforms/PlatformDetails";
import EditPlatformProfile from "../platforms/EditPlatformDetails";
import QueryForm from "../platforms/QueryForm";

import GigList from "../gigs/GigList";
import GigDetails from "../gigs/GigDetails";
import EditGigForm from "../gigs/EditGigForm";
import NewGigForm from "../gigs/NewGigForm";
import ApplyToGigForm from "../applications/ApplyToGigForm";
import ApplicationDetails from "../applications/ApplicationDetails";
import MessagePage from "../writers/MessagePage";
import RelatedItems from "../gigs/RelatedItems";

import OngoingWriterGigs from "../writers/OngoingGigs";
import OngoingPlatformGigs from "../platforms/OngoingPlatformGigs";
import WriterFaqs from "../faqs/WriterFaqs";
import PlatformFaqs from "../faqs/PlatformFaqs";

function Routes({ login, register, logout }) {
    return(
        <Switch>

            <Route exact path="/">
                <LandingPage/>
            </Route>

            <Route exact path="/home">
                <Homepage/>
            </Route>

            <Route exact path="/login">
                <LoginForm login={login}/>
            </Route>

            <Route exact path="/register">
                <UserRegisterForm register={register}/>
            </Route>

            <PrivateRoute exact path="/writers">
                <WriterList/>
            </PrivateRoute>

            <PrivateRoute path="/pieces/new">
                <NewPieceForm/>
            </PrivateRoute>

            <PrivateRoute path="/writers/faqs">
                <WriterFaqs/>
            </PrivateRoute>

            <PrivateRoute path="/platforms/faqs">
                <PlatformFaqs/>
            </PrivateRoute>

            <PrivateRoute path="/writers/:writerId/ongoing">
                <OngoingWriterGigs/>
            </PrivateRoute>

            <PrivateRoute path="/writers/:writerId/pieces">
                <WriterPieces/>
            </PrivateRoute>

            <PrivateRoute path="/portfolios/new">
                <NewPortfolioForm/>
            </PrivateRoute>

            <PrivateRoute path="/writers/:writerId/queries">
                <MessagePage/>
            </PrivateRoute>

            <PrivateRoute path="/writers/:writerId/make-query">
                <QueryForm/>
            </PrivateRoute>

            <PrivateRoute path="/writers/:writerId/edit">
                <EditWriterProfile logout={logout}/>
            </PrivateRoute>

            <PrivateRoute path="/writers/:writerId">
                <WriterDetails/>
            </PrivateRoute>

            <PrivateRoute path="/portfolios/:portfolioId/edit">
                <EditPortfolioForm/>
            </PrivateRoute>
            
            <PrivateRoute path="/portfolios/:portfolioId">
                <PortfolioDetails/>
            </PrivateRoute>
            
            <PrivateRoute path="/pieces/:pieceId/edit">
                <EditPieceForm/>
            </PrivateRoute>
            
            <PrivateRoute path="/pieces/:pieceId">
                <PieceDetails/>
            </PrivateRoute>

            <PrivateRoute path="/pieces">
                <PieceList/>
            </PrivateRoute>

            <PrivateRoute path="/platforms/faqs">
                <PlatformFaqs/>
            </PrivateRoute>

            <PrivateRoute path="/platforms/:platformId/ongoing">
                <OngoingPlatformGigs/>
            </PrivateRoute>
            
            <PrivateRoute path="/platforms/:platformId/applications/:appId">
                <ApplicationDetails/>
            </PrivateRoute>
            
            <PrivateRoute exact path="/gigs/new">
                <NewGigForm/>
            </PrivateRoute>

            <PrivateRoute path="/platforms/:platformId/edit">
                <EditPlatformProfile logout={logout}/>
            </PrivateRoute>

            <PrivateRoute path="/platforms/:platformId">
                <PlatformDetails/>
            </PrivateRoute>

            <PrivateRoute path="/platforms">
                <PlatformList/>
            </PrivateRoute>

            <PrivateRoute path="/gigs/:gigId/related-items">
                <RelatedItems/>
            </PrivateRoute>

            <PrivateRoute path="/gigs/:gigId/edit">
                <EditGigForm/>
            </PrivateRoute>

            <PrivateRoute path="/gigs/:gigId/apply">
                <ApplyToGigForm/>
            </PrivateRoute>

            <PrivateRoute path="/gigs/:gigId">
                <GigDetails/>
            </PrivateRoute>

            <PrivateRoute path="/gigs">
                <GigList/>
            </PrivateRoute>
        </Switch>
    )
};

export default Routes;