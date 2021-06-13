import React from "react";
import { Paper, Box, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import { ProfileForm } from "../components/profileForm";
import { createProfile } from "../../../services/profileService";

export default function NewProfile() {
  const history = useHistory();

  const newProfile = {
    firstName: "",
    lastName: "",
    preferredName: "",
    association: undefined,
    // TODO
    profilePicUrl: "",
    sport: undefined,
    age: 0,
    dateOfBirth: undefined,
    country: "",
    city: "",
    school: "",
    profileType: "",
  };

  function onSubmit(profile) {
    createProfile(profile)
      .then((res) => {
        console.log(res);
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
              <ProfileForm profile={newProfile} onSubmit={onSubmit} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
