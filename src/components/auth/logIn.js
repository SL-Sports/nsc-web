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

import { useCookies } from "react-cookie";

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [cookies, setCookie] = useCookies([
    "token",
    "accountType",
    "profileID",
    "phone",
    "password",
    "preferredName",
    "activeAssociation",
  ]);

  const login = async () => {
    setLoggingIn(true);
    let result = await authService.login(phone, password);
    if (result.status === 200) {
      setCookie("token", result.token, { path: "/" });
      setCookie("accountType", result.accountType, { path: "/" });
      setCookie("profileID", result.profile._id, { path: "/" });
      setCookie("phone", result.phone, { path: "/" });
      setCookie("password", result.password, { path: "/" });
      setCookie("preferredName", result.profile.preferredName, { path: "/" });

      if (result.accountType === "ASSOCIATION_ADMIN") {
        setCookie("activeAssociation", result.profile.association, {
          path: "/",
        });
      }

      history.replace("/activities");
    } else {
      setLoggingIn(false);
      setPassword("");
      setPhone("");
    }
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
                        <Grid item xs={12} style={{ paddingBottom: 50 }}>
                          <Typography
                            variant="h3"
                            style={{ fontWeight: "bolder" }}
                            align="left"
                          >
                            Welcome Back!
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
                          <TextField
                            color="secondary"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            onClick={login}
                            disabled={loggingIn}
                          >
                            {loggingIn ? (
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
                          <Link to="/forgot">
                            <Typography color="primary">
                              Forgot Password
                            </Typography>
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
}
