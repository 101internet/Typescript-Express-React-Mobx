import * as React from "react";
import { useStrict } from "mobx";
import { Provider } from "mobx-react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { initStore } from "./stores/createStore";
import { AdminLayout } from "./layout/admin";
import { MainPage } from "./page/main";
import { hot } from "react-hot-loader";
import {NoMainPage} from "./page/nomain";
useStrict(true);

const App = () => (
    <Provider {...initStore(process.env.NODE_ENV == "development")}>
        <Routes />
    </Provider>
);

const Routes = () => (
    <Router>
        <Switch>
            <AdminLayout exact path="/admin" component={MainPage} />
            <AdminLayout exact path="/admin/page" component={NoMainPage} />
        </Switch>
    </Router>
);

export default hot(module)(App);