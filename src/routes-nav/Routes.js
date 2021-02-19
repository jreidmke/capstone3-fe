import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from '../auth/LoginForm';
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
        </Switch>
    )
};

export default Routes;