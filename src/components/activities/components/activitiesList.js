import React, { useState, useEffect } from "react";
import activityService from "../../../services/activityService";
import {
  Typography,
  CircularProgress,
  Container,
  Grid,
} from "@material-ui/core";
import Activity from "./activityCard";

import { theme } from "../activityTheme";

export default function ActivitiesList({ profileId }) {
  const [activities, setActivities] = useState(undefined);

  useEffect(() => {
    const getActivities = async () => {
      if (profileId === undefined) {
        profileId = "60ac7a65658e534fb80b9f52";
      }
      const activitiesRes = await activityService.getActivities(profileId);
      if (activitiesRes.status === 200) {
        setActivities(activitiesRes.data);
      }
    };

    getActivities();
  }, []);

  if (activities === undefined) {
    return (
      <Container style={{ paddingTop: 30 }} maxWidth="sm">
        <Grid
          container
          spacing={2}
          alignContent="center"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="left"
              style={{ fontWeight: "bolder" }}
            >
              Activity Journal
            </Typography>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "20vh" }}
          >
            <Grid item xs={3}>
              <CircularProgress
                style={{ color: theme.palette.primary.main, margin: "auto" }}
              ></CircularProgress>{" "}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    return (
      <>
        <Container style={{ paddingTop: 30 }} maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                align="left"
                style={{ fontWeight: "bolder" }}
              >
                Activity Journal
              </Typography>
            </Grid>
            {activities.map((activity) => (
              <Activity key={activity.activity.id} activity={activity} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
}
