import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
} from "@material-ui/core";
import { Paper } from "@material-ui/core";

import { ProfileCard } from "./profileCard";

export function ProfileTableRow({ profile }) {
  return (
    <TableRow key={profile._id}>
      <TableCell>{profile.firstName}</TableCell>
      <TableCell>{profile.lastName}</TableCell>
      <TableCell>{profile.preferredName}</TableCell>
      <TableCell>{profile.profileType}</TableCell>
    </TableRow>
  );
}

export function ProfileTable({ profiles }) {
  return (
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
            <ProfileTableRow key={profile._id} profile={profile} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ProfileList({ profiles }) {
  return (
    <Grid container direction="column" spacing={2}>
      {profiles.map((profile) => (
        <Grid item key={profile._id} xs={12} sm={12} md={12}>
          <ProfileCard profile={profile} />
        </Grid>
      ))}
    </Grid>
  );
}
