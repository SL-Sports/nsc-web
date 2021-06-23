import React from "react";
import {
  CssBaseline,
  Grid,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import RankingCard from "./rankingCard";

import { theme } from "../rankingTheme";

export default function RankingsList({ rankings, forProfile }) {
  if (rankings === undefined) {
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
        {rankings.length === 0 ? (
          <Grid item xs={12}>
            <Typography>No Rankings have been added yet</Typography>
          </Grid>
        ) : (
          rankings.map((ranking) => (
            <RankingCard
              key={ranking._id}
              ranking={ranking}
              forProfile={forProfile}
            />
          ))
        )}
      </Grid>
    );
  }
}
