import React, { useState, useEffect } from "react";
import { addCoach, getProfile } from "../../../services/profileService";
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
import { useHistory, useLocation } from "react-router-dom";
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
  const [coachProfile, setCoachProfile] = useState(undefined);
  const [athleteProfile, setAthleteProfile] = useState(undefined);
  const [startDate, setStartDate] = useState(new Date());
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  const search = useLocation().search;
  const athleteID = new URLSearchParams(search).get("athlete");
  const coachID = new URLSearchParams(search).get("coach");

  useEffect(() => {
    async function getProfileData() {
      if (athleteID !== null) {
        const athleteRes = await getProfile(athleteID);
        if (athleteRes.status === 200) {
          // If request is good get profile
          const profileList = athleteRes.data;
          setAthleteProfile(profileList[0].profile);
        } else {
          setAthleteProfile("");
        }
      } else {
        setAthleteProfile("");
      }
      if (coachID !== null) {
        const coachRes = await getProfile(coachID);
        if (coachRes.status === 200) {
          // If request is good get profile
          const profileList = coachRes.data;
          setCoachProfile(profileList[0].profile);
        } else {
          setCoachProfile("");
        }
      } else {
        setCoachProfile("");
      }
    }

    getProfileData();
  }, [athleteID, coachID]);
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
  if (coachProfile === undefined || athleteProfile === undefined) {
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
                    defaultProfile={coachID !== null ? coachProfile : undefined}
                    allAssociations={true}
                    title="Coach Profile"
                  ></ProfileSearchAutoComplete>
                </Grid>
                <Grid item md={12} xs={12}>
                  <ProfileSearchAutoComplete
                    onSelect={(value) => setAthleteProfile(value)}
                    defaultProfile={
                      athleteID !== null ? athleteProfile : undefined
                    }
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
                        ASSIGN COACH
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
