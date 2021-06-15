import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { CssBaseline, CircularProgress, Grid } from "@material-ui/core";
import { theme } from "./authTheme";

import authService from "../../services/authService";

//To make users login before they can access the other pages on the website
function PrivateRouter(props) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNSCAdmin, setIsNSCAdmin] = useState(false);
  const path = props.path;
  const component = props.component;
  const nscOnly = props.nscOnly;

  useEffect(() => {
    const checkAuthStatus = async () => {
      let token = await authService.getToken();
      let accountType = await authService.getAccountType();
      setIsAuthenticated(token !== undefined);
      setIsNSCAdmin(accountType === "NSC_ADMIN");
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <>
        <CssBaseline>
          <main>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "80vh" }}
            >
              <Grid item xs={3}>
                <CircularProgress
                  style={{ color: theme.palette.primary.main, margin: "auto" }}
                ></CircularProgress>{" "}
              </Grid>
            </Grid>
          </main>
        </CssBaseline>
      </>
    );
  } else {
    if (isAuthenticated) {
      if (nscOnly) {
        if (isNSCAdmin) {
          return <Route path={path} component={component} />;
        } else {
          return <Redirect to="/dashboard" />;
        }
      } else {
        return <Route path={path} component={component} />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default PrivateRouter;
