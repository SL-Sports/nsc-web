import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";

import { advancedSearchProfiles } from "../../../services/profileService";
import { CoachList, ProfileList } from "../components/profileList";
export default function AddCoaches({ profileHeader }) {
  console.log(profileHeader);

  const [otherCoaches, setOtherCoaches] = useState([]);
  const coaches = profileHeader.coaches;
  const sportID = profileHeader.profile.sport._id;

  useEffect(() => {
    async function fetchOtherCoaches() {
      advancedSearchProfiles("", "", "", sportID, "COACH")
        .then((res) => {
          console.log(res);
          setOtherCoaches(res.data);
        })
        .catch((err) => console.error(err));
    }

    fetchOtherCoaches();
  }, [sportID]);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h4">
          Current Coaches for {profileHeader.profile.preferredName}
        </Typography>
        <CoachList coaches={coaches} />
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h4">
          Other {profileHeader.profile.sport.name} Coaches
        </Typography>
        <ProfileList profiles={otherCoaches} />
      </Grid>
    </Grid>
  );
}
