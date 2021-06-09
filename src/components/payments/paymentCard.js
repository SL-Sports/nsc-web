import { Typography, Grid, Card, Button } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import { theme, useStyles } from "./paymentsTheme";

const PaymentCard = ({payment}) => {
    const classes = useStyles();
    
    const stringifyPaymentType = (paymentType) => {
        const stipend = "Monthly Stipend";
        const equipment = "Equipment";
        const travel = "Travel";
        if (paymentType === "MONTHLY_STIPEND") {
            return stipend;
        } else if (paymentType === "EQUIPMENT") {
            return equipment;
        } else if (paymentType === "TRAVEL") {
            return travel;
        }
    };

    return (
        <Grid item key={payment} xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card className={classes.card}>
                <Grid container spacing={2}>
                    <Grid item xs = {3} md={1}>
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
                            <Grid item xs = {6} md={6}>
                                <Typography align="left" style = {{color: "black", fontWeight: "fontWeightLight"}}>
                                    Association Approved? {/*String(payment.payment.approvedByAssociation)*/}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} md={1}>
                                <Checkbox 
                                    checked={payment.payment.approvedByAssociation}
                                               style={{transform: "scale(1.5)"}}
                                    />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Typography align="left" style = {{color: "black", fontWeight: "fontWeightLight"}}>
                                    Ministry Approved? {/*String(payment.payment.approvedByMinistry)*/}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} md={1}>
                                <Checkbox 
                                    checked={payment.payment.approvedByMinistry}
                                    color={"secondary"}
                                    style={{transform: "scale(1.5)"}}
                                    disableRipple
                                    />
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
                                    {stringifyPaymentType(payment.payment.paymentType)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Link to={"payment-detail/" + payment.payment._id}>
                                    <Button
                                        style={{
                                        background: theme.palette.primary.mainGradient,
                                        color: "white",
                                        borderRadius: 20,
                                        fontWeight: "bolder",
                                        }}
                                        fullWidth
                                    >
                                        SEE MORE
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default PaymentCard;