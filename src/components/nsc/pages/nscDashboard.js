import React from "react";
import { theme } from "../nscTheme";
import { Container, Grid, CssBaseline, ThemeProvider } from "@material-ui/core";

import Associations from "../components/associations";
import Sports from "../components/sports";
import NavBar from "../../navbar";

export default function NSCDashboard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <NavBar title="SL Sports Admin Dashboard" profilePicEnabled />
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
