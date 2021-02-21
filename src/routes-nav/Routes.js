import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from '../auth/LoginForm';
import UserRegisterForm from "../auth/UserRegisterForm";
import Homepage from '../homepage/Homepage';

import PieceDetails from "../pieces/PieceDetails";
import NewPieceForm from "../pieces/NewPieceForm";

import PortfolioDetails from "../portfolios/PortfolioDetails";
import PortfolioEditForm from "../portfolios/PortfolioEditForm";
import NewPortfolioForm from "../portfolios/NewPortfolioForm";

import WriterDetails from "../writers/WriterDetails";
import WriterList from "../writers/WriterList";
import WriterPieces from "../writers/WriterPieces";

import PrivateRoute from './PrivateRoute';
import PieceEditForm from "../pieces/PieceEditForm";
import PieceList from "../pieces/PieceList";

import PlatformList from "../platforms/PlatformList";
import PlatformDetails from "../platforms/PlatformDetails";

import GigList from "../gigs/GigList";

function Routes({ login, register}) {
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

            <PrivateRoute path="/writers/:writerId">
                <WriterDetails/>
            </PrivateRoute>

            <PrivateRoute path="/portfolios/:portfolioId/edit">
                <PortfolioEditForm/>
            </PrivateRoute>
            
            <PrivateRoute path="/portfolios/:portfolioId">
                <PortfolioDetails/>
            </PrivateRoute>
            
            <PrivateRoute path="/pieces/:pieceId/edit">
                <PieceEditForm/>
            </PrivateRoute>
            
            <PrivateRoute path="/pieces/:pieceId">
                <PieceDetails/>
            </PrivateRoute>

            <PrivateRoute path="/pieces">
                <PieceList/>
            </PrivateRoute>

            <PrivateRoute path="/platforms/:platformId">
                <PlatformDetails/>
            </PrivateRoute>

            <PrivateRoute path="/platforms">
                <PlatformList/>
            </PrivateRoute>

            <PrivateRoute path="/gigs">
                <GigList/>
            </PrivateRoute>
            
        </Switch>
    )
};

export default Routes;