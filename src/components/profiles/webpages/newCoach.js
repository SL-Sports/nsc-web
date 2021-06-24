import React, { useState, useEffect } from "react";
import { addCoach } from "../../../services/profileService";
import { theme } from "../profilesTheme";
import {
  Typography,
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
import { useHistory } from "react-router-dom";
import ProfileSearchAutoComplete from "../../rankings/components/profileSearchField";
import NavBar from "../../navbar";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";

export default function NewCoach() {
  const [coachDescription, setCoachDescription] = useState("");
  const [coachProfile, setCoachProfile] = useState("");
  const [athleteProfile, setAthleteProfile] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  const save = async () => {
    setSaving(true);
    const saveRes = await addCoach(
      coachDescription,
      moment(startDate).unix().toString(),
      coachProfile._id,
      athleteProfile._id
    );
    setSaving(false);
    if (saveRes.status === 200) {
      history.goBack();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <NavBar title="Assign Coach" backButtonEnabled associationNameEnabled />
        <main>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              <Grid item md={12} xs={12}>
                <ProfileSearchAutoComplete
                  onSelect={(value) => setCoachProfile(value)}
                  title="Coach Profile"
                ></ProfileSearchAutoComplete>
              </Grid>
              <Grid item md={12} xs={12}>
                <ProfileSearchAutoComplete
                  onSelect={(value) => setAthleteProfile(value)}
                ></ProfileSearchAutoComplete>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  onChange={(e) => setCoachDescription(e.target.value)}
                  color="secondary"
                  value={coachDescription}
                  label="Coach Description"
                  align="left"
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    margin="none"
                    fullWidth
                    id="startday-picker-dialog"
                    format="DD/MM/yyyy"
                    label="Start Date"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change start date",
                    }}
                  />
                </MuiPickersUtilsProvider>
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
