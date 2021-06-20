import React, { useState, useEffect } from "react";
import paymentService from "../../../services/paymentsService";
import authService from "../../../services/authService";
import { CssBaseline, Container, Fab } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import { useStyles } from "../paymentsTheme";

import { Link } from "react-router-dom";

import NavBar from "../../navbar";
import PaymentsList from "../components/paymentsList";

export default function PaymentsHome() {
  const [payments, setPayments] = useState(undefined);
  const [accountType, setAccountType] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const loadData = async () => {
      let associationID = await authService.getActiveAssociationID();
      const paymentsRes = await paymentService.getPayments(associationID);
      const accountType = await authService.getAccountType();
      setAccountType(accountType);
      if (paymentsRes.status === 200) {
        setPayments(paymentsRes.data.reverse());
      }
    };
    loadData();
  }, []);

  return (
    <>
      <CssBaseline>
        <NavBar
          menuEnabled
          paymentsSelected
          title={"Payments"}
          profilePicEnabled
          associationNameEnabled
        ></NavBar>
        <main>
          <Container maxWidth="md">
            <PaymentsList payments={payments} accountType={accountType} />
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
