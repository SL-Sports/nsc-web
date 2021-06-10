import React, { useState, useEffect } from "react";
import paymentService from "../../services/paymentsService";
import { Add, AddComment, ArrowBack } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import {
  CircularProgress,
  CssBaseline,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  Button,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";
import COLORS from "../../colors";
import { theme, useStyles } from "./paymentsTheme";
import PaymentCard from "./paymentCard";
import axios from "axios";

const baseUrl = "https://slsports.anuda.me/payment";

const token = "q4DRq9lPhYGwgnlTJYm9B4yLG7udKpNHNmW2jocy5m2cWqz546A3yookPfv9hlwu0Gcw9ge1KH1T3Agjrjo3Esb3B6RY57zHxJptoidoGJkWZhOm1IIYvyYqSnA6WIdh";

const profileId = "60a7f13a8ae2f8ad47c5cd1a";

export default function PaymentDetail() {
    const {paymentID} = useParams();
    const [payment, setPayment] = useState(undefined);


    useEffect(() => {
        const getPayments = async () => {
          const paymentRes = await paymentService.getPaymentDetail(paymentID);
          if (paymentRes.status === 200) {
            setPayment(paymentRes.data[0]);
          }
        };
    
        getPayments();
      }, []);
    
    console.log(payment);
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
                        <PaymentCard payment={payment} seeMoreEnabled={false}/>
                    {/* {payments.map((payment) => (
                        <PaymentCard payment={paymentID} />
                    ))} */}
                    </Grid>
                </Container>
                </main>
            </CssBaseline>
        </>
    )
}
};