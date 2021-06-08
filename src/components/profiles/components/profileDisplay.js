import React from "react";
import { Paper, Grid, Box, Card, Avatar, Typography } from "@material-ui/core";
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import { getDOB } from "../../../services/dateService";

function title(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

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
    <Paper>
      <Box m={3} p={3}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Box my={2}>
              <Typography variant="h4">Profile Information</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Card raised style={{ borderRadius: 20 }}>
              <Box m={3}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={3} align="center">
                    <Avatar
                      src={profile.profilePicUrl}
                      style={{ width: 80, height: 80 }}
                    />
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <Typography variant="h4">
                      {title(profile.preferredName)} {title(profile.lastName)}
                    </Typography>
                    <Typography variant="subtitle1">
                      {title(profile.profileType)}
                    </Typography>
                    <Typography variant="subtitle2">
                      {profile.country} {title(profile.sport.name)}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={3} align="center">
                    <Typography>Age: {profile.age}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
          <Grid item>
            <Card style={{ borderRadius: 20 }}>
              <Box p={2} align="left">
                <Typography variant="h6">Secondary Information</Typography>
                <Typography>
                  Full Name: {profile.firstName} {profile.lastName}
                </Typography>
                <Typography>
                  Date of Birth: {getDOB(profile.dateOfBirth)}
                </Typography>
                <Typography variant="body1">
                  School: {profile.school}
                </Typography>
                <Typography>
                  City, Country: {profile.city}, {profile.country}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
