import React, { useState, useEffect } from "react";
import paymentService from "../../services/paymentsService";
import {
  AppBar,
  Typography,
  Toolbar,
  CssBaseline,
  Container,
  Grid,
} from "@material-ui/core";
import PaymentCard from "./paymentCard";

import { theme } from "./paymentsTheme";

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
          <Container style={{ paddingTop: 30 }} maxWidth="sm">
            <Grid container spacing={2}>
              {payments.map((payment) => (
                <PaymentCard payment={payment} />
              ))}
            </Grid>
          </Container>
        </main>
      </CssBaseline>
    </>
  )
}

