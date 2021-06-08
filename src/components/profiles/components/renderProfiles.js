import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { ProfileCard } from "./profileCard";

export function ProfileList({ profiles, editLinks = false }) {
  return (
    <Grid container direction="column" spacing={1}>
      {profiles.map((profile) => (
        <Grid item key={profile._id}>
          <Link to={profile._id} style={{ textDecoration: "none" }}>
            <ProfileCard profile={profile} editLinks={editLinks} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
