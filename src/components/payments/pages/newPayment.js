import React, { useState, useEffect } from "react";
import paymentService from "../../../services/paymentsService";
import {
  AppBar,
  Typography,
  Toolbar,
  CssBaseline,
  Container,
  Grid,
  Fab,
  TextField,
  MenuItem,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import PaymentCard from "../components/paymentCard";

import { theme } from "../paymentsTheme";

import PaymentDetail from "./paymentDetail";

import { Card, Button } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { useStyles } from "../paymentsTheme";
import NavBar from "../../navbar";

const profileId = "60a7f13a8ae2f8ad47c5cd1a";

export default function NewPayment() {
  useEffect(() => {
    setProfileID("60ac8513ab2c3100155367bd");
  }, []);

  const [month, setMonth] = useState("");
  const [year, setYear] = useState();
  const [profileID, setProfileID] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState(0);

  const months = [
    {
      value: "JAN",
      label: "January",
    },
    {
      value: "FEB",
      label: "February",
    },
    {
      value: "MAR",
      label: "March",
    },
    {
      value: "APR",
      label: "April",
    },
    {
      value: "MAY",
      label: "May",
    },
    {
      value: "JUN",
      label: "June",
    },
    {
      value: "JUL",
      label: "July",
    },
    {
      value: "AUG",
      label: "August",
    },
    {
      value: "SEP",
      label: "September",
    },
    {
      value: "OCT",
      label: "October",
    },
    {
      value: "NOV",
      label: "November",
    },
    {
      value: "DEC",
      label: "December",
    },
  ];

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

  const changeMonth = (event) => {
    setMonth(event.target.value);
    console.log(month);
  };

  const changeYear = (event) => {
    setYear(event.target.value);
    console.log(year);
  };

  const changeType = (event) => {
    setPaymentType(event.target.value);
    console.log(paymentType);
  };

  const changeAmount = (event) => {
    setAmount(event.target.value);
    console.log(amount);
  };

  const saveNewPayment = async () => {
    const paymentInfo = {
      month: month,
      year: parseInt(year),
      profileID: profileID,
      amount: parseInt(amount),
      paymentType: paymentType,
    };
    const saveRes = await paymentService.sendNewPayment(paymentInfo);
    alert(saveRes.data);
    setMonth("");
    setYear();
    setProfileID("");
    setPaymentType("");
    setAmount(0);
  };

  return (
    <>
      <NavBar backButtonEnabled title="New Payment" />
      <Container style={{ paddingTop: 30 }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Card
              style={{
                background: theme.palette.secondary.mainGradient,
                height: "100%",
              }}
            >
              <Grid container spacing={2}>
                <Grid item sm={6} md={3}>
                  <TextField
                    color="primary"
                    required
                    id="standard-select-month"
                    select
                    label="Month"
                    name="month"
                    autoFocus
                    value={month}
                    helperText="Select the month."
                    onChange={changeMonth}
                  >
                    {months.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={6} md={3}>
                  <TextField
                    color="primary"
                    required
                    id="standard-outlined"
                    label="Year"
                    variant="outlined"
                    value={year}
                    onChange={changeYear}
                  ></TextField>
                </Grid>
                <Grid item sm={6} md={3}>
                  <TextField
                    color="primary"
                    required
                    select
                    label="Activity Type"
                    value={paymentType}
                    onChange={changeType}
                    name="paymentType"
                    helperText="Select the payment type."
                  >
                    {paymentTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={6} md={3}>
                  <TextField
                    color="primary"
                    required
                    id="standard-outlined"
                    label="Amount"
                    variant="outlined"
                    value={amount}
                    onChange={changeAmount}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item sm={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={saveNewPayment}
                  >
                    Submit Payment
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
