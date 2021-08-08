import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function PrivateRoute({ agent, client, children, ...rest }) {
  let auth = useAuth();

  const pagePermissions =
    auth.user &&
    ((auth.user.isAgent && agent) || (auth.user.isClient && client));

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.user ? ( // Check if logged in
          pagePermissions ? ( // Check permissions
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
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
