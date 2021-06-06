import React, { useState, useEffect } from "react";
import activityService from "../../services/activityService";
import { useParams } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  CssBaseline,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@material-ui/core";
import COLORS from "../../colors";
import { theme, useStyles } from "./activityTheme";
import CoachApprovalCard from "./coachApprovalCard";

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
        <CssBaseline>
          <AppBar
            style={{ background: theme.palette.primary.mainGradient }}
            position="relative"
          >
            <Toolbar>
              <Link to="/activities" style={{ color: "white", marginTop: 4 }}>
                <ArrowBack style={{ marginRight: 15 }} />
              </Link>
              <Typography variant="h6" color="inherit" noWrap>
                {activity.activity.title +
                  " - " +
                  activity.activity.activityType.activityType}
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            <Container style={{ paddingTop: 30 }} maxWidth="md">
              <CoachApprovalCard
                isApproved={activity.activity.isApproved}
                approvedBy={activity.activity.approvedBy}
                approvedAt={activity.activity.approvedAt}
                createdAt={activity.activity.createdAt}
              />
            </Container>
          </main>
        </CssBaseline>
      </>
    );
  }
}
