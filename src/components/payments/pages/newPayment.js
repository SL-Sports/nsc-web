import React, { useState } from "react";
import paymentService from "../../../services/paymentsService";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@material-ui/core";

import { theme } from "../paymentsTheme";

import { CircularProgress, Button, ThemeProvider } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import NavBar from "../../navbar";
import ProfileSearchAutoComplete from "../../rankings/components/profileSearchField";
import MomentUtils from "@date-io/moment";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

export default function NewPayment() {
  const [profile, setProfile] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState(new Date());

  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [saving, setSaving] = useState(false);

  const history = useHistory();

  const paymentTypes = [
    {
      value: "MONTHLY_STIPEND",
      label: "Monthly Stipend",
    },
    {
      value: "EQUIPMENT",
      label: "Equipment",
    },
    {
      value: "TRAVEL",
      label: "Travel",
    },
  ];

  const changeType = (event) => {
    setPaymentType(event.target.value);
  };

  const saveNewPayment = async () => {
    setSaving(true);
    let month = moment(paymentPeriod).format("MMM").toUpperCase();
    let year = moment(paymentPeriod).format("yyyy");
    const paymentInfo = {
      month: month,
      year: parseInt(year),
      profileID: profile._id,
      amount: parseInt(amount),
      paymentType: paymentType,
    };
    const saveRes = await paymentService.sendNewPayment(paymentInfo);
    setSaving(false);
    alert(saveRes.data.message);
    if (saveRes.status === 200) {
      history.replace("/payments");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar backButtonEnabled title="New Payment" />
      <Container style={{ paddingTop: 30 }} maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            {" "}
            {/* Date/Time Picker */}
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                margin="none"
                fullWidth
                id="payment-period-picker-dialog"
                format="MMMM, yyyy"
                color="secondary"
                views={["year", "month"]}
                label="Payment Period"
                value={paymentPeriod}
                onChange={(date) => setPaymentPeriod(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              color="secondary"
              required
              select
              label="Payment Type"
              fullWidth
              value={paymentType}
              onChange={changeType}
              name="paymentType"
              style={{ textAlign: "left" }}
            >
              {paymentTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="standard-number"
              label="Amount"
              fullWidth
              color="secondary"
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <ProfileSearchAutoComplete
              onSelect={(value) => setProfile(value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              style={{
                background: theme.palette.primary.mainGradient,
                color: "white",
                borderRadius: 20,
                fontWeight: "bolder",
                marginTop: 50,
                padding: 10,
              }}
              fullWidth
              onClick={saveNewPayment}
              disabled={saving}
            >
              {saving ? (
                <CircularProgress style={{ color: "white" }}></CircularProgress>
              ) : (
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bolder" }}
                >
                  CREATE PAYMENT REQUEST
                </Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
