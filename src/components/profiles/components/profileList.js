import React from "react";
import { Grid } from "@material-ui/core";

import { ProfileCard } from "./profileCard";

export function ProfileList({ profiles, editLinks = false }) {
  return (
    <Grid container direction="column" spacing={1}>
      {profiles.map((profile) => (
        <Grid item key={profile._id}>
          <ProfileCard profile={profile} editLink={editLinks} />
        </Grid>
      ))}
    </Grid>
  );
}
