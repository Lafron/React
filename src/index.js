import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Main from "./layout/main";
import Login from "./layout/login";
import Users from "./layout/users";
import NavBar from "./components/ui/navBar";
import NotFound from "./components/notFound";
import Edit from "./components/page/Edit/edit";

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?" exact component={Users} />
                <Route path="/users/:userId/edit" component={Edit} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
