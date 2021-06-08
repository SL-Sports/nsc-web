import React, { useState, useEffect } from "react";
import activityService from "../../services/activityService";
import { Add, AddComment, ArrowBack, Close } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import {
  CircularProgress,
  CssBaseline,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  Button,
  IconButton,
  ThemeProvider,
  TextField,
} from "@material-ui/core";
import COLORS from "../../colors";
import { theme, useStyles } from "./activityTheme";
import CoachApprovalCard from "./coachApprovalCard";
import TimeCard from "./timeCard";
import ActivityComments from "./activityComments";

const profileId = "60ac7adc658e534fb80b9f55";

export default function ActivityDetail() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(undefined);
  const [approving, setApproving] = useState(false);
  const classes = useStyles();
  const [newCommentToggle, setNewCommentToggle] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [savingComment, setSavingComment] = useState(false);

  const [newMediaToggle, setNewMediaToggle] = useState(false);

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

  useEffect(() => {
    getActivity();
  }, []);

  const approve = async () => {
    setApproving(true);
    const approveRes = await activityService.approveActivity(
      activityId,
      profileId
    );
    alert(approveRes.data);
    setApproving(false);
    getActivity();
  };

  const saveComment = async () => {
    setSavingComment(true);
    const saveRes = await activityService.addComment(commentText, activityId);
    alert(saveRes.data);
    setSavingComment(false);
    setCommentText("");
    setNewCommentToggle(false);
    if (saveRes.status === 200) {
      getActivity();
    }
  };
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
      <ThemeProvider theme={theme}>
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
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <CoachApprovalCard
                    isApproved={activity.activity.isApproved}
                    approvedBy={activity.activity.approvedBy}
                    approvedAt={activity.activity.approvedAt}
                    createdAt={activity.activity.createdAt}
                  />
                </Grid>
                {!activity.activity.isApproved && (
                  <Grid item xs={12}>
                    <Button
                      style={{
                        background: theme.palette.primary.mainGradient,
                        color: "white",
                        borderRadius: 20,
                        fontWeight: "bolder",
                      }}
                      fullWidth
                      onClick={approve}
                    >
                      {approving ? (
                        <CircularProgress
                          style={{ color: "white", padding: 8 }}
                        ></CircularProgress>
                      ) : (
                        "APPROVE ACTIVITY"
                      )}
                    </Button>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={2}>
                      <TimeCard
                        labelText="START TIME"
                        time={activity.activity.startTime}
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <TimeCard
                        labelText="END TIME"
                        time={activity.activity.endTime}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Card className={classes.card}>
                        <Typography align="left">
                          {activity.activity.description}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          paddingLeft: 10,
                          paddingRight: 15,
                          paddingBottom: 15,
                        }}
                        alignContent="center"
                        alignItems="center"
                        justify="center"
                      >
                        <Grid item xs={11}>
                          <Typography
                            variant="h5"
                            align="left"
                            style={{ fontWeight: "bolder" }}
                          >
                            Comments
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            color="primary"
                            aria-label="new-comment"
                            size="small"
                            onClick={() =>
                              setNewCommentToggle(!newCommentToggle)
                            }
                          >
                            {newCommentToggle ? (
                              <Close></Close>
                            ) : (
                              <AddComment></AddComment>
                            )}
                          </IconButton>
                        </Grid>
                        {newCommentToggle && (
                          <Grid item xs={10}>
                            <TextField
                              color="primary"
                              required
                              fullWidth
                              id="comment"
                              label="New Comment"
                              name="comment"
                              autoComplete="new comment"
                              autoFocus
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                            />
                          </Grid>
                        )}
                        {newCommentToggle && (
                          <Grid item xs={2}>
                            <Button
                              style={{
                                background: theme.palette.primary.mainGradient,
                                color: "white",
                                borderRadius: 20,
                                fontWeight: "bolder",
                              }}
                              fullWidth
                              onClick={saveComment}
                            >
                              {savingComment ? (
                                <CircularProgress
                                  style={{ color: "white" }}
                                ></CircularProgress>
                              ) : (
                                "SAVE"
                              )}
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                      {activity.comments.length === 0 ? (
                        <Typography>
                          No comments have been added to this activity yet.
                        </Typography>
                      ) : (
                        <ActivityComments comments={activity.comments} />
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={11}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            align="left"
                            style={{ fontWeight: "bolder" }}
                          >
                            Media
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            color="primary"
                            aria-label="new-media"
                            size="small"
                          >
                            <Add></Add>
                          </IconButton>
                        </Grid>
                      </Grid>
                      {activity.media.length === 0 ? (
                        <Typography>
                          No media has been added to this activity yet.
                        </Typography>
                      ) : (
                        <Card className={classes.card}>
                          <div>
                            {activity.media.map((media) => (
                              <div key={media._id} style={{ padding: 15 }}>
                                {media.mediaType === "VIDEO" ? (
                                  <video key={media._id} controls width="100%">
                                    <source
                                      key={media._id}
                                      src={media.urlToMedia}
                                    />
                                  </video>
                                ) : (
                                  <img
                                    key={media._id}
                                    src={media.urlToMedia}
                                    width="100%"
                                    alt=""
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </Card>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </main>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}
