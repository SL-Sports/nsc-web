import React from "react";
import {
  Grid,
  Typography,
  CssBaseline,
  CircularProgress,
} from "@material-ui/core";

import { ProfileCard, CoachCard, StudentCard } from "./profileCard";
import { theme } from "../profilesTheme";

export function ProfileList({ profiles, editLinks = false }) {
  if (profiles === undefined) {
    return (
      <>
        <CssBaseline>
          <main>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "20vh" }}
            >
              <Grid item xs={3}>
                <CircularProgress
                  style={{ color: theme.palette.primary.main, margin: "auto" }}
                ></CircularProgress>{" "}
              </Grid>
            </Grid>
          </main>
        </CssBaseline>
      </>
    );
  } else {
    return (
      <Grid container spacing={1}>
        {profiles.length === 0 ? (
          <Grid item xs={12}>
            <Typography>No profiles have been added yet</Typography>
          </Grid>
        ) : (
          profiles.map((profile) => (
            <Grid item xs={12} key={profile._id}>
              <ProfileCard profile={profile} editLink={editLinks} />
            </Grid>
          ))
        )}
      </Grid>
    );
  }
}

export function CoachList({ coaches }) {
  return (
    <Grid container spacing={1}>
      {coaches.length === 0 ? (
        <Grid item xs={12}>
          <Typography>No coaches have been added yet</Typography>
        </Grid>
      ) : (
        coaches.map((coach) => (
          <Grid item xs={12} key={coach._id}>
            <CoachCard coach={coach} />
          </Grid>
        ))
      )}
    </Grid>
  );
}

export function StudentList({ students }) {
  return (
    <Grid container spacing={1}>
      {students.length === 0 ? (
        <Grid item xs={12}>
          <Typography>No students have been added yet</Typography>
        </Grid>
      ) : (
        students.map((student) => (
          <Grid item xs={12} key={student._id}>
            <StudentCard student={student} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
