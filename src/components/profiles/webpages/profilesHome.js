import React, { useEffect, useState } from "react";
import {
  ThemeProvider,
  Container,
  Fab,
  Tooltip,
  Grid,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { searchProfiles } from "../../../services/profileService";
import { ProfileSearchForm } from "../components/profileSearchForm";
import { ProfileList } from "../components/profileList";
import { Link } from "react-router-dom";
import NavBar from "../../navbar/";
import { useStyles, theme } from "../profilesTheme";

export default function ProfilesHome() {
  const classes = useStyles();
  // Profile lists
  let [profiles, setProfiles] = useState(undefined);

  // Search form field
  let [query, setQuery] = useState("");

  useEffect(() => {
    async function updateProfiles() {
      const profilesResponse = await searchProfiles(query);

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
  }, [query]);

  return (
    <ThemeProvider theme={theme}>
      <NavBar
        profilesSelected
        title={"Profiles"}
        associationNameEnabled
        menuEnabled
      ></NavBar>

      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProfileSearchForm
              field="Who are you looking for?"
              query={query}
              setQuery={setQuery}
            />
          </Grid>
          <Grid item xs={12}>
            <ProfileList profiles={profiles} editLinks={true} />
          </Grid>
        </Grid>
      </Container>
      <Link to="/profiles/new">
        <Tooltip title="Create Profile/Invite">
          <Fab color="primary" className={classes.fab}>
            <Add />
          </Fab>
        </Tooltip>
      </Link>
    </ThemeProvider>
  );
}
