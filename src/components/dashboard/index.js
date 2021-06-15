import React, { useState, useEffect } from "react";
import { theme } from "./dashboardTheme";
import {
  Typography,
  Container,
  Grid,
  CssBaseline,
  ThemeProvider,
  CircularProgress,
} from "@material-ui/core";

import { getAssociationById } from "../../services/associationService";
import authService from "../../services/authService";

import ActivityTypes from "../activities/components/activityTypes";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import NavBar from "../navbar";

export default function AssociationDashboard() {
  const [association, setAssociation] = useState(undefined);
  const history = useHistory();

  const getAssociation = async () => {
    let activeAssociationID = await authService.getActiveAssociationID();
    if (activeAssociationID === undefined) {
      history.push("/");
    } else {
      const associationRes = await getAssociationById(activeAssociationID);
      if (associationRes.status === 200) {
        if (associationRes.data.length === 0) {
          history.push("/");
        } else {
          setAssociation(associationRes.data[0]);
          Cookies.set("associationName", associationRes.data[0].name);
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
          <main>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
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
          <NavBar
            title={`${association.name} Dashboard`}
            dashboardSelected
            menuEnabled
            profilePicEnabled
          />

          <main>
            <Container style={{ padding: 30 }} maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item lg={8} md={12} xs={12}>
                  <Typography
                    variant="h4"
                    align="left"
                    style={{ fontWeight: "bolder" }}
                  >
                    Payments
                  </Typography>
                </Grid>

                <Grid item lg={4} md={12} xs={12}>
                  <ActivityTypes
                    associationId={association._id}
                  ></ActivityTypes>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    align="left"
                    style={{ fontWeight: "bolder" }}
                  >
                    Profiles
                  </Typography>
                </Grid>
              </Grid>
            </Container>
          </main>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}
