import React from "react";
import { Redirect, Route } from "react-router";

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  logout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  },
};

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return fakeAuth.isAuthenticated === true ? (
          children
        ) : (
          //   <Redirect to="/admin/dashboard" />
          <Redirect to="/signin" />
        );
      }}
    />
  );
}

export default PrivateRoute;
