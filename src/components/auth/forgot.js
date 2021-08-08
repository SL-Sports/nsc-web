import React, { useState } from "react";
import authService from "../../services/authService";
import { theme, useStyles } from "./authTheme";
import bg from "../../assets/dots-web.png";
import { Link, useHistory } from "react-router-dom";
import {
  Typography,
  CssBaseline,
  Container,
  Grid,
  ThemeProvider,
  Card,
  Hidden,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@material-ui/core";

export default function Forgot() {
  const classes = useStyles();
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSessionId, setOtpSessionId] = useState("");
  const [onRequestPage, setOnRequestPage] = useState(true);

  const resetState = () => {
    setPhone("");
    setPassword("");
    setRequesting(false);
    setVerifying(false);
    setConfirmPassword("");
    setOtp("");
    setOtpSessionId("");
    setOnRequestPage(true);
  };

  const request = async () => {
    setRequesting(true);
    let result = await authService.forgotRequest(phone);
    setRequesting(false);

    if (result === "ERROR") {
      resetState();
    } else {
      setOtpSessionId(result);
      setOnRequestPage(false);
    }
  };

  const verify = async () => {
    if (confirmPassword !== password) {
      alert("Your new password and password confirmation don't match");
      return;
    }
    setVerifying(true);
    let result = await authService.forgotVerify(
      phone,
      otpSessionId,
      otp,
      password
    );
    setVerifying(false);
    if (result) {
      history.replace("/");
    } else {
      setOtp("");
    }
  };

  if (onRequestPage) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Box
            style={{ background: "linear-gradient(to right,#0575e6, #021b79)" }}
          >
            <Container maxWidth="lg" style={{ padding: 20 }}>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh", width: "100%" }}
              >
                <Grid item xs={12}>
                  <Card className={classes.card} raised>
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      alignItems="center"
                      justify="center"
                    >
                      <Hidden smDown>
                        <Grid item md={6}>
                          <img src={bg} alt="background" width="100%" />
                        </Grid>
                      </Hidden>

                      <Grid item md={6} sm={12}>
                        <Grid
                          container
                          spacing={4}
                          direction="row"
                          alignItems="stretch"
                          justify="flex-start"
                          style={{ padding: 50 }}
                        >
                          <Grid item xs={12} style={{ paddingBottom: 50 }}>
                            <Typography
                              variant="h4"
                              style={{ fontWeight: "bolder" }}
                              align="left"
                            >
                              Let's Reset your Password
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              color="secondary"
                              required
                              fullWidth
                              id="phone"
                              label="Phone"
                              name="phone"
                              placeholder="7XXXXXXXX"
                              autoComplete="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              style={{
                                background: theme.palette.primary.mainGradient,
                                color: "white",
                                borderRadius: 20,
                                fontWeight: "bolder",
                                marginTop: 50,
                                padding: 10,
                              }}
                              fullWidth
                              onClick={request}
                              disabled={requesting}
                            >
                              {requesting ? (
                                <CircularProgress
                                  style={{ color: "white" }}
                                ></CircularProgress>
                              ) : (
                                <Typography
                                  variant="subtitle1"
                                  style={{ fontWeight: "bolder" }}
                                >
                                  CONTINUE
                                </Typography>
                              )}
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Link to="/login">
                              <Typography color="primary">Log In</Typography>
                            </Link>
                          </Grid>
                          <Grid item xs={6}>
                            <Link to="/signup">
                              <Typography color="primary">Sign Up</Typography>
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </CssBaseline>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Box
            style={{ background: "linear-gradient(to right,#0575e6, #021b79)" }}
          >
            <Container maxWidth="lg" style={{ padding: 20 }}>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: "100vh", width: "100%" }}
              >
                <Grid item xs={12}>
                  <Card className={classes.card} raised>
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      alignItems="center"
                      justify="center"
                    >
                      <Hidden smDown>
                        <Grid item md={6}>
                          <img src={bg} alt="background" width="100%" />
                        </Grid>
                      </Hidden>

                      <Grid item md={6} sm={12}>
                        <Grid
                          container
                          spacing={4}
                          direction="row"
                          alignItems="stretch"
                          justify="flex-start"
                          style={{ padding: 50 }}
                        >
                          <Grid item xs={12} style={{ paddingBottom: 50 }}>
                            <Typography
                              variant="h4"
                              style={{ fontWeight: "bolder" }}
                              align="left"
                            >
                              Check your messages for an OTP
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              color="secondary"
                              required
                              fullWidth
                              id="otp"
                              label="OTP"
                              name="otp"
                              autoComplete="otp"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              color="secondary"
                              required
                              fullWidth
                              id="newPassword"
                              label="New Password"
                              name="password"
                              autoComplete="newPassword"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              color="secondary"
                              required
                              fullWidth
                              id="confirmPassword"
                              label="Confirm Password"
                              name="password"
                              autoComplete="confirmPassword"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              style={{
                                background: theme.palette.primary.mainGradient,
                                color: "white",
                                borderRadius: 20,
                                fontWeight: "bolder",
                                marginTop: 50,
                                padding: 10,
                              }}
                              fullWidth
                              onClick={verify}
                              disabled={verifying}
                            >
                              {verifying ? (
                                <CircularProgress
                                  style={{ color: "white" }}
                                ></CircularProgress>
                              ) : (
                                <Typography
                                  variant="subtitle1"
                                  style={{ fontWeight: "bolder" }}
                                >
                                  CONTINUE
                                </Typography>
                              )}
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Link to="/login">
                              <Typography color="primary">Log In</Typography>
                            </Link>
                          </Grid>
                          <Grid item xs={6}>
                            <Link onClick={resetState}>
                              <Typography color="primary">Go Back</Typography>
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}
