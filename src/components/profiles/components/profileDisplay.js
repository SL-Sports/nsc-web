import React from "react";
import { Paper, Grid, Box, Card } from "@material-ui/core";
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

export function ProfileDisplay({ profile }) {
  return (
    <Grid container direction="row" align="flex-start" justify="space-around">
      <Grid item name="profile-details" xs={12} md={6}>
        <ProfileDetails profile={profile} />
      </Grid>
      <Grid item name="everything-else" xs={12} md={5}>
        <Paper>
          <Box mx={3}>
            <h1>Bruh</h1>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

function ProfileDetails({ profile }) {
  return (
    <Paper align="left">
      <Box mx={3}>
        <h1>Profile Details</h1>
      </Box>
    </Paper>
  );
}
