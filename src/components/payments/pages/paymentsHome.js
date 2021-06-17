import React, { useState, useEffect } from "react";
import paymentService from "../../../services/paymentsService";
import authService from "../../../services/authService";
import {
  CssBaseline,
  Container,
  Grid,
  CircularProgress,
  Fab,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import PaymentCard from "../components/paymentCard";

import { theme, useStyles } from "../paymentsTheme";

import { Link } from "react-router-dom";

import NavBar from "../../navbar";

export default function PaymentsHome() {
  const [payments, setPayments] = useState(undefined);
  const [associationName, setAssociationName] = useState("");
  const [accountType, setAccountType] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const loadData = async () => {
      setAssociationName(await authService.getAssociationName());
      let associationID = await authService.getActiveAssociationID();
      const paymentsRes = await paymentService.getPayments(associationID);
      const accountType = await authService.getAccountType();
      setAccountType(accountType);
      if (paymentsRes.status === 200) {
        setPayments(paymentsRes.data);
      }
    };
    loadData();
  }, []);

  if (payments === undefined) {
    return (
      <>
        <CssBaseline>
          <main>
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
          </main>
        </CssBaseline>
      </>
    );
  } else {
    return (
      <>
        <CssBaseline>
          <NavBar
            menuEnabled
            paymentsSelected
            title={`Payments - ${associationName}`}
            profilePicEnabled
          ></NavBar>
          <main>
            <Container style={{ paddingTop: 30 }} maxWidth="md">
              <Grid container spacing={2}>
                {payments.map((payment) => (
                  <PaymentCard
                    key={payment.payment.id}
                    payment={payment}
                    seeMoreEnabled={true}
                    allowApproval={false}
                    accountType={accountType}
                  />
                ))}
              </Grid>
            </Container>
            {accountType === "NSC_ADMIN" && (
              <Link to={"payments/new"}>
                <Fab aria-label="add" className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Link>
            )}
          </main>
        </CssBaseline>
      </>
    );
  }
}
