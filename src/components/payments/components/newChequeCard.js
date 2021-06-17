import {
  Grid,
  Card,
  IconButton,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useStyles } from "../paymentsTheme";
import paymentsService from "../../../services/paymentsService";
import React, { useState } from "react";
import authService from "../../../services/authService";

const NewChequeCard = ({ paymentID, reload }) => {
  const classes = useStyles();
  const [chequeNum, setChequeNum] = useState("");
  const [saving, setSaving] = useState(false);
  const changeCheque = (event) => {
    setChequeNum(event.target.value);
  };

  const sendCheque = async () => {
    setSaving(true);
    let profileID = await authService.getProfileID();
    const body = {
      payment: paymentID,
      chequeNumber: chequeNum,
      createdBy: profileID,
    };

    const newCheque = await paymentsService.newCheque(body);
    await reload();
    setSaving(false);
    setChequeNum("");
    if (newCheque.status !== 200) {
      alert(newCheque.data.message);
    }
  };

  return (
    <Card className={classes.card}>
      <Grid container spacing={1}>
        <Grid item xs={10} sm={11}>
          <TextField
            onChange={changeCheque}
            color="secondary"
            value={chequeNum}
            label="New Cheque Number"
            align="left"
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={2} sm={1}>
          {saving ? (
            <CircularProgress color="primary"></CircularProgress>
          ) : (
            <IconButton onClick={sendCheque} color="primary" disabled={saving}>
              <SendIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default NewChequeCard;
