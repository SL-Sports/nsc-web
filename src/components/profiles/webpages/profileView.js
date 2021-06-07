import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Container, Grid } from "@material-ui/core";
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import { getProfile } from "../../../services/profileService";
import { ProfileDisplay } from "../components/profileDisplay";

const status = {
  LOADING: "loading",
  NOTFOUND: "notfound",
  FOUND: "found",
};

export default function ProfileView() {
  const [profileStatus, setProfileStatus] = useState(status.LOADING);
  const [profile, setProfile] = useState();
  const { profileID } = useParams();

  useEffect(() => {
    async function updateProfile() {
      console.log("Fetching profile: " + profileID);
      const profileResponse = await getProfile(profileID);
      console.log(profileResponse);
      if (profileResponse.status === 200) {
        // If request is good get profile
        const profileList = profileResponse.data;
        setProfile(profileList[0].profile);
        setProfileStatus(status.FOUND);
      } else {
        setProfileStatus(status.NOTFOUND);
      }
    }

    updateProfile();
  }, [profileID]);

  if (profileStatus === status.LOADING) {
    return <Loader />;
  } else if (profileStatus === status.NOTFOUND) {
    return <h2>Invalid profile ID - this profile does not exist</h2>;
  } else {
    return <ProfileDisplay profile={profile} />;
  }
}

function Loader() {
  return (
    <Container>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </Container>
  );
}
