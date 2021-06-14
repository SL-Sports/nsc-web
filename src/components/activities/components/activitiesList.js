import React, { useState, useEffect } from "react";
import activityService from "../../../services/activityService";
import {
  AppBar,
  Typography,
  Toolbar,
  CssBaseline,
  Container,
  Grid,
} from "@material-ui/core";
import Activity from "./activityCard";

import { theme } from "../activityTheme";

const profileId = "60ac7a65658e534fb80b9f52";

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      const activitiesRes = await activityService.getActivities(profileId);
      if (activitiesRes.status === 200) {
        setActivities(activitiesRes.data);
      }
    };

    getActivities();
  }, []);

  return (
    <>
      <CssBaseline>
        <AppBar
          style={{ background: theme.palette.primary.mainGradient }}
          position="relative"
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Activities - Tiger Woods
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Container style={{ paddingTop: 30 }} maxWidth="sm">
            <Grid container spacing={2}>
              {activities.map((activity) => (
                <Activity key={activity.activity.id} activity={activity} />
              ))}
            </Grid>
          </Container>
        </main>
      </CssBaseline>
    </>
  );
}
