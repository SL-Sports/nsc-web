import React, { useState, useEffect } from "react";
import { getRankings } from "../../services/rankingService";
import { rankingTypes, rankingsList } from "./rankingTypes";
import { theme, useStyles } from "./rankingTheme";
import {
  AppBar,
  Typography,
  Toolbar,
  CssBaseline,
  Container,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  Fab,
  Tooltip,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

import Ranking from "./rankingCard";

const sportId = "60a7643e0c36495526c36b09";

export default function Rankings() {
  const classes = useStyles();
  const [rankings, setRankings] = useState(undefined);
  const [rankingType, setRankingType] = useState(rankingTypes.NATIONAL);

  const loadRankings = async (type) => {
    const rankingsRes = await getRankings(type, sportId);
    if (rankingsRes.status === 200) {
      setRankings(rankingsRes.data);
    }
  };
  useEffect(() => {
    loadRankings(rankingType);
  }, []);

  const handleSelectChange = async (event) => {
    setRankingType(event.target.value);
    setRankings(undefined);
    loadRankings(event.target.value);
  };

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
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Select
                    id="ranking-type"
                    fullWidth
                    color="primary"
                    value={rankingType}
                    onChange={handleSelectChange}
                    label="Ranking Type"
                    style={{ textAlign: "left", marginBottom: 20 }}
                  >
                    {rankingsList.map((type, index) => (
                      <MenuItem value={type}>
                        <Typography
                          variant="h5"
                          style={{
                            fontWeight: "bolder",
                            paddingLeft: 8,
                            fontStyle: "italic",
                          }}
                        >
                          {type}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                {rankings.map((ranking) => (
                  <Ranking key={ranking._id} ranking={ranking} />
                ))}
              </Grid>
              <Tooltip title="Add New Ranking" aria-label="add">
                <Fab className={classes.fab} size="large">
                  <Add></Add>
                </Fab>
              </Tooltip>
            </Container>
          </main>
        </CssBaseline>
      </>
    );
  }
}
