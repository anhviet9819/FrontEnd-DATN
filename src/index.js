import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import AdminLayout from "./layouts/Admin";
import Login from "./views/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import PrivateRoute from "components/AuthenticatedRoute/AuthenticatedRoute";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/signin" render={(props) => <SignIn {...props} />} />
      <Route path="/signup" render={(props) => <SignUp {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/signup" render={(props) => <SignUp {...props} />} />
      <Redirect from="/" to="/signin" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
