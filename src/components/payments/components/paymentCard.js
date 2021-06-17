import { Typography, Grid, Card, Button, Hidden } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import moment from "moment";
import { Link } from "react-router-dom";
// import Checkbox from "@material-ui/core/Checkbox";
import { theme, useStyles } from "../paymentsTheme";
import paymentService from "../../../services/paymentsService";
import React from "react";
import Avatar from "@material-ui/core/Avatar";

const jackSmithProfileID = "60ac7adc658e534fb80b9f55";

const PaymentCard = ({ payment, seeMoreEnabled, allowApproval, accountType }) => {
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
  const getFullTime = (unixTime) => {
    let date = moment.unix(unixTime);
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  };

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
    console.log(approvalRes.data.message);
    alert(approvalRes.data.message);
  };

  const getColor = () => {
    if (payment.payment.approvedByAssociation) {
      return "green";
    } else {
      return "red";
    }
  };

  const getAssociationApprovalText = () => {
    if (payment.payment.approvedByAssociation) {
      console.log(payment.payment.approvedByMinistryAt);
      return (
        "Approved by association at " +
        getFullTime(payment.payment.approvedByMinistryAt)
      );
    } else {
      return (
        "Waiting for association approval since " +
        getFullTime(payment.payment.createdAt)
      );
    }
  };

  return (
    <Grid item key={payment} xs={12} sm={12} md={12} lg={12} xl={12}>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={5} md={2} lg={2}>
            <Card
              className={classes.dateCard}
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
              <Typography
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontStyle: "italic",
                }}
              >
                {stringifyPaymentType(payment.payment.paymentType)}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={7} md={10} lg={10}>
            <Grid container spacing={2} alignItems="center" justify="center">
              <Hidden xsDown>
                <Grid item xs={4} md={1} lg={1}>
                  <Avatar
                    style={{ width: 50, height: 50 }}
                    alt={
                      payment.payment.profile.preferredName +
                      " " +
                      payment.payment.profile.lastName
                    }
                    src={payment.payment.profile.profilePicUrl}
                  />
                </Grid>
              </Hidden>

              <Grid item xs={12} md={6} lg={6}>
                <Typography
                  align="left"
                  style={{ fontWeight: "bolder" }}
                  variant="h5"
                >
                  {payment.payment.profile.preferredName +
                    " " +
                    payment.payment.profile.lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} md={5} lg={5}>
                <Typography
                  align="right"
                  style={{ fontWeight: "bolder" }}
                  variant="h5"
                >
                  {`LKR ${payment.payment.amount}`}
                </Typography>
              </Grid>
              <Grid item xs={4} md={1} lg={1}>
                {payment.payment.approvedByAssociation ? (
                  <CheckBox
                    fontSize="large"
                    style={{
                      width: 50,
                      height: 50,
                      float: "left",
                      color: "green",
                    }}
                  />
                ) : (
                  <CheckBoxOutlineBlank
                    fontSize="large"
                    style={{
                      width: 50,
                      height: 50,
                      float: "left",
                      color: "red",
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={8} md={11} lg={11}>
                <Typography align="left" variant="subtitle1">
                  {getAssociationApprovalText()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link to={"payments/" + payment.payment._id}>
                  {seeMoreEnabled && (
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
                  )}
                </Link>
                <Grid item xs={12}>
                  {accountType == "ASSOC_ADMIN" && allowApproval && 
                    !payment.payment.approvedByAssociation && (
                    <Button
                      style={{
                        background: theme.palette.primary.mainGradient,
                        color: "white",
                        borderRadius: 20,
                        fontWeight: "bolder",
                      }}
                      fullWidth
                      onClick={approvePayment}
                    >
                      Approve
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PaymentCard;
