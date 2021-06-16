import {
  Typography,
  Grid,
  Card,
  IconButton,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import { useStyles } from "../paymentsTheme";
import paymentsService from "../../../services/paymentsService";
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";

const ChequeCard = ({ cheque }) => {
  console.log(cheque);
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
    console.log(deletedCheque.data);
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
    console.log(editedCheque.data);
    alert(editedCheque.data.message);
  };

  const changeChequeNumber = (event) => {
    setChequeNumber(event.target.value);
    console.log(chequeNumber);
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
    console.log(collectedCheque.data);
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
      return "Not collected yet.";
    }
  };

  return (
    <Grid item sm={12}>
      <Card className={classes.card}>
        <Grid container spacing={1}>
          <Grid item sm={6} align="left">
            {!editingMode && (
              <Typography variant="h5"># {chequeNumber}</Typography>
            )}
            {editingMode && (
              <TextField
                onChange={changeChequeNumber}
                value={chequeNumber}
              ></TextField>
            )}
          </Grid>
          <Grid item sm={6}>
            <Grid item sm={1}>
              <IconButton onClick={deleteCheque}>
                <ClearIcon />
              </IconButton>
            </Grid>
            <Grid item sm={1}>
              {!editingMode && (
                <IconButton onClick={editCheque}>
                  <EditIcon />
                </IconButton>
              )}
              {editingMode && (
                <IconButton onClick={saveEditedCheque}>
                  <SendIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item sm={1}>
              <Checkbox checked={chequeCollected} onClick={collectCheque} />
            </Grid>
            <Grid item sm={6}>
              <Typography align="left">
                {getChequeCollectionMessage()}
              </Typography>
            </Grid>
            <Grid item sm={5}>
              <Grid container spacing={5}>
                <Grid item xs={2}>
                  <Avatar
                    alt={
                      cheque.createdBy.preferredName +
                      " " +
                      cheque.createdBy.lastName
                    }
                    src={cheque.createdBy.profilePicUrl}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    align="left"
                    style={{ color: "black", fontWeight: "bolder" }}
                  >
                    {cheque.createdBy.preferredName +
                      " " +
                      cheque.createdBy.lastName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ChequeCard;
