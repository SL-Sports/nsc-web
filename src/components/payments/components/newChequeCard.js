import { Grid, Card, IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useStyles } from "./paymentsTheme";
import paymentsService from "../../../services/paymentsService";
import React, { useState } from "react";

const profileID = "60ac7adc658e534fb80b9f55";

const NewChequeCard = ({ paymentID }) => {
  const classes = useStyles();
  const [chequeNum, setChequeNum] = useState("");

  const changeCheque = (event) => {
    setChequeNum(event.target.value);
  };

  const sendCheque = async () => {
    const body = {
      payment: paymentID,
      chequeNumber: chequeNum,
      createdBy: profileID,
    };

    const newCheque = await paymentsService.newCheque(body);
    setChequeNum("");
    alert(newCheque.data);
  };

  return (
    <Grid item sm={12}>
      <Card className={classes.card}>
        <Grid container spacing={1}>
          <Grid item sm={10}>
            <Grid container spacing={1}>
              <Grid item sm={2}></Grid>
              <Grid item sm={10} align="left">
                <TextField
                  onChange={changeCheque}
                  value={chequeNum}
                  label="New Cheque Number"
                  align="left"
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2}>
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <IconButton onClick={sendCheque}>
                  <SendIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default NewChequeCard;
