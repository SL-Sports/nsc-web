import React, { useEffect, useState } from "react";
import { Box, Container } from "@material-ui/core";
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import {
  // advancedSearchProfiles,
  searchProfiles,
} from "../../../services/profileService";
import {
  ProfileSearchForm,
  // ProfileAdvancedSearchForm,
} from "../components/profileSearchForm";
import { ProfileList } from "../components/profileList";
import { profileTypes } from "../profileTypes";

export default function ProfilesHome() {
  // Profile lists
  let [profiles, setProfiles] = useState([]);

  // Search form field
  let [query, setQuery] = useState("");
  let [profileTypeField, setProfileTypeField] = useState(profileTypes.ALL);
  // Form advanced filter fields
  // let [firstName, setFirstName] = useState("");
  // let [lastName, setLastName] = useState("");
  // let fields = [
  //   { field: "First Name", value: firstName, setter: setFirstName },
  //   { field: "Last Name", value: lastName, setter: setLastName },
  // ];

  // eslint-disable-next-line
  // async function updateProfilesAdvanced() {
  //   const profilesResponse = await advancedSearchProfiles(firstName, lastName);

  //   console.log(profilesResponse);
  //   if (profilesResponse.status === 200) {
  //     // If request is good get profiles
  //     const profiles = profilesResponse.data;

  //     // Set whole profiles list
  //     setProfiles(
  //       profiles.sort((p1, p2) => {
  //         return p1.profileType.localeCompare(p2.profileType);
  //       })
  //     );
  //   }
  // }

  useEffect(() => {
    async function updateProfiles() {
      console.log("Updating profiles...");

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

      console.log(profilesResponse);
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
      <h1>Profiles</h1>
      {/* <Box name="profile-advanced-search-form" my={2}>
        <ProfileAdvancedSearchForm fields={fields} />
      </Box> */}
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
    </>
  );
}
