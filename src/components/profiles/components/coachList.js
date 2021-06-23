import React from "react";
import {
  Grid,
  Typography,
  CircularProgress,
  CssBaseline,
} from "@material-ui/core";

import { CoachCard } from "./profileCard";

import { theme } from "../profilesTheme";

export default function CoachesList({ coaches }) {
  if (coaches === undefined) {
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
      <Grid container spacing={2}>
        {coaches.length === 0 ? (
          <Grid item xs={12}>
            <Typography>No Coaches have been added yet</Typography>
          </Grid>
        ) : (
          coaches.map((coach) => <CoachCard key={coach._id} coach={coach} />)
        )}
      </Grid>
    );
  }
}
