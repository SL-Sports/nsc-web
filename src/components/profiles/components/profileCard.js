import React from "react";
import { Link } from "react-router-dom";
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
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

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
    <>
      <Card className={classes.root}>
        <CardContent justify="center">
          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid item>
              <AvatarAndName profile={profile} />
            </Grid>
            <Grid item>
              <AgeSport profile={profile} editLink={editLink} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export function CoachCard({ coach }) {
  return (
    <>
      <Card>
        <CardContent justify="center">
          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid item>
              <AvatarAndName profile={coach.coachProfile} />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {coach.coachDescription}
              </Typography>
              <Typography variant="subtitle1">
                Start Date: {moment.unix(coach.startDate).format("DD/MM/yyyy")}
              </Typography>
              {coach.activeStatus !== "ACTIVE" && (
                <Typography variant="subtitle1">
                  End Date: {moment.unix(coach.endDate).format("DD/MM/yyyy")}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

function AvatarAndName({ profile }) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      alignItems="center"
      justify="flex-start"
    >
      <Grid item>
        <Avatar src={profile.profilePicUrl} className={classes.avatar} />
      </Grid>
      <Grid item>
        <Typography variant="h6" align="left">
          {profile.preferredName} {profile.lastName}
        </Typography>
        <Typography className={classes.school} align="left">
          {profile.school}
        </Typography>
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
              {profile.age}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box pb={1}>
            <Typography className={classes.sport} align="right">
              {profile.sport.name} {title(profile.profileType)}
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
