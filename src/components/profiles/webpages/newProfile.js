import React, { useState } from "react";
import { ThemeProvider, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { theme } from "../profilesTheme";
import { ProfileForm } from "../components/profileForm";
import { createProfile } from "../../../services/profileService";
import NavBar from "../../navbar";
export default function NewProfile() {
  const history = useHistory();
  const [saving, setSaving] = useState(false);

  const newProfile = {
    firstName: "",
    lastName: "",
    preferredName: "",
    association: undefined,
    profilePicUrl: "",
    sport: undefined,
    age: 0,
    dateOfBirth: undefined,
    country: "",
    city: "",
    school: "",
    profileType: "",
    eventNames: "",
    nic: "",
    address: "",
    contactNumber: "",
    occupation: "",
    bankAccountNo: "",
    bankBranch: "",
    bankName: "",
    club: "",
    category: "",
  };

  function onSubmit(profile) {
    createProfile(profile)
      .then((res) => {
        setSaving(false);
        const id = res.data.profileInfo._id;
        history.replace("/profiles/" + id);
      })
      .catch((err) => {
        setSaving(false);
        console.error(err);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <NavBar backButtonEnabled title="New Profile" associationNameEnabled />
      <Container maxWidth="md">
        <ProfileForm
          profile={newProfile}
          onSubmit={onSubmit}
          saving={saving}
          setSaving={setSaving}
        />
      </Container>
    </ThemeProvider>
  );
}
