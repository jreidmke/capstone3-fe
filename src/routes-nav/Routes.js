import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from '../auth/LoginForm';
import WriterRegisterForm from "../auth/WriterRegisterForm";
import Homepage from '../homepage/Homepage';

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
                <WriterRegisterForm register={register}/>
            </Route>
        </Switch>
    )
};

export default Routes;