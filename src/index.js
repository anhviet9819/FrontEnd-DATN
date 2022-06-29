import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import UserLayout from "./layouts/UserLayout";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminLayout from "layouts/AdminLayout";
import AdminSignIn from "views/Admin/AdminSignIn";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/signin"
        render={(props) => {
          return localStorage.getItem("accessToken") &&
            localStorage.getItem("roles") === "ROLE_USER" ? (
            <Redirect to="/user/dashboard" />
          ) : (
            <SignIn {...props} />
          );
        }}
      ></Route>
      <Route
        path="/signup"
        render={(props) => {
          return localStorage.getItem("accessToken") &&
            localStorage.getItem("roles") === "ROLE_USER" ? (
            <Redirect to="/user/dashboard" />
          ) : (
            <SignUp {...props} />
          );
        }}
      ></Route>
      <Route
        path="/user"
        render={(props) => {
          return localStorage.getItem("accessToken") ? (
            <UserLayout {...props} />
          ) : (
            <Redirect to="/signin" />
          );
        }}
      ></Route>
      <Route
        path="/adminsignin"
        render={(props) => {
          return localStorage.getItem("accessToken") &&
            localStorage.getItem("roles") === "ROLE_ADMIN" ? (
            <Redirect to="/admin/dashboard" />
          ) : (
            <AdminSignIn {...props} />
          );
        }}
      ></Route>
      <Route
        path="/admin"
        render={(props) => {
          return localStorage.getItem("accessToken") &&
            localStorage.getItem("roles") === "ROLE_ADMIN" ? (
            <AdminLayout {...props} />
          ) : (
            <Redirect to="/adminsignin" />
          );
        }}
      ></Route>
      <Redirect from="/" to="/signin" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
