import React, { useState, useEffect } from "react";
import activityService from "../../services/activityService";
import { useParams } from "react-router-dom";
import { CircularProgress, Grid } from "@material-ui/core";
import COLORS from "../../colors";
import { theme, useStyles } from "./activityTheme";

export default function ActivityDetail() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(undefined);

  useEffect(() => {
    const getActivity = async () => {
      const activityRes = await activityService.getActivityDetail(activityId);
      if (activityRes.status === 200) {
        if (activityRes.data.length === 0) {
          alert("Invalid activity ID. Please try again.");
        } else {
          setActivity(activityRes.data[0]);
          console.log(activityRes.data[0]);
        }
      }
    };

    getActivity();
  });
  if (activity === undefined) {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <CircularProgress
              style={{ color: theme.palette.primary.main, margin: "auto" }}
            ></CircularProgress>{" "}
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <h1>Activity Detail - {activity.activity.title}</h1>
      </>
    );
  }
}
