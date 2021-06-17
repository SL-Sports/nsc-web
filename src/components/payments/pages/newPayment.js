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

import { CircularProgress, Card, Button } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { useStyles } from "../paymentsTheme";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import NavBar from "../../navbar";
import ProfileSearchAutoComplete from "../../rankings/components/profileSearchField";


export default function NewPayment() {
  const classes = useStyles();
  const { paymentID } = useParams();
  const [payment, setPayment] = useState("test");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState();
  const [profileID, setProfileID] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
  //   const getPayments = async () => {
  //     const paymentRes = await paymentService.getPaymentDetail(paymentID);
  //     if (paymentRes.status === 200) {
  //       console.log(paymentRes.data[0]);
  //       setPayment(paymentRes.data[0]);
  //       const innerPayment = paymentRes.data[0];
  //       setMonth(innerPayment.payment.month);
  //       setYear(innerPayment.payment.year);
  //       setProfileID(innerPayment.payment.profile._id);
  //       setPaymentType(innerPayment.payment.paymentType);
  //       setAmount(innerPayment.payment.amount);
  //     }
  //   };

  //   getPayments();
  }, []);


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

  const changeDeletionStatus = (event) => {
    setIsDeleted(!isDeleted);
    console.log(isDeleted);
  };

  const changeProfileid = (event) => {
    console.log(event._id);
    setProfileID(event._id);
    console.log(profileID);
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
      <>
        <NavBar backButtonEnabled title="Edit Payment" />
        <Container style={{ paddingTop: 30 }} maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              {" "}
              {/* Date/Time Picker */}
              <Card className={classes.card}>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/DD/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                        </MuiPickersUtilsProvider> */}
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.card}>
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
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card className={classes.card}>
                <TextField
                  color="primary"
                  required
                  id="standard-outlined"
                  label="Amount"
                  variant="outlined"
                  value={amount}
                  onChange={changeAmount}
                ></TextField>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Card className={classes.card}>
                <ProfileSearchAutoComplete
                  onSelect={changeProfileid}
                  defaultProfile={""}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                onClick={saveNewPayment}
                style={{ background: theme.palette.secondary.mainGradient }}
              >
                New Payment
              </Button>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}
