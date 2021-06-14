import {
  Typography,
  Grid,
  Card,
  IconButton,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import React, { useState } from "react";
import { useStyles, theme } from "./nscTheme";
import { deleteAssociation } from "../../services/associationService";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";

const Association = ({ association, editAssociation, reloadAssociations }) => {
  const classes = useStyles();
  const history = useHistory();
  const [deleting, setDeleting] = useState(false);

  const deleteItem = async () => {
    setDeleting(true);

    const deleteRes = await deleteAssociation(association._id);
    if (deleteRes.status === 200) {
      await reloadAssociations();
    }
    setDeleting(false);
  };

  const goToAssociation = async () => {
    await Cookies.set("activeAssociation", association._id);
    history.push("/dashboard");
  };

  return (
    <Grid item key={association._id} xs={12} sm={12} md={12}>
      <Card className={classes.card}>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs={8} md={10} lg={10}>
            <Typography
              variant="h5"
              align="left"
              style={{ fontWeight: "bolder" }}
            >
              {association.name}
            </Typography>
          </Grid>
          <Grid item xs={2} md={1} lg={1}>
            <IconButton
              aria-label="edit-ranking"
              size="medium"
              style={{ float: "right", color: "red" }}
              onClick={() => deleteItem(association)}
              disabled={deleting}
            >
              {deleting ? (
                <CircularProgress style={{ color: "red" }}></CircularProgress>
              ) : (
                <Delete fontSize="medium"></Delete>
              )}
            </IconButton>
          </Grid>
          <Grid item xs={2} md={1} lg={1}>
            <IconButton
              color="secondary"
              aria-label="edit-ranking"
              size="medium"
              style={{ float: "right" }}
              onClick={() => editAssociation(association)}
            >
              <Edit fontSize="medium"></Edit>
            </IconButton>
          </Grid>
          {association.description.length > 0 && (
            <Grid item xs={12}>
              <Typography align="left">{association.description}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              style={{
                background: theme.palette.primary.mainGradient,
                color: "white",
                borderRadius: 20,
                fontWeight: "bolder",
                padding: 10,
              }}
              fullWidth
              onClick={goToAssociation}
            >
              <Typography variant="subtitle1" style={{ fontWeight: "bolder" }}>
                VIEW DASHBOARD
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Association;
