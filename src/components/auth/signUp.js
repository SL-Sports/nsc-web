import React, { useState } from "react";
import authService from "../../services/authService";
import { theme, useStyles } from "./authTheme";
import bg from "../../assets/dots-web.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import MomentUtils from "@date-io/moment";
import moment from "moment";
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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useAuth } from "../../features/auth";

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [birthDay, setBirthDay] = useState(new Date());
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  let { from } = location.state || { from: { pathname: "/" } };

  const signUp = async () => {
    if (confirmPassword !== password) {
      alert("Your new password and password confirmation don't match");
      return;
    }
    setSigningUp(true);
    let formattedBirthday = moment.utc(moment(birthDay).format("LL")).unix();
    auth
      .register(phone, password, inviteCode, formattedBirthday, () =>
        history.push(from)
      )
      .catch((err) => {
        alert(err.message);
        setInviteCode("");
        setPassword("");
        setConfirmPassword("");
        setSigningUp(false);
      });
  };

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
                        <Grid item xs={12} style={{ paddingBottom: 30 }}>
                          <Typography
                            variant="h3"
                            style={{ fontWeight: "bolder" }}
                            align="left"
                          >
                            Welcome Aboard!
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
                        <Grid item sm={6} xs={12}>
                          <TextField
                            color="secondary"
                            required
                            fullWidth
                            id="inviteCode"
                            label="Invite Code"
                            name="inviteCode"
                            autoComplete="inviteCode"
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value)}
                          />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                              margin="none"
                              fullWidth
                              id="birthday-picker-dialog"
                              format="DD/MM/yyyy"
                              label="Your Birthday"
                              value={birthDay}
                              onChange={(date) => setBirthDay(date)}
                              KeyboardButtonProps={{
                                "aria-label": "change birthday",
                              }}
                            />
                          </MuiPickersUtilsProvider>
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
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            style={{
                              background: theme.palette.primary.mainGradient,
                              color: "white",
                              borderRadius: 20,
                              fontWeight: "bolder",
                              marginTop: 30,
                              padding: 10,
                            }}
                            fullWidth
                            onClick={signUp}
                            disabled={signingUp}
                          >
                            {signingUp ? (
                              <CircularProgress
                                style={{ color: "white" }}
                              ></CircularProgress>
                            ) : (
                              <Typography
                                variant="subtitle1"
                                style={{ fontWeight: "bolder" }}
                              >
                                LET'S GO
                              </Typography>
                            )}
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Link
                            to={{
                              pathname: "/login",
                              state: { from },
                            }}
                          >
                            <Typography color="primary">
                              I already have an account
                            </Typography>
                          </Link>
                        </Grid>
                        <Grid item xs={6}>
                          <Link
                            onClick={() =>
                              alert(
                                "This app is only for select sports administrators in Sri Lanka. If you've been invited then you should have received an invite code via SMS. If not and you should be invited, please contact the Sports Ministry."
                              )
                            }
                          >
                            <Typography color="primary">
                              Where's my Invite?
                            </Typography>
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
