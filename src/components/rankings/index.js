import React, { useState, useEffect } from "react";
import { getRankings } from "../../services/rankingService";
import { rankingTypes } from "./rankingTypes";
import { theme } from "./rankingTheme";
import {
  AppBar,
  Typography,
  Toolbar,
  CssBaseline,
  Container,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import Ranking from "./rankingCard";

const sportId = "60a7643e0c36495526c36b09";

export default function Rankings() {
  const [rankings, setRankings] = useState(undefined);
  const [rankingType, setRankingType] = useState(rankingTypes.NATIONAL);

  const loadRankings = async () => {
    const rankingsRes = await getRankings(rankingType, sportId);
    if (rankingsRes.status === 200) {
      setRankings(rankingsRes.data);
    }
  };
  useEffect(() => {
    loadRankings();
  }, []);

  if (rankings === undefined) {
    return (
      <>
        <CssBaseline>
          <AppBar
            style={{ background: theme.palette.primary.mainGradient }}
            position="relative"
          >
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Rankings - Golf
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
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
          </main>
        </CssBaseline>
      </>
    );
  } else {
    return (
      <>
        <CssBaseline>
          <AppBar
            style={{ background: theme.palette.primary.mainGradient }}
            position="relative"
          >
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Rankings - Golf
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            <Container style={{ padding: 30 }} maxWidth="md">
              <Grid container spacing={2}>
                {rankings.map((ranking) => (
                  <Ranking key={ranking._id} ranking={ranking} />
                ))}
              </Grid>
            </Container>
          </main>
        </CssBaseline>
      </>
    );
  }
}
