import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Grid,
  CircularProgress,
  CssBaseline,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
// eslint-disable-next-line
import { ProfileForm } from "../components/profileForm";
import { editProfile, getProfile } from "../../../services/profileService";
import { theme } from "../profilesTheme";

import NavBar from "../../navbar";
export default function EditProfile() {
  const history = useHistory();
  const [profile, setProfile] = useState(undefined);
  const { profileID } = useParams();

  useEffect(() => {
    async function getProfileData() {
      const profileResponse = await getProfile(profileID);

      if (profileResponse.status === 200) {
        // If request is good get profile
        const profileList = profileResponse.data;
        setProfile(profileList[0].profile);
      } else {
        alert("Profile not found");
        history.replace("/profiles");
      }
    }

    getProfileData();
  }, [profileID, history, setProfile]);

  function onSubmit(profile) {
    editProfile(profile)
      .then((res) => {
        const id = res.data.profileInfo._id;
        history.replace("/profiles/" + id);
      })
      .catch((err) => console.error(err));
  }
  if (profile === undefined) {
    return (
      <>
        <CssBaseline>
          <NavBar
            title="Edit Profile"
            backButtonEnabled
            associationNameEnabled
          />

          <main>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={3}>
                <CircularProgress
                  style={{ color: theme.palette.primary.main, margin: "auto" }}
                ></CircularProgress>{" "}
              </Grid>
            </Grid>
          </main>
        </CssBaseline>
      </>
    );
  } else {
    return (
      <>
        <NavBar backButtonEnabled title="Edit Profile" associationNameEnabled />
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
}
