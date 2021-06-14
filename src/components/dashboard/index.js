import React, { useState, useEffect } from "react";
import { theme } from "./dashboardTheme";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Container,
  Grid,
  CssBaseline,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core";

import { getAssociationById } from "../../services/associationService";
import authService from "../../services/authService";

import ActivityTypes from "../activities/activityTypes";
import { useHistory } from "react-router-dom";

export default function AssociationDashboard() {
  const [association, setAssociation] = useState(undefined);
  const history = useHistory();

  const getAssociation = async () => {
    let activeAssociationID = await authService.getActiveAssociationID();
    if (activeAssociationID === undefined) {
      history.push("/nsc");
    } else {
      const associationRes = await getAssociationById(activeAssociationID);
      if (associationRes.status === 200) {
        if (associationRes.data.length === 0) {
          history.push("/nsc");
        } else {
          setAssociation(associationRes.data[0]);
        }
      }
    }
  };

  useEffect(() => {
    getAssociation();
  }, []);

  if (association === undefined) {
    return (
      <>
        <CssBaseline>
          <AppBar
            style={{ background: theme.palette.primary.mainGradient }}
            position="relative"
          >
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Hello John
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "85vh" }}
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
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppBar
            style={{ background: theme.palette.primary.mainGradient }}
            position="relative"
          >
            <Toolbar>
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                style={{ flexGrow: 1 }}
                align="left"
              >
                Hello John
              </Typography>
              <Button color="inherit">LOGOUT</Button>
            </Toolbar>
          </AppBar>
          <main>
            <Container style={{ padding: 30 }} maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item lg={8} md={12} xs={12}>
                  {/* <Associations></Associations> */}
                </Grid>

                <Grid item lg={4} md={12} xs={12}>
                  <ActivityTypes
                    associationId={association._id}
                  ></ActivityTypes>
                </Grid>
              </Grid>
            </Container>
          </main>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}
