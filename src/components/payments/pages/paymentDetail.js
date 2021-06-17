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
import { blue } from "@material-ui/core/colors";
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
import ActivitiesList from "../../activities/components/activitiesList";

export default function PaymentDetail() {
  const classes = useStyles();
  const { paymentID } = useParams();
  const [payment, setPayment] = useState(undefined);
  const [accountType, setAccountType] = useState("");

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

  useEffect(() => {
    getPayments();
  }, []);

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
          <ThemeProvider theme={theme}>
            <NavBar
              title={`${payment.payment.profile.preferredName} ${
                payment.payment.profile.lastName
              } - ${stringifyPaymentType(payment.payment.paymentType)}`}
              backButtonEnabled
            />

            <main>
              <Container style={{ paddingTop: 30 }} maxWidth="xl">
                <Grid
                  container
                  spacing={3}
                  alignItems="flex-start"
                  justify="center"
                >
                  <Grid item xs={12}>
                    <PaymentCard
                      key={payment.payment._id}
                      payment={payment}
                      seeMoreEnabled={false}
                      allowApproval={true}
                      accountType={accountType}
                      reload={getPayments}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          align="left"
                          style={{ fontWeight: "bolder" }}
                        >
                          Comments
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {payment.comments.length === 0 ? (
                          <Typography align="left">
                            No comments have been added to this payment yet.
                          </Typography>
                        ) : (
                          <PaymentComments comments={payment.comments} />
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <NewCommentCard
                          paymentID={payment.payment._id}
                          reload={getPayments}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          align="left"
                          style={{ fontWeight: "bolder" }}
                        >
                          Cheques
                        </Typography>
                      </Grid>
                      {payment.comments.length === 0 ? (
                        <Grid item xs={12}>
                          <Typography align="left">
                            No cheques have been generated for this payment yet.
                          </Typography>
                        </Grid>
                      ) : (
                        payment.cheques.map((cheque) => (
                          <Grid item xs={12}>
                            <ChequeCard
                              key={cheque._id}
                              cheque={cheque}
                              reload={getPayments}
                            />
                          </Grid>
                        ))
                      )}
                      {accountType === "NSC_ADMIN" && (
                        <Grid item xs={12}>
                          <NewChequeCard
                            paymentID={payment.payment._id}
                            reload={getPayments}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={12} lg={5}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          align="left"
                          style={{ fontWeight: "bolder" }}
                        >
                          {`${payment.payment.profile.preferredName}'s Recent Activity`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <ActivitiesList
                          profileId={payment.payment.profile._id}
                        ></ActivitiesList>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
              {accountType === "NSC_ADMIN" && (
                <Link to={"/payments/edit/" + payment.payment._id}>
                  <Fab aria-label="edit" className={classes.fab}>
                    <IconButton>
                      <EditIcon style={{ color: "white" }} />
                    </IconButton>
                  </Fab>
                </Link>
              )}
            </main>
          </ThemeProvider>
        </CssBaseline>
      </>
    );
  }
}
