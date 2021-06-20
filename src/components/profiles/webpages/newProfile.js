import React from "react";
import { Paper, ThemeProvider, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { theme } from "../profilesTheme";
import { ProfileForm } from "../components/profileForm";
import { createProfile } from "../../../services/profileService";
import NavBar from "../../navbar";
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
        const id = res.data.profileInfo._id;
        history.replace("/profiles/" + id);
      })
      .catch((err) => console.error(err));
  }

  return (
    <ThemeProvider theme={theme}>
      <NavBar backButtonEnabled title="New Profile" />
      <Container maxWidth="md">
        {/* <Paper style={{ borderRadius: 20 }}> */}
        <ProfileForm profile={newProfile} onSubmit={onSubmit} />
        {/* </Paper> */}
      </Container>
    </ThemeProvider>
  );
}
