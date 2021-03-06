import React from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { ArrowForwardIos, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { getAge } from "../../../services/dateService";

function title(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: 20,
  },
  name: {
    fontSize: 12,
  },
  profileType: {
    fontSize: 12,
  },
  age: {
    fontSize: 14,
  },
  school: {
    fontSize: 12,
    color: "gray",
  },
  city: {
    fontSize: 14,
  },
  sport: {
    fontSize: 14,
  },
  avatar: {
    width: 70,
    height: 70,
  },
  icon: {
    fontSize: 14,
  },
}));

export function ProfileCard({ profile, editLink = false }) {
  const classes = useStyles();
  return (
    <Link
      to={`/profiles/${profile._id}`}
      style={{ textTransform: "none", textDecoration: "none" }}
    >
      <Card className={classes.root}>
        <CardContent justify="center">
          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid item md={8} xs={12}>
              <AvatarAndName profile={profile} />
            </Grid>
            <Grid item md={4} xs={12}>
              <AgeSport profile={profile} editLink={editLink} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}

export function CoachCard({ coach }) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent justify="center">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item md={8} xs={12}>
            <Link
              to={`/profiles/${coach.coachProfile._id}`}
              style={{
                textTransform: "none",
                textDecoration: "none",
                color: "black",
              }}
            >
              <AvatarAndName
                profile={coach.coachProfile}
                isCoach
                coachDescription={coach.coachDescription}
              />
            </Link>
          </Grid>
          <Grid item md={3} xs={8}>
            <Link
              to={`/profiles/${coach.coachProfile._id}`}
              style={{
                textTransform: "none",
                textDecoration: "none",
                color: "black",
              }}
            >
              <Typography variant="subtitle1" align="right">
                Start Date: {moment.unix(coach.startDate).format("DD/MM/yyyy")}
              </Typography>
              {coach.activeStatus !== "ACTIVE" && (
                <Typography variant="subtitle1" align="right">
                  End Date: {moment.unix(coach.endDate).format("DD/MM/yyyy")}
                </Typography>
              )}
            </Link>
          </Grid>
          <Grid item md={1} xs={4}>
            <IconButton
              color="primary"
              aria-label="edit-ranking"
              size="medium"
              style={{ float: "right" }}
              onClick={() =>
                history.push(`/profiles/coaches/edit/${coach._id}`)
              }
            >
              <Edit fontSize="medium"></Edit>
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export function StudentCard({ student }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.root}>
      <CardContent justify="center">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item md={8} xs={12}>
            <Link
              to={`/profiles/${student.athleteProfile._id}`}
              style={{
                textTransform: "none",
                textDecoration: "none",
                color: "black",
              }}
            >
              <AvatarAndName
                profile={student.athleteProfile}
                isCoach
                coachDescription={student.coachDescription}
              />
            </Link>
          </Grid>
          <Grid item md={3} xs={8}>
            <Link
              to={`/profiles/${student.athleteProfile._id}`}
              style={{
                textTransform: "none",
                textDecoration: "none",
                color: "black",
              }}
            >
              <Typography variant="subtitle1" align="right">
                Start Date:{" "}
                {moment.unix(student.startDate).format("DD/MM/yyyy")}
              </Typography>
              {student.activeStatus !== "ACTIVE" && (
                <Typography variant="subtitle1" align="right">
                  End Date: {moment.unix(student.endDate).format("DD/MM/yyyy")}
                </Typography>
              )}
            </Link>
          </Grid>
          <Grid item md={1} xs={4}>
            <IconButton
              color="primary"
              aria-label="edit-ranking"
              size="medium"
              style={{ float: "right" }}
              onClick={() =>
                history.push(`/profiles/coaches/edit/${student._id}`)
              }
            >
              <Edit fontSize="medium"></Edit>
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function AvatarAndName({ profile, isCoach, coachDescription }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      alignItems="center"
      justify="flex-start"
    >
      <Grid item xs={12} md={2}>
        <Avatar src={profile.profilePicUrl} className={classes.avatar} />
      </Grid>
      <Grid item xs={12} md={10}>
        <Typography variant="h6" align="left">
          {profile.preferredName} {profile.lastName}
        </Typography>
        {isCoach ? (
          <Typography className={classes.school} align="left">
            {coachDescription}
          </Typography>
        ) : (
          <Typography className={classes.school} align="left">
            {profile.sport.name} {title(profile.profileType)}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

function AgeSport({ profile, editLink = false }) {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="flex-end"
        justify="space-between"
      >
        <Grid item>
          <Box pt={0}>
            <Typography className={classes.age} align="right">
              Age: {getAge(profile.dateOfBirth)}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box pb={1}>
            <Typography className={classes.sport} align="right">
              {profile.school}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justify="flex-end" spacing={1}>
            {editLink && (
              <Grid item>
                <Link to={"/profiles/edit/" + profile._id}>
                  <Tooltip title="Edit">
                    <IconButton size="small">
                      <Edit className={classes.icon} />
                    </IconButton>
                  </Tooltip>
                </Link>
              </Grid>
            )}
            <Grid item>
              <Link to={`/profiles/${profile._id}`}>
                <Tooltip title="See More">
                  <IconButton size="small">
                    <ArrowForwardIos className={classes.icon} />
                  </IconButton>
                </Tooltip>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
