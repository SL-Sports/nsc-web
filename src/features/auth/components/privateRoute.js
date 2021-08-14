import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function PrivateRoute({ children, nscOnly, ...rest }) {
  let auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.user ? ( // Check if logged in
          !nscOnly || auth.user.accountType === "NSC_ADMIN" ? ( // Check NSC perms
            children
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}
