import React, { useEffect, useState } from "react";
import { useParams, Switch, Route } from "react-router-dom";
import { CircularProgress, Container, Grid } from "@material-ui/core";
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import { getProfile } from "../../../services/profileService";
import { ProfileDisplay } from "../components/profileDisplay";
import EditProfile from "./editProfile";
import AddCoaches from "./addCoaches";
const status = {
  LOADING: "loading",
  NOTFOUND: "notfound",
  FOUND: "found",
};

export default function ProfileView() {
  const [profileStatus, setProfileStatus] = useState(status.LOADING);
  const [profileHeader, setProfileHeader] = useState();
  const { profileID } = useParams();

  useEffect(() => {
    async function updateProfileHeader() {
      const profileResponse = await getProfile(profileID);

      if (profileResponse.status === 200) {
        // If request is good get profile
        const profileList = profileResponse.data;
        setProfileHeader(profileList[0]);
        setProfileStatus(status.FOUND);
      } else {
        setProfileStatus(status.NOTFOUND);
      }
    }

    updateProfileHeader();
  }, [profileID]);

  if (profileStatus === status.LOADING) {
    return <Loader />;
  } else if (profileStatus === status.NOTFOUND) {
    return <h2>Invalid profile ID - this profile does not exist</h2>;
  } else {
    const profile = profileHeader.profile;
    return (
      <Switch>
        <Route path="/profiles/edit/:profileID">
          <EditProfile profile={profile} />
        </Route>
        <Route path="/profiles/coaches/:profileID">
          <AddCoaches profileHeader={profileHeader} />
        </Route>
        <Route path="/profiles/:profileID">
          <ProfileDisplay profileHeader={profileHeader} />
        </Route>
      </Switch>
    );
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
