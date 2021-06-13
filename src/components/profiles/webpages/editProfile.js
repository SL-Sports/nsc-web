import React from "react";
import { Paper, Box, Grid } from "@material-ui/core";

// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import { ProfileForm } from "../components/profileForm";
export default function EditProfile({ profile }) {
  function onSubmit(profile) {}

  return (
    <>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Paper style={{ borderRadius: 20 }}>
            <Box px={5} py={3}>
              <ProfileForm profile={profile} onSubmit={onSubmit} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
