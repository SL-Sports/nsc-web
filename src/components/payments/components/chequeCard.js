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
      return "Not collected yet.";
    }
  };

  return (
    <Grid item sm={12}>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={8} sm={6} align="left">
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
          <Grid item xs={4} sm={6}>
            <Grid container spacing={1}>
              <Grid item xs={0} sm={8}>

              </Grid>
              <Grid item xs={5} sm={2}>
                {!editingMode && (
                  <IconButton onClick={editCheque}>
                    <EditIcon/>
                  </IconButton>
                )}
                {editingMode && (
                  <IconButton onClick={saveEditedCheque}>
                    <SendIcon />
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={5} sm={2}>
                <IconButton onClick={deleteCheque}>
                  <ClearIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item sm={2}>
              {cheque.collected ? (
                  <CheckBox
                    fontSize="large"
                    style={{
                      width: 25,
                      height: 25,
                      float: "left",
                      color: "green",
                    }}
                  />
                ) : (
                  <CheckBoxOutlineBlank
                    fontSize="large"
                    style={{
                      width: 25,
                      height: 25,
                      float: "left",
                      color: "red",
                    }}
                  />
                )}
            </Grid>
            <Grid item xs = {10} sm={10}>
              <Typography align="left">
                {getChequeCollectionMessage()}
              </Typography>
            </Grid>
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
                  align="justify"
                  style={{ color: "black", fontWeight: "bolder" }}
                >
                  {cheque.createdBy.preferredName +
                    " " +
                    cheque.createdBy.lastName}
                </Typography>
              </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default ChequeCard;
