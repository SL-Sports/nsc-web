import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { CoachList } from "../components/profileList";

export default function AddCoaches({ profileHeader }) {
  console.log(profileHeader);
  const coaches = profileHeader.coaches;
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h4">
          Current Coaches for {profileHeader.profile.preferredName}
        </Typography>
        <CoachList coaches={coaches} />
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h4">
          Other {profileHeader.profile.sport.name} Coaches
        </Typography>
      </Grid>
    </Grid>
  );
}
