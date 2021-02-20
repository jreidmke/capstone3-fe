import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from '../auth/LoginForm';
import UserRegisterForm from "../auth/UserRegisterForm";
import Homepage from '../homepage/Homepage';
import WriterDetails from "../writers/WriterDetails";
import WriterList from "../writers/WriterList";

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

            <Route exact path="/writers">
                <WriterList/>
            </Route>

            <Route path="/writers/:writerId">
                <WriterDetails/>
            </Route>
        </Switch>
    )
};

export default Routes;