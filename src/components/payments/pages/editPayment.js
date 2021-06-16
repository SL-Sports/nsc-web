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
import ProfileSearchAutoComplete from "../../rankings/components/profileSearchField";

// const profileId = "60a7f13a8ae2f8ad47c5cd1a";

export default function EditPayment() {
  const classes = useStyles();
  const { paymentID } = useParams();
  const [payment, setPayment] = useState(undefined);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState();
  const [profileID, setProfileID] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(new Date.now())

  useEffect(() => {
    const getPayments = async () => {
      const paymentRes = await paymentService.getPaymentDetail(paymentID);
      if (paymentRes.status === 200) {
        console.log(paymentRes.data[0]);
        setPayment(paymentRes.data[0]);
        const innerPayment = paymentRes.data[0];
        setMonth(innerPayment.payment.month);
        setYear(innerPayment.payment.year);
        setProfileID(innerPayment.payment.profile._id);
        setPaymentType(innerPayment.payment.paymentType);
        setAmount(innerPayment.payment.amount);
        // setSelectedDate(Date(innerPayment.payment.month + innerPayment.payment.year));
      }
    };

    getPayments();
  }, []);

  // const handleDateChange = (date) => {
  //     setSelectedDate(date);
  //   };

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

  const saveEditedPayment = async () => {
    const paymentInfo = {
      month: month,
      year: parseInt(year),
      profileID: profileID,
      amount: parseInt(amount),
      paymentType: paymentType,
      paymentID: paymentID,
    };
    const saveRes = await paymentService.editPayment(paymentInfo);
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
      <Container style={{ paddingTop: 30 }} maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item sm={6}>
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
          <Grid item sm={6}>
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
          <Grid item sm={4}>
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
          <Grid item sm={8}>
            <Card className={classes.card}>
              <ProfileSearchAutoComplete
                onSelect={changeProfileid}
                defaultProfile={payment.payment.profile}
              />
            </Card>
          </Grid>
          <Grid item sm={12}>
            <Button
              variant="contained"
              onClick={saveEditedPayment}
              style={{ background: theme.palette.secondary.mainGradient }}
            >
              Edit Payment
            </Button>
          </Grid>
        </Grid>
      </Container>
      // <Container style={{ paddingTop: 30 }} maxWidth="lg">
      //     <Grid container spacing={2}>
      //         <Grid item sm={12}>
      //             <Card style={{ background: theme.palette.secondary.mainGradient,height: "100%",}}>
      //                 <Grid container spacing = {2}>
      //                     <Grid item sm={6} md={3}>
      //                         <TextField
      //                         color="primary"
      //                         required
      //                         id="standard-select-month"
      //                         select
      //                         label="Month"
      //                         name="month"
      //                         autoFocus
      //                         value={month}
      //                         helperText="Select the month."
      //                         onChange={changeMonth}>
      //                             {months.map((option) => (
      //                                 <MenuItem key={option.value} value = {option.value}>
      //                                     {option.label}
      //                                 </MenuItem>
      //                             ))}
      //                         </TextField>
      //                     </Grid>
      //                     <Grid item sm={6} md={3}>
      //                         <TextField
      //                         color="primary"
      //                         required
      //                         id="standard-outlined"
      //                         label="Year"
      //                         variant="outlined"
      //                         value = {year}
      //                         onChange={changeYear}
      //                         >

      //                         </TextField>
      //                     </Grid>
      //                     <Grid item sm={6} md={3}>
      //                         <TextField
      //                         color="primary"
      //                         required
      //                         select
      //                         label="Activity Type"
      //                         value={paymentType}
      //                         onChange={changeType}
      //                         name="paymentType"
      //                         helperText="Select the payment type.">
      //                             {paymentTypes.map((option) => (
      //                                 <MenuItem key={option.value} value = {option.value}>
      //                                     {option.label}
      //                                 </MenuItem>
      //                             ))}
      //                         </TextField>
      //                     </Grid>
      //                     <Grid item sm={6} md={3}>
      //                         <TextField
      //                         color="primary"
      //                         required
      //                         id="standard-outlined"
      //                         label="Amount"
      //                         variant="outlined"
      //                         value = {amount}
      //                         onChange={changeAmount}
      //                         >

      //                         </TextField>
      //                     </Grid>
      //                     <Grid item sm={6} md={3}>
      //                         <CheckBox
      //                         checked={!isDeleted}
      //                         color="secondary"
      //                         onClick={changeDeletionStatus}
      //                         />
      //                     </Grid>
      //                 </Grid>
      //                 <Grid container spacing={5}>
      //                     <Grid item sm={12}>
      //                         <Button
      //                         variant="contained"
      //                         color="primary"
      //                         onClick={saveEditedPayment}>
      //                             Edit Payment
      //                         </Button>
      //                     </Grid>
      //                 </Grid>
      //             </Card>
      //         </Grid>
      //     </Grid>
      // </Container>
    );
  }
}
