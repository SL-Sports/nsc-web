import {
  Typography,
  Grid,
  Card,
  Avatar,
  IconButton,
  Hidden,
  CircularProgress,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { theme, useStyles } from "./rankingTheme";
import { deleteRanking } from "../../services/rankingService";

const Ranking = ({ ranking }) => {
  const classes = useStyles();
  const [deleting, setDeleting] = useState(false);
  const history = useHistory();

  const deleteItem = async () => {
    setDeleting(true);

    const deleteRes = await deleteRanking(ranking._id);
    setDeleting(false);
    if (deleteRes.status === 200) {
      window.location.reload();
    }
  };

  return (
    <Grid item key={ranking._id} xs={12} sm={12} md={12}>
      <Card className={classes.card}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item md={2} sm={1} xs={5}>
            <Typography
              variant="h4"
              align="left"
              style={{ fontWeight: "bolder" }}
            >
              {`#${ranking.ranking}`}
            </Typography>
          </Grid>

          <Hidden xsDown>
            <Grid item md={1} sm={2}>
              <Link
                to={`/profiles/${ranking.profile._id}`}
                style={{ textDecoration: "none" }}
              >
                <Avatar
                  src={ranking.profile.profilePicUrl}
                  style={{ width: 40, height: 40, float: "right" }}
                ></Avatar>
              </Link>
            </Grid>
          </Hidden>

          <Grid item md={7} sm={5} xs={7}>
            <Link
              to={`/profiles/${ranking.profile._id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography
                variant="h5"
                align="left"
                style={{ fontWeight: "bolder" }}
              >
                {`${ranking.profile.preferredName} ${ranking.profile.lastName}`}
              </Typography>
            </Link>
          </Grid>
          <Grid item md={1} sm={2} xs={6}>
            <IconButton
              aria-label="delete-ranking"
              size="medium"
              style={{ float: "right" }}
              disabled={deleting}
              onClick={deleteItem}
            >
              {deleting ? (
                <CircularProgress style={{ color: "red" }}></CircularProgress>
              ) : (
                <Delete style={{ color: "red" }} fontSize="medium"></Delete>
              )}
            </IconButton>
          </Grid>
          <Grid item md={1} sm={2} xs={6}>
            <IconButton
              color="primary"
              aria-label="edit-ranking"
              size="medium"
              style={{ float: "left" }}
              // onClick={}
            >
              <Edit fontSize="medium"></Edit>
            </IconButton>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Ranking;
