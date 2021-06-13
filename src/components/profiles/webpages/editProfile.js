import React from "react";
import { Paper, Box, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import { ProfileForm } from "../components/profileForm";
import { editProfile } from "../../../services/profileService";

export default function EditProfile({ profile }) {
  const history = useHistory();

  function onSubmit(profile) {
    editProfile(profile)
      .then((res) => {
        const id = res.data.profileInfo._id;
        history.push("/" + id);
      })
      .catch((err) => console.error(err));
  }

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
