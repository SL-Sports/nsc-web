import React from "react";
import { Grid } from "@material-ui/core";

import { ProfileCard, CoachCard, StudentCard } from "./profileCard";

export function ProfileList({ profiles, editLinks = false }) {
  return (
    <Grid container spacing={1}>
      {profiles.map((profile) => (
        <Grid item xs={12} key={profile._id}>
          <ProfileCard profile={profile} editLink={editLinks} />
        </Grid>
      ))}
    </Grid>
  );
}

export function CoachList({ coaches }) {
  return (
    <Grid container spacing={1}>
      {coaches.map((coach) => (
        <Grid item xs={12} key={coach.coachProfile._id}>
          <CoachCard coach={coach} />
        </Grid>
      ))}
    </Grid>
  );
}

export function StudentList({ students }) {
  return (
    <Grid container spacing={1}>
      {students.map((student) => (
        <Grid item xs={12} key={student._id}>
          <StudentCard student={student} />
        </Grid>
      ))}
    </Grid>
  );
}
