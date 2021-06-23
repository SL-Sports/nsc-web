import React, { useState, useEffect } from "react";
import { theme } from "./dashboardTheme";
import {
  Typography,
  Container,
  Grid,
  CssBaseline,
  ThemeProvider,
  CircularProgress,
  Button,
} from "@material-ui/core";

import { getAssociationById } from "../../services/associationService";
import authService from "../../services/authService";
import paymentsService from "../../services/paymentsService";

import ActivityTypes from "../activities/components/activityTypes";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import NavBar from "../navbar";
import PaymentsList from "../payments/components/paymentsList";
import { ProfileList } from "../profiles/components/profileList";
import { getActiveProfiles } from "../../services/profileService";

const paymentsLength = 3;
const profilesLength = 5;

export default function AssociationDashboard() {
  const [association, setAssociation] = useState(undefined);
  const [payments, setPayments] = useState(undefined);
  const [profiles, setProfiles] = useState(undefined);
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

      const paymentsRes = await paymentsService.getUnapprovedPayments(
        activeAssociationID
      );
      if (paymentsRes.status === 200) {
        if (paymentsRes.data.length > paymentsLength) {
          setPayments(paymentsRes.data.reverse().slice(0, paymentsLength));
        } else {
          setPayments(paymentsRes.data.reverse());
        }
      }

      const profilesRes = await getActiveProfiles();
      if (profilesRes.status === 200) {
        let profileData = [];

        for (
          let i = 0;
          i < Math.min(profilesLength, profilesRes.data.length);
          i++
        ) {
          profileData.push(profilesRes.data[i].profile);
        }

        setProfiles(profileData);
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
            <Container maxWidth="xl">
              <Grid container spacing={3}>
                <Grid item lg={9} md={12} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={7} sm={10}>
                      <Typography
                        variant="h4"
                        align="left"
                        style={{ fontWeight: "bolder" }}
                      >
                        Payments
                      </Typography>
                    </Grid>
                    <Grid item xs={5} sm={2}>
                      <Button
                        style={{
                          background: theme.palette.primary.mainGradient,
                          color: "white",
                          borderRadius: 20,
                          fontWeight: "bolder",
                        }}
                        fullWidth
                        onClick={() => history.push("/payments")}
                      >
                        SEE ALL
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <PaymentsList payments={payments} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item lg={3} md={12} xs={12}>
                  <ActivityTypes
                    associationId={association._id}
                  ></ActivityTypes>
                </Grid>
                <Grid item xs={7} sm={10}>
                  <Typography
                    variant="h4"
                    align="left"
                    style={{ fontWeight: "bolder" }}
                  >
                    Profiles
                  </Typography>
                </Grid>
                <Grid item xs={5} sm={2}>
                  <Button
                    style={{
                      background: theme.palette.primary.mainGradient,
                      color: "white",
                      borderRadius: 20,
                      fontWeight: "bolder",
                    }}
                    fullWidth
                    onClick={() => history.push("/profiles")}
                  >
                    SEE ALL
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <ProfileList profiles={profiles} />
                </Grid>
              </Grid>
            </Container>
          </main>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}
