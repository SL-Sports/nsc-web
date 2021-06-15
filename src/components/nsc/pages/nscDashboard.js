import React from "react";
import { theme } from "../nscTheme";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Container,
  Grid,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";

import Associations from "../components/associations";
import Sports from "../components/sports";
import authService from "../../../services/authService";

export default function NSCDashboard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppBar
          style={{ background: theme.palette.primary.mainGradient }}
          position="relative"
        >
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              style={{ flexGrow: 1 }}
              align="left"
            >
              Hello John
            </Typography>
            <Button
              color="inherit"
              onClick={async () => await authService.logout()}
            >
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          <Container style={{ padding: 30 }} maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={8} md={12} xs={12}>
                <Associations></Associations>
              </Grid>

              <Grid item lg={4} md={12}>
                <Sports></Sports>
              </Grid>
            </Grid>
          </Container>
        </main>
      </CssBaseline>
    </ThemeProvider>
  );
}
