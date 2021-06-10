import {
  Typography,
  Grid,
  Card,
  Button,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { theme, useStyles } from "./rankingTheme";

const Ranking = ({ ranking }) => {
  const classes = useStyles();

  return (
    <Grid item key={ranking._id} xs={12} sm={12} md={12}>
      <Card className={classes.card}>
        <Grid container alignItems="center" justify="flex-start" spacing={2}>
          <Grid item md={2} sm={2} xs={3}>
            <Typography
              variant="h4"
              align="left"
              style={{ fontWeight: "bolder" }}
            >
              {`#${ranking.ranking}`}
            </Typography>
          </Grid>
          <Grid item md={1} sm={2} xs={3}>
            <Avatar
              src={ranking.profile.profilePicUrl}
              style={{ width: 40, height: 40, float: "right" }}
            ></Avatar>
          </Grid>
          <Grid item md={7} sm={4} xs={6}>
            <Typography
              variant="h5"
              align="left"
              style={{ fontWeight: "bolder" }}
            >
              {`${ranking.profile.preferredName} ${ranking.profile.lastName}`}
            </Typography>
          </Grid>
          <Grid item md={1} sm={2} xs={6}>
            <IconButton
              color="red"
              aria-label="delete-ranking"
              size="small"
              style={{ float: "right" }}
              // onClick={}
            >
              <Delete style={{ color: "red" }} fontSize="medium"></Delete>
            </IconButton>
          </Grid>
          <Grid item md={1} sm={2} xs={6}>
            <IconButton
              color="primary"
              aria-label="edit-ranking"
              size="small"
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
