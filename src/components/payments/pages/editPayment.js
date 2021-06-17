import React, { useState, useEffect } from "react";
import paymentService from "../../../services/paymentsService";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

import { theme } from "../paymentsTheme";

import { CircularProgress, Button } from "@material-ui/core";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import NavBar from "../../navbar";
import ProfileSearchAutoComplete from "../../rankings/components/profileSearchField";

export default function EditPayment() {
  const { paymentID } = useParams();
  const [payment, setPayment] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const [paymentPeriod, setPaymentPeriod] = useState(new Date());

  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState(undefined);
  const [saving, setSaving] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const getPayments = async () => {
      const paymentRes = await paymentService.getPaymentDetail(paymentID);
      if (paymentRes.status === 200) {
        if (paymentRes.data.length === 0) {
          history.replace("/payments/" + paymentID);
        } else {
          setPayment(paymentRes.data[0]);
          setProfile(paymentRes.data[0].payment.profile);
          setAmount(paymentRes.data[0].payment.amount);
          setPaymentType(paymentRes.data[0].payment.paymentType);
          let stringDate = `${paymentRes.data[0].payment.month}-${paymentRes.data[0].payment.year}`;
          setPaymentPeriod(moment(stringDate, "MMM-yyyy").toDate());
        }
      }
    };

    getPayments();
  }, [history, paymentID]);

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
    console.log(paymentType);
  };

  const saveEditedPayment = async () => {
    setSaving(true);
    let month = moment(paymentPeriod).format("MMM").toUpperCase();
    let year = moment(paymentPeriod).format("yyyy");
    const paymentInfo = {
      month: month,
      year: parseInt(year),
      profileID: profile._id,
      amount: parseInt(amount),
      paymentType: paymentType,
      paymentID: paymentID,
    };
    const saveRes = await paymentService.editPayment(paymentInfo);
    setSaving(false);
    alert(saveRes.data.message);
    if (saveRes.status === 200) {
      history.replace("/payments");
    }
  };

  if (payment === undefined) {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <CircularProgress
              style={{ color: theme.palette.primary.main, margin: "auto" }}
            ></CircularProgress>{" "}
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <NavBar backButtonEnabled title="Edit Payment" />
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
                defaultProfile={payment.payment.profile}
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
                onClick={saveEditedPayment}
                disabled={saving}
              >
                {saving ? (
                  <CircularProgress
                    style={{ color: "white" }}
                  ></CircularProgress>
                ) : (
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bolder" }}
                  >
                    SAVE PAYMENT REQUEST
                  </Typography>
                )}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    );
  }
}
