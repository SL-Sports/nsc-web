import { Typography, Grid, Card, IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React from "react";
import { useStyles } from "./nscTheme";

const Sport = ({ sport, editSport }) => {
  const classes = useStyles();

  return (
    <Grid item key={sport._id} xs={12} sm={12} md={12}>
      <Card className={classes.card}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs={10}>
            <Typography
              variant="h5"
              align="left"
              style={{ fontWeight: "bolder" }}
            >
              {sport.name}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              color="primary"
              aria-label="edit-ranking"
              size="medium"
              style={{ float: "right" }}
              onClick={() => editSport(sport)}
            >
              <Edit fontSize="medium"></Edit>
            </IconButton>
          </Grid>
          {sport.description.length > 0 && (
            <Grid item xs={12}>
              <Typography align="left">{sport.description}</Typography>
            </Grid>
          )}
        </Grid>
      </Card>
    </Grid>
  );
};

export default Sport;
