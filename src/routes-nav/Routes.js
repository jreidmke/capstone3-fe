import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from '../auth/LoginForm';
import UserRegisterForm from "../auth/UserRegisterForm";
import Homepage from '../homepage/Homepage';
import PrivateRoute from './PrivateRoute';

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

import GigList from "../gigs/GigList";
import GigDetails from "../gigs/GigDetails";
import EditGigForm from "../gigs/EditGigForm";
import NewGigForm from "../gigs/NewGigForm";
import ApplyToGigForm from "../applications/ApplyToGigForm";
import ApplicationDetails from "../applications/ApplicationDetails";

function Routes({ login, register, logout }) {
    return(
        <Switch>
            <Route exact path="/">
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

            <PrivateRoute path="/writers/:writerId/pieces/new">
                <NewPieceForm/>
            </PrivateRoute>

            <PrivateRoute path="/writers/:writerId/pieces">
                <WriterPieces/>
            </PrivateRoute>

            <PrivateRoute path="/writers/:writerId/portfolios/new">
                <NewPortfolioForm/>
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
            
            <PrivateRoute path="/platforms/:platformId/applications/:appId">
                <ApplicationDetails/>
            </PrivateRoute>
            
            <PrivateRoute exact path="/platforms/:platformId/gigs/new">
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