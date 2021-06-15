import { Typography, Grid, Card, Button, IconButton } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank} from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import moment from "moment";
import { Link } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import { theme, useStyles } from "./paymentsTheme";
import paymentService from "../../services/paymentsService";
import React, {useState} from "react";
import Avatar from '@material-ui/core/Avatar';


const jackSmithProfileID = "60ac7adc658e534fb80b9f55";

const PaymentCard = ({payment, seeMoreEnabled, allowApproval}) => {
    const classes = useStyles();

    const getMonth = (unixTime) => {
        let date = moment.unix(unixTime);
        return moment(date).format("MMM");
      };
    const getYear = (unixTime) => {
        let date = moment.unix(unixTime);
        return moment(date).format("yyyy");
        };
    const getDay = (unixTime) => {
        let date = moment.unix(unixTime);
        return moment(date).format("DD");
        };
    const getFullTime= (unixTime) => {
        let date = moment.unix(unixTime);
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
    
    

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

    const approvePayment = async () => {
        const approveBody = {
            paymentID: payment.payment._id,
            approvedBy: jackSmithProfileID,
        };

        console.log(approveBody);

        const approvalRes = await paymentService.approvePayment(approveBody);
        console.log(approvalRes);
        alert(approvalRes.data);
        
    };

    const getColor = () => {
        if (payment.payment.approvedByAssociation) {
            return "green"
        } else {
            return "red"
        }
    };

    const getAssociationApprovalText = () => {
        if (payment.payment.approvedByAssociation) { 
            console.log(payment.payment.approvedByMinistryAt)
            return "Approved by association at " + getFullTime(payment.payment.approvedByMinistryAt)
        } else {
            return "Not yet approved by association. "
        }
    }

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
                                <Typography style={{ color: "white", fontWeight: "bolder"}} align="center">
                                {stringifyPaymentType(payment.payment.paymentType)}
                                </Typography>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container spacing={0}>
                            <Grid item xs={2}>
                                <Avatar 
                                alt={payment.payment.profile.preferredName + " " + payment.payment.profile.lastName}
                                src={payment.payment.profile.profilePicUrl}/>
                            </Grid>
                            <Grid item xs = {10}>
                                <Typography align="left" style={{color: "black", fontWeight: "bolder"}} variant="h5">
                                    {payment.payment.profile.preferredName + " " + payment.payment.profile.lastName}
                                </Typography>
                            </Grid>
                        <Grid container spacing = {1}>
                            <Grid item xs={1} md={1}>
                                <Checkbox 
                                    checked={payment.payment.approvedByAssociation}
                                               style={{transform: "scale(1.5)"}}
                                    />
                            </Grid>
                            <Grid item xs={1}>

                            </Grid>
                            <Grid item xs = {10} md={10}>
                                <Typography align="left" style = {{color: "black", fontWeight: "fontWeightLight"}}>
                                    {getAssociationApprovalText()}
                                    {/* Association Approved? String(payment.payment.approvedByAssociation) */}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Link to={"payment-detail/" + payment.payment._id}>
                                    {seeMoreEnabled && <Button
                                        style={{
                                        background: theme.palette.primary.mainGradient,
                                        color: "white",
                                        borderRadius: 20,
                                        fontWeight: "bolder",
                                        }}
                                        fullWidth
                                    >
                                        SEE MORE
                                    </Button>}
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                {allowApproval && <Button
                                        style={{
                                        background: theme.palette.secondary.mainGradient,
                                        color: "white",
                                        borderRadius: 20,
                                        fontWeight: "bolder",
                                        }}
                                        fullWidth
                                        onClick={approvePayment}
                                    >
                                        Approve
                                    </Button>}
                            </Grid>
                            {/* <Grid item xs={6} md={6}>
                                <Typography align="left" style = {{color: "black", fontWeight: "fontWeightLight"}}>
                                    Ministry Approved? {String(payment.payment.approvedByMinistry)
                                </Typography>
                            </Grid>
                            <Grid item xs={1} md={1}>
                                <Checkbox 
                                    checked={payment.payment.approvedByMinistry}
                                    // color={"primary"}
                                    style={{transform: "scale(1.5)"}}
                                    disableRipple
                                    iconStyle={{fill: "green"}}
                                    />
                            </Grid> */}
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing = {1}>
                            <Grid item xs={12}>
                                <Typography align="left" variant="h5">
                                    {payment.payment.amount} LKR
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {/* <Typography align="left">
                                    {stringifyPaymentType(payment.payment.paymentType)}
                                </Typography> */}
                            </Grid>
                            <Grid item xs={12}>
                                {/* <Link to={"payment-detail/" + payment.payment._id}>
                                    {seeMoreEnabled && <Button
                                        style={{
                                        background: theme.palette.primary.mainGradient,
                                        color: "white",
                                        borderRadius: 20,
                                        fontWeight: "bolder",
                                        }}
                                        fullWidth
                                    >
                                        SEE MORE
                                    </Button>}
                                </Link> */}
                            </Grid>
                            {/* <Grid item xs={12}>
                                {allowApproval && <Button
                                        style={{
                                        background: theme.palette.secondary.mainGradient,
                                        color: "white",
                                        borderRadius: 20,
                                        fontWeight: "bolder",
                                        }}
                                        fullWidth
                                        onClick={approvePayment}
                                    >
                                        Approve
                                    </Button>}
                            </Grid> */}
                            {/*Need to get user object here somehow to verify that
                            user.accountType = "NSC_ADMIN"*/}
                            {/* {<Grid item xs={2}> 
                                <Link to={"payments-edit/" + payment.payment._id}>
                                    <IconButton>
                                        <EditIcon/>
                                    </IconButton>
                                </Link>
                            </Grid>} */}
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default PaymentCard;