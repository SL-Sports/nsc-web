import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  CssBaseline,
} from "@material-ui/core";

import {
  advancedSearchProfiles,
  getProfile,
} from "../../../services/profileService";
import { CoachList, ProfileList } from "../components/profileList";
import { useParams, useHistory } from "react-router-dom";
import { theme } from "../profilesTheme";
export default function AddCoaches() {
  const [otherCoaches, setOtherCoaches] = useState([]);
  const [profile, setProfile] = useState(undefined);
  const { profileID } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchOtherCoaches(sportID) {
      advancedSearchProfiles("", "", "", sportID, "COACH")
        .then((res) => {
          console.log(res);
          setOtherCoaches(res.data);
        })
        .catch((err) => console.error(err));
    }

    async function getProfileData() {
      const profileResponse = await getProfile(profileID);

      if (profileResponse.status === 200) {
        // If request is good get profile
        const profileList = profileResponse.data;
        setProfile(profileList[0]);
        fetchOtherCoaches(profileList[0].profile.sport._id);
      } else {
        alert("Profile not found");
        history.replace("/profiles");
      }
    }

    getProfileData();
  }, [history, profileID]);
  if (profile === undefined) {
    return (
      <>
        <CssBaseline>
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
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h4">
            Current Coaches for {profile.profile.preferredName}
          </Typography>
          <CoachList coaches={profile.coaches} />
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h4">
            Other {profile.profile.sport.name} Coaches
          </Typography>
          <ProfileList profiles={otherCoaches} />
        </Grid>
      </Grid>
    );
  }
}
