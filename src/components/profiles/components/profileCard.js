import React from "react";
import {
  Button,
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

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
  large: {
    width: 70,
    height: 70,
  },
}));

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
        <Avatar src={profile.profilePicUrl} className={classes.large} />
      </Grid>
      <Grid item>
        <Typography variant="h6" align="left">
          {capitalize(profile.preferredName)} {capitalize(profile.lastName)}
        </Typography>
        {/* <Typography className={classes.profileType} align="left">
          {profile.profileType}
        </Typography> */}
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
          <Typography className={classes.sport} align="right">
            {profile.sport.name} {capitalize(profile.profileType.toLowerCase())}
          </Typography>
        </Grid>
        <Grid item>
          <Button size="small">See More</Button>
        </Grid>
      </Grid>
    </>
  );
}

export function ProfileCard({ profile }) {
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
              <AgeSport profile={profile} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
