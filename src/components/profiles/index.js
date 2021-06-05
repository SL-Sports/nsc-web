import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import {
  // advancedSearchProfiles,
  searchProfiles,
} from "../../services/profileService";
import {
  ProfileSearchForm,
  // ProfileAdvancedSearchForm,
} from "./profileSearchForm";
import { ProfileTable } from "./renderProfiles";

export default function Profiles() {
  // Profile lists
  let [profiles, setProfiles] = useState([]);

  // Search form field
  let [query, setQuery] = useState("");

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
      const profilesResponse = await searchProfiles(query);

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
  }, [query]);

  return (
    <>
      <h1>Profiles</h1>
      {/* <Box name="profile-advanced-search-form" my={2}>
        <ProfileAdvancedSearchForm fields={fields} />
      </Box> */}
      <Box name="profile-search-form" my={2}>
        <ProfileSearchForm field="Search" value={query} setter={setQuery} />
      </Box>
      <Box name="profile-list">
        <ProfileTable profiles={profiles} />
      </Box>
    </>
  );
}
