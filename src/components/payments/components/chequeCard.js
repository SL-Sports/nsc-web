import {
  Typography,
  Grid,
  Card,
  IconButton,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import moment from "moment";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
// import Checkbox from "@material-ui/core/Checkbox";
import { useStyles } from "../paymentsTheme";
import paymentsService from "../../../services/paymentsService";
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";

const ChequeCard = ({ cheque }) => {
  const classes = useStyles();
  const [editingMode, setEditingMode] = useState(false);

  const [chequeNumber, setChequeNumber] = useState(cheque.chequeNumber);
  const [chequeCollected, setChequeCollected] = useState(cheque.collected);

  const deleteCheque = async () => {
    const body = {
      id: cheque._id,
      isDeleted: true,
      chequeNumber: cheque.chequeNumber,
    };

    const deletedCheque = await paymentsService.editCheque(body);
    alert(deletedCheque.data.message);
  };

  const saveEditedCheque = async () => {
    const body = {
      id: cheque._id,
      isDeleted: false,
      chequeNumber: chequeNumber,
    };

    const editedCheque = await paymentsService.editCheque(body);
    setEditingMode(!editingMode);
    alert(editedCheque.data.message);
  };

  const changeChequeNumber = (event) => {
    setChequeNumber(event.target.value);
  };

  const editCheque = () => {
    setEditingMode(!editingMode);
  };

  const collectCheque = async () => {
    const body = {
      chequeId: cheque._id,
    };

    const collectedCheque = await paymentsService.collectCheque(body);
    setChequeCollected(true);
    alert(collectedCheque.data.message);
  };

  const getCollectionTime = (unixTime) => {
    let date = moment.unix(unixTime);
    return moment(date).format("MMMM Do YYYY h:mm A");
  };

  const getChequeCollectionMessage = () => {
    if (cheque.collected) {
      return "Collected at " + getCollectionTime(cheque.collectedAt);
    } else {
      return "Waiting for Collection";
    }
  };

  return (
    <Grid item sm={12}>
      <Card className={classes.card}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={8} sm={10}>
            {!editingMode && (
              <Typography
                variant="h5"
                style={{ fontWeight: "bolder" }}
                align="left"
              >
                # {chequeNumber}
              </Typography>
            )}
            {editingMode && (
              <TextField
                onChange={changeChequeNumber}
                value={chequeNumber}
              ></TextField>
            )}
          </Grid>
          <Grid item xs={4} sm={2}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <IconButton
                  onClick={deleteCheque}
                  size="small"
                  style={{ color: "red" }}
                >
                  <Delete />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                {!editingMode && (
                  <IconButton onClick={editCheque} size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                )}
                {editingMode && (
                  <IconButton
                    onClick={saveEditedCheque}
                    size="small"
                    color="primary"
                  >
                    <SendIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1} alignItems="center" justify="center">
              <Grid item xs={2}>
                {cheque.collected ? (
                  <CheckBox
                    fontSize="large"
                    style={{
                      width: 30,
                      height: 30,
                      color: "green",
                      float: "left",
                    }}
                  />
                ) : (
                  <CheckBoxOutlineBlank
                    fontSize="large"
                    style={{
                      width: 30,
                      height: 30,
                      color: "red",
                      float: "left",
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={10} sm={10}>
                <Typography align="justify">
                  {getChequeCollectionMessage()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1} alignItems="center" justify="center">
              <Grid item xs={2}>
                <Avatar
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  alt={
                    cheque.createdBy.preferredName +
                    " " +
                    cheque.createdBy.lastName
                  }
                  src={cheque.createdBy.profilePicUrl}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography align="left">
                  Created By{" "}
                  {cheque.createdBy.preferredName +
                    " " +
                    cheque.createdBy.lastName}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ChequeCard;
