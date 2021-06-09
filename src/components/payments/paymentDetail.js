import React, { useState, useEffect } from "react";
// import paymentService from "../../services/paymentService";
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

const token = "8cJeOM8vZUkSPKhn978Lh3LhY86TJSwDzUYVHxD6rrDdSBQazf4MrZSxV94pDxgwXWc5ZKkOuHrqGPt4ma0imc5K4VE7dT8VKdmOA5vZ8mI24J6mG8I3aTnE0mVcpyxE";

const profileId = "60a7f13a8ae2f8ad47c5cd1a";

export default function PaymentDetail() {
    const {paymentID} = useParams();
    const [payment, setPayment] = useState('test');


    const getPaymentDetail = async () => {
        const url = baseUrl + "/get";
    
        const body = {
            _id: paymentID,
        };
    
        const config = {
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        };
    
        let result = {};
    
        let response = await axios.post(url, body, config).catch((err) => {
            result.status = err.response.status;
            result.data = err.response.data.message;
    
            return result;
        });
        result.status = response.status;
    
        if (response.status === 200) {
            result.data = response.data;
        } else {
            result.data = response.data.message;
        }
        setPayment(result.data[0]);
        console.log(result);
        return result.data[0];
    };

    useEffect(() => {
        getPaymentDetail();
    })
    // getPaymentDetail(paymentID);
    const payment2 = getPaymentDetail();
    console.log(payment2);
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
                        <PaymentCard payment={payment} />
                    {/* {payments.map((payment) => (
                        <PaymentCard payment={paymentID} />
                    ))} */}
                    </Grid>
                </Container>
                </main>
            </CssBaseline>
        </>
    )
};