import React, { useState, useEffect } from "react";
import { editCoach, getCoachById } from "../../../services/profileService";
import { theme } from "../profilesTheme";
import {
  Typography,
  CssBaseline,
  Container,
  CircularProgress,
  Grid,
  Button,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import ProfileSearchAutoComplete from "../../rankings/components/profileSearchField";
import NavBar from "../../navbar";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";

export default function EditCoach() {
  const [coachDescription, setCoachDescription] = useState(undefined);
  const [coachProfile, setCoachProfile] = useState(undefined);
  const [athleteProfile, setAthleteProfile] = useState(undefined);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [activeStatus, setActiveStatus] = useState(undefined);
  const [showEndDate, setShowEndDate] = useState(undefined);
  const [coach, setCoach] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const history = useHistory();
  const { coachID } = useParams();

  useEffect(() => {
    const getCoach = async () => {
      const coachRes = await getCoachById(coachID);
      if (coachRes.status === 200) {
        if (coachRes.data.length === 0) {
          history.replace("/profiles");
        } else {
          const coach = coachRes.data[0];
          setCoach(coach);
          setCoachDescription(coach.coachDescription);
          setAthleteProfile(coach.athleteProfile);
          setCoachProfile(coach.coachProfile);
          setStartDate(moment.unix(coach.startDate).toDate());
          setEndDate(moment.unix(coach.endDate).toDate());
          setActiveStatus(coach.activeStatus);
          setShowEndDate(coach.activeStatus === "PAST");
        }
      }
    };
    getCoach();
  }, [coachID, history]);
  const save = async () => {
    setSaving(true);
    const saveRes = await editCoach(
      coachDescription,
      moment(startDate).unix().toString(),
      coachProfile._id,
      athleteProfile._id,
      activeStatus,
      moment(endDate).unix().toString(),
      coachID
    );
    setSaving(false);
    if (saveRes.status === 200) {
      history.goBack();
    }
  };
  if (coach === undefined) {
    return (
      <>
        <CssBaseline>
          <NavBar
            title="Assign Coach"
            backButtonEnabled
            associationNameEnabled
          />

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
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <NavBar
            title="Assign Coach"
            backButtonEnabled
            associationNameEnabled
          />
          <main>
            <Container maxWidth="md">
              <Grid container spacing={4}>
                <Grid item md={12} xs={12}>
                  <ProfileSearchAutoComplete
                    onSelect={(value) => setCoachProfile(value)}
                    defaultProfile={coach.coachProfile}
                    title="Coach Profile"
                  ></ProfileSearchAutoComplete>
                </Grid>
                <Grid item md={12} xs={12}>
                  <ProfileSearchAutoComplete
                    onSelect={(value) => setAthleteProfile(value)}
                    defaultProfile={coach.athleteProfile}
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
}
