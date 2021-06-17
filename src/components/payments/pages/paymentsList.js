import React from "react";
import { CssBaseline, Grid, CircularProgress } from "@material-ui/core";

import PaymentCard from "../components/paymentCard";

import { theme } from "../paymentsTheme";

export default function PaymentsList({ payments, accountType }) {
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
              style={{ minHeight: "80vh" }}
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
    );
  }
}
