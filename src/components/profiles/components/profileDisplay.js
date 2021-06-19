import React from "react";
import { Grid, Box, Card, Avatar, Typography, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import { getDOB } from "../../../services/dateService";
import { ProfileList } from "./profileList";
import NavBar from "../../navbar";

function title(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function ProfileDisplay({ profileHeader }) {
  const profile = profileHeader.profile;
  return (
    <>
      <NavBar backButtonEnabled title={`${profile.preferredName}'s Profile`} />
      <Grid
        container
        direction="row"
        align="center"
        justify="space-around"
        spacing={2}
      >
        <Grid item name="profile-details" xs={12}>
          <ProfileDetails profile={profile} />
        </Grid>
        <Grid item name="coaches-students" xs={12} md={5}>
          <Box m={3} p={3}>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <Typography variant="h4">
                  {(profile.profileType === "ATHLETE" && "Coaches") ||
                    "Students"}
                </Typography>
              </Grid>
              {profile.profileType === "ATHLETE" && (
                <Grid item>
                  <Link to={"/profiles/coaches/" + profile._id}>
                    <Add color="primary" fontSize="large" />
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box>
          <CoachesStudentsList profileHeader={profileHeader} />
        </Grid>
        <Grid item name="rankings" xs={12} md={5}>
          <Box m={3} p={3}>
            <Typography variant="h4" align="left">
              Rankings
            </Typography>
          </Box>
        </Grid>
        <Grid item name="activities" xs={12} md={5}>
          <Box m={3} p={3}>
            <Typography variant="h4" align="left">
              Activities
            </Typography>
          </Box>
        </Grid>
        <Grid item name="payments" xs={12} md={5}>
          <Box m={3} p={3}>
            <Typography variant="h4" align="left">
              Payments
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

function ProfileDetails({ profile }) {
  return (
    <Box m={3} p={3}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">Profile Information</Typography>
        </Grid>
        <Grid item>
          <Card raised style={{ borderRadius: 20 }}>
            <Box m={3}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={3} align="center">
                  <Avatar
                    src={profile.profilePicUrl}
                    style={{ width: 80, height: 80 }}
                  />
                </Grid>
                <Grid item xs={8} md={6}>
                  <Typography variant="h4">
                    {profile.preferredName} {profile.lastName}
                  </Typography>
                  <Typography variant="subtitle1">
                    {title(profile.profileType)}
                  </Typography>
                  <Typography variant="subtitle2">
                    {profile.country} {profile.sport.name}
                  </Typography>
                </Grid>
                <Grid item xs={4} md={3} align="center">
                  <Typography>Age: {profile.age}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
        <Grid item>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Link
                to={`/profiles/edit/${profile._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="secondary">
                  Edit Profile
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Invite
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Card style={{ borderRadius: 20 }}>
            <Box p={2} align="left">
              <Typography variant="h6">Secondary Information</Typography>
              <Typography>
                Full Name: {profile.firstName} {profile.lastName}
              </Typography>
              <Typography>
                Date of Birth: {getDOB(profile.dateOfBirth)}
              </Typography>
              <Typography variant="body1">School: {profile.school}</Typography>
              <Typography>
                City, Country: {profile.city}, {profile.country}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function CoachesStudentsList({ profileHeader }) {
  const profile = profileHeader.profile;

  if (profile.profileType === "ATHLETE") {
    let coaches = profileHeader.coaches;
    coaches = coaches
      .filter((coach) => coach.activeStatus === "ACTIVE")
      .map((coach) => coach.coachProfile);
    return <ProfileList profiles={coaches} />;
  } else {
    let students = profileHeader.students;
    students = students
      .filter((student) => student.activeStatus === "ACTIVE")
      .map((student) => student.athleteProfile);
    return <ProfileList profiles={students} />;
  }
}
