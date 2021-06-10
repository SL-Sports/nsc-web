import React, { useState, useEffect } from "react";
import paymentService from "../../services/paymentsService";
import {
  AppBar,
  Typography,
  Toolbar,
  CssBaseline,
  Container,
  Grid,
  Fab,
} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';

import PaymentCard from "./paymentCard";

import { theme } from "./paymentsTheme";

import PaymentDetail from "./paymentDetail"

import { Link } from "react-router-dom";

import NewPayment from "./newPayment";

const profileId = "60a7f13a8ae2f8ad47c5cd1a";


export default function Payments() {
  const [payments, setPayments] = useState([]);
  
  useEffect(() => {
    const getPayments = async () => {
      const paymentsRes = await paymentService.getPayments(profileId);
      if (paymentsRes.status === 200) {
        setPayments(paymentsRes.data);

      }
    };

    getPayments(); 
  }, [])
  
  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

  return (
    <>
      <CssBaseline>
        <AppBar
          style={{ background: theme.palette.primary.mainGradient }}
          position="relative"
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Payments - Golf
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Container style={{ paddingTop: 30 }} maxWidth="lg">
            <Grid container spacing={2}>
              {payments.map((payment) => (
                <PaymentCard key = {payment.payment.id} payment={payment} seeMoreEnabled={true}/>
              ))}
            </Grid>
          </Container>
          <Link to={"payments-new"}>
            <Fab color="primary" aria-label="add" style = {fabStyle}>
                <AddIcon />
            </Fab>
          </Link>
        </main>
      </CssBaseline>
    </>
  )
}

