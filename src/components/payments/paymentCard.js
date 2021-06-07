import { Typography, Grid, Card, Button } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import moment from "moment";
import { Link } from "react-router-dom";

import { theme, useStyles } from "./paymentsTheme";

const PaymentCard = ({payment}) => {
    const classes = useStyles();
    
    return (
        <Grid item key={payment} xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card className={classes.card}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Card 
                        className = {classes.dateCard}
                        style={{
                            background: theme.palette.secondary.mainGradient,
                            height: "100%",
                        }}
                        >
                            <div style={{ margin: "auto", paddingBottom: 4 }}>
                                <Typography style={{ color: "white", fontWeight: "bolder" }}>
                                {payment.payment.month}
                                </Typography>
                                <Typography style={{ color: "white", fontWeight: "bolder" }}>
                                {payment.payment.year}
                                </Typography>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container spacing={0}>
                            <Grid item xs = {12}>
                                <Typography align="left" style={{color: "black", fontWeight: "bolder"}}>
                                    {payment.payment.profile.preferredName + " " + payment.payment.profile.lastName}
                                </Typography>
                            </Grid>
                        <Grid container spacing = {1}>
                            <Grid item xs = {12}>
                                <Typography align="left" style = {{color: "black", fontWeight: "fontWeightLight"}}>
                                    Association Approved? {String(payment.payment.approvedByAssociation) + "\n"}
                                    Ministry Approved? {String(payment.payment.approvedByMinistry)}
                                </Typography>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing = {1}>
                            <Grid item xs={12}>
                                <Typography align="left">
                                    {payment.payment.amount} LKR
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="left">
                                    {payment.payment.paymentType}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default PaymentCard;