import React, { useState, useEffect } from "react";
import { getRankings } from "../../../services/rankingService";
import { rankingTypes, rankingsList } from "../components/rankingTypes";
import { theme, useStyles } from "../rankingTheme";
import {
  Typography,
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
import { Link } from "react-router-dom";
import Ranking from "../components/rankingCard";
import NavBar from "../../navbar";
import authService from "../../../services/authService";

export default function RankingsHome() {
  const classes = useStyles();
  const [rankings, setRankings] = useState(undefined);
  const [rankingType, setRankingType] = useState(rankingTypes.NATIONAL);
  const loadRankings = async (type) => {
    let associationID = await authService.getActiveAssociationID();
    const rankingsRes = await getRankings(type, associationID);
    if (rankingsRes.status === 200) {
      setRankings(rankingsRes.data);
    }
  };
  useEffect(() => {
    loadRankings(rankingType);
  }, [rankingType]);

  const handleSelectChange = async (event) => {
    setRankingType(event.target.value);
    setRankings(undefined);
    loadRankings(event.target.value);
  };

  if (rankings === undefined) {
    return (
      <>
        <CssBaseline>
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
          <NavBar
            rankingsSelected
            title={"Rankings"}
            profilePicEnabled
            menuEnabled
            associationNameEnabled
          />

          <main>
            <Container maxWidth="md">
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
              <Link to="/rankings/new">
                <Tooltip title="Add New Ranking" aria-label="add">
                  <Fab className={classes.fab} size="large">
                    <Add></Add>
                  </Fab>
                </Tooltip>
              </Link>
            </Container>
          </main>
        </CssBaseline>
      </>
    );
  }
}
