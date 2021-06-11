import React, { useState, useEffect } from "react";
import { addRanking, profileSearch } from "../../services/rankingService";
import { rankingsList, rankingTypes } from "./rankingTypes";
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
  Button,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import ProfileSearchAutoComplete from "./profileSearchField";
const sportId = "60a7643e0c36495526c36b09";

export default function NewRanking() {
  const [rankingType, setRankingType] = useState(rankingTypes.NATIONAL);
  const [profile, setProfile] = useState("");
  const [ranking, setRanking] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  const save = async () => {
    setSaving(true);
    //TODO: restrict profiles to within sport
    const saveRes = await addRanking(
      ranking,
      rankingType,
      profile._id,
      sportId
    );
    setSaving(false);
    setProfile(undefined);
    setRanking(undefined);
    if (saveRes.status === 200) {
      history.push("/rankings");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AppBar
          style={{ background: theme.palette.primary.mainGradient }}
          position="relative"
        >
          <Toolbar>
            <Link to="/rankings" style={{ color: "white", marginTop: 4 }}>
              <ArrowBack style={{ marginRight: 15 }} />
            </Link>
            <Typography variant="h6" color="inherit" noWrap>
              New Ranking
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Container maxWidth="md" style={{ padding: 20 }}>
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <Select
                  id="ranking-type"
                  fullWidth
                  color="secondary"
                  value={rankingType}
                  onChange={(e) => setRankingType(e.target.value)}
                  style={{ textAlign: "left", height: "100%" }}
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
              <Grid item md={6} xs={12}>
                <TextField
                  id="standard-number"
                  label="Ranking"
                  fullWidth
                  color="secondary"
                  type="number"
                  required
                  value={ranking}
                  onChange={(e) => setRanking(e.target.value)}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <ProfileSearchAutoComplete
                  onSelect={(value) => setProfile(value)}
                ></ProfileSearchAutoComplete>
              </Grid>
              <Grid item md={12} xs={12}>
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
                  onClick={save}
                  disabled={saving}
                >
                  {saving ? (
                    <CircularProgress
                      style={{ color: "white" }}
                    ></CircularProgress>
                  ) : (
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bolder" }}
                    >
                      SAVE RANKING
                    </Typography>
                  )}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </main>
      </CssBaseline>
    </ThemeProvider>
  );
}
