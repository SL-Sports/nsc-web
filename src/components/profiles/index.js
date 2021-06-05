import React, { useEffect, useState } from "react";
import { Box, Paper } from "@material-ui/core";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
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

function ProfileRow(props) {
  const profile = props.profile;

  return (
    <TableRow key={profile._id}>
      <TableCell>{profile.firstName}</TableCell>
      <TableCell>{profile.lastName}</TableCell>
      <TableCell>{profile.preferredName}</TableCell>
      <TableCell>{profile.profileType}</TableCell>
    </TableRow>
  );
}

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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Preferred Name</TableCell>
                <TableCell>Profile Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profiles.map((profile) => (
                <ProfileRow key={profile._id} profile={profile} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
