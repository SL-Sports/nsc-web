import React, { useEffect, useState } from "react";
import { Box, Container, Fab, Tooltip, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
// eslint-disable-next-line
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";

import { searchProfiles } from "../../../services/profileService";
import { ProfileSearchForm } from "../components/profileSearchForm";
import { ProfileList } from "../components/profileList";
import { profileTypes } from "../profileTypes";
import { Link } from "react-router-dom";
import NavBar from "../../navbar/";
const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function ProfilesHome() {
  const classes = useStyles();

  // Profile lists
  let [profiles, setProfiles] = useState([]);

  // Search form field
  let [query, setQuery] = useState("");
  let [profileTypeField, setProfileTypeField] = useState(profileTypes.ALL);

  useEffect(() => {
    async function updateProfiles() {
      let profileType;
      switch (profileTypeField) {
        case profileTypes.ATHLETES:
          profileType = "ATHLETE";
          break;
        case profileTypes.COACHES:
          profileType = "COACH";
          break;
        default:
          profileType = undefined;
      }

      const profilesResponse = await searchProfiles(query, profileType);

      if (profilesResponse.status === 200) {
        // If request is good get profiles
        const profiles = profilesResponse.data;

        // Set whole profiles list
        setProfiles(
          profiles.sort((p1, p2) => {
            return p1.profileType.localeCompare(p2.profileType);
          })
        );
      }
    }

    updateProfiles();
  }, [query, profileTypeField]);

  return (
    <>
      <NavBar profilesSelected title={"Profiles Home"} menuEnabled></NavBar>
      <Box p={2}>
        <Typography variant="h3">Profiles</Typography>
      </Box>
      <Box name="profile-search-form" pb={4}>
        <ProfileSearchForm
          field="Search"
          query={query}
          setQuery={setQuery}
          profileTypeField={profileTypeField}
          setProfileTypeField={setProfileTypeField}
        />
      </Box>
      <Container maxWidth="sm">
        <Box name="profile-list">
          <ProfileList profiles={profiles} editLinks={true} />
        </Box>
      </Container>
      <Link to="/profiles/new">
        <Tooltip title="Create Profile/Invite">
          <Fab color="primary" className={classes.fab}>
            <Add />
          </Fab>
        </Tooltip>
      </Link>
    </>
  );
}
