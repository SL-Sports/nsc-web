import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  name: {
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
});

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
        <Avatar src={profile.profilePicUrl} />
      </Grid>
      <Grid item>
        <Typography variant="h5" align="left">
          {profile.preferredName}
        </Typography>
        <Typography className={classes.name} align="left">
          {profile.firstName} {profile.lastName}
        </Typography>
        <Typography className={classes.school} align="left">
          {profile.school}
        </Typography>
      </Grid>
    </Grid>
  );
}

function AgeSport({ profile }) {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="flex-end"
        justify="space-around"
      >
        <Grid item style={{ marginTop: "0" }}>
          <Box pt={0}>
            <Typography className={classes.age} align="right">
              {profile.age}
            </Typography>
          </Box>
        </Grid>
        {/* <Grid item>
        <Typography className={classes.city} align="right">
          {profile.city}
        </Typography>
      </Grid> */}
        <Grid item>
          <Typography className={classes.sport} align="right">
            {profile.sport.name}
          </Typography>
        </Grid>
      </Grid>
      <Typography>{profile.profileType}</Typography>
    </>
  );
}

export function ProfileCard({ profile }) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid item>
              <AvatarAndName profile={profile} />
            </Grid>
            <Grid item>
              <AgeSport profile={profile} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
