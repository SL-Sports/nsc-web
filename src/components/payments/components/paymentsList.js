import React from "react";
import {
  CssBaseline,
  Grid,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import PaymentCard from "./paymentCard";

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
              style={{ minHeight: "20vh" }}
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
        {payments.length === 0 ? (
          <Grid item xs={12}>
            <Typography>No Payments have been added yet</Typography>
          </Grid>
        ) : (
          payments.map((payment) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
              seeMoreEnabled={true}
              allowApproval={false}
              accountType={accountType}
            />
          ))
        )}
      </Grid>
    );
  }
}
