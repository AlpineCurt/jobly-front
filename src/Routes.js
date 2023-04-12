import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import CompanyDetails from "./CompanyDetails";
import Login from "./Login";
import NewUserForm from "./NewUserForm";
import EditProfileForm from "./EditProfileForm";

const Routes = () => {
    return (
        <>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/companies">
                <CompanyList />
            </Route>
            <Route exact path="/companies/:handle">
                <CompanyDetails />
            </Route>
            <Route exact path="/jobs">
                <JobList />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/signup">
                <NewUserForm />
            </Route>
            <Route exact path="/profile">
                <EditProfileForm />
            </Route>
        </Switch>
        </>
    );
}

export default Routes;