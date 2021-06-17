import React, { useState, useEffect } from "react";
import paymentService from "../../../services/paymentsService";
import authService from "../../../services/authService";
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
  Fab,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { blue } from '@material-ui/core/colors';
import COLORS from "../../../colors";
import { theme, useStyles } from "../paymentsTheme";
import PaymentCard from "../components/paymentCard";
import CommentCard from "../components/commentCard";
import NewCommentCard from "../components/newCommentCard";
import ChequeCard from "../components/chequeCard";
import NewChequeCard from "../components/newChequeCard";
import PaymentComment from "../components/paymentComment";
import PaymentComments from "../components/paymentComments";
import NavBar from "../../navbar";

export default function PaymentDetail() {
  const classes = useStyles();
  const { paymentID } = useParams();
  const [payment, setPayment] = useState(undefined);
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    const getPayments = async () => {
      const paymentRes = await paymentService.getPaymentDetail(paymentID);
      console.log(paymentRes);
      if (paymentRes.status === 200) {
        console.log(paymentRes.data[0]);
        setPayment(paymentRes.data[0]);
        console.log(paymentRes.data[0].comments);
        let accountType = await authService.getAccountType();
        setAccountType(accountType);
      }
    };

    getPayments();
  }, []);

  const fabStyle = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
    background: theme.palette.secondary.mainGradient,
    color: "white"
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
          <NavBar
            title={`${payment.payment.profile.preferredName} ${
              payment.payment.profile.lastName
            } - ${stringifyPaymentType(payment.payment.paymentType)}`}
            backButtonEnabled
          />

          <main>
            <Container style={{ paddingTop: 30 }} maxWidth="lg">
              <Grid container spacing={2}>
                <PaymentCard
                  key={payment.payment._id}
                  payment={payment}
                  seeMoreEnabled={false}
                  allowApproval={true}
                  accountType={accountType}
                />
              </Grid>
            </Container>
            <Container style={{ paddingTop: 30 }} maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item sm={6}>
                  <Typography
                    align="left"
                    variant="h5"
                    style={{ paddingLeft: 30 }}
                  >
                    Comments
                  </Typography>
                  {/* <Card className={classes.card}> */}
                  <Card className={classes.card}>
                    {payment.comments.map((comment) => (
                      <Grid item sm={12} style={{ padding: 10 }}>
                        <PaymentComment key={comment._id} comment={comment} />
                      </Grid>
                    ))}
                  </Card>
                  <Grid item sm={12}>
                    <NewCommentCard paymentID={payment.payment._id} />
                  </Grid>
                </Grid>
                <Grid item sm={6}>
                  <Typography
                    align="left"
                    variant="h5"
                    style={{ paddingLeft: 30 }}
                  >
                    Cheques
                  </Typography>
                  {payment.cheques.map((cheque) => (
                    <Grid item sm={12} style={{ padding: 10 }}>
                      {!cheque.isDeleted && (
                        <ChequeCard key={cheque._id} cheque={cheque} />
                      )}
                    </Grid>
                  ))}
                  <NewChequeCard paymentID={payment.payment._id} />
                </Grid>
              </Grid>
            </Container>
            {accountType == "NSC_ADMIN" && <Link to={"/payments/edit/" + payment.payment._id}>
              <Fab aria-label="edit" style={fabStyle}>
                <IconButton>
                  <EditIcon style={{color : blue[50]}}/>
                </IconButton>
              </Fab>
            </Link>}
          </main>
        </CssBaseline>
      </>
    );
  }
}
