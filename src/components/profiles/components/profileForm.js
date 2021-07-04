import React, { useState, useEffect } from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  Input,
} from "@material-ui/core";
import { getSports } from "../../../services/sportService";
import { theme } from "../profilesTheme";
import { upload } from "../../../services/profileService";

export function ProfileForm({ profile, onSubmit, saving, setSaving }) {
  const profileTypes = [
    { value: "ADMIN", name: "Admin" },
    { value: "COACH", name: "Coach" },
    { value: "ATHLETE", name: "Athlete" },
  ];

  const [tempProfile, setTempProfile] = useState(profile);
  const [profilePic, setProfilePic] = useState(undefined);

  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(
    (profile.sport && profile.sport._id) || ""
  );
  const [selectedProfileType, setSelectedProfileType] = useState(
    profile.profileType || ""
  );
  const [selectedDate, setSelectedDate] = useState(
    (profile.dateOfBirth && moment.unix(profile.dateOfBirth).utc()) || moment().utc().format('LL')
  );
  // moment.utc(moment(birthDay).format('LL')).unix()
  function handleInputChange(event) {
    setTempProfile({
      ...tempProfile,
      [event.target.name]: event.target.value,
    });
  }

  const handleDateChange = (input) => {
    let correctUnixTime = moment.utc(input.utc().format('LL')).unix();
    let newDate = moment.unix(correctUnixTime).utc();
    setSelectedDate(newDate);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    if (profilePic !== undefined) {
      let uploadRes = await upload(profilePic);
      if (uploadRes.status === 200) {
        tempProfile.profilePicUrl = uploadRes.data;
      } else {
        alert(tempProfile.data);
      }
    }
    console.log(selectedDate.unix());
    tempProfile.sport = selectedSport;
    tempProfile.profileType = selectedProfileType;
    tempProfile.dateOfBirth = selectedDate.unix();
    tempProfile.age = moment().year() - selectedDate.year();
    onSubmit(tempProfile);
  }

  useEffect(() => {
    async function fetchSports() {
      getSports()
        .then((res) => {
          setSports(res.data);
        })
        .catch((err) => console.error(err));
    }

    fetchSports();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={3}
        align="left"
      >
        <Grid item xs={12}>
          <InputLabel id="sport-label" required color="secondary">
            Sport
          </InputLabel>
          <Select
            labelId="sport-label"
            id="sport"
            value={selectedSport}
            onChange={(event) => setSelectedSport(event.target.value)}
            required
            fullWidth
            color="secondary"
          >
            {sports.map((sport) => (
              <MenuItem key={sport._id} value={sport._id}>
                {sport.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel id="profiletype-label" required color="secondary">
            Profile Type
          </InputLabel>
          <Select
            labelId="profiletype-label"
            id="profiletype"
            value={selectedProfileType}
            onChange={(event) => setSelectedProfileType(event.target.value)}
            required
            fullWidth
            color="secondary"
          >
            {profileTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="firstName"
            label="First Name(s)"
            value={tempProfile.firstName}
            onChange={handleInputChange}
            required
            fullWidth
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="lastName"
            label="Last Name"
            value={tempProfile.lastName}
            onChange={handleInputChange}
            required
            fullWidth
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="preferredName"
            label="Preferred First Name"
            value={tempProfile.preferredName}
            onChange={handleInputChange}
            required
            fullWidth
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <DatePicker
              label="Date of Birth"
              value={selectedDate}
              onChange={handleDateChange}
              // onChange={(date) => setSelectedDate(date)}
              openTo="year"
              views={["year", "month", "date"]}
              format="MMM DD, YYYY"
              required
              fullWidth
              color="secondary"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name="city"
            label="City"
            value={tempProfile.city}
            onChange={handleInputChange}
            required
            fullWidth
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name="country"
            label="Country"
            value={tempProfile.country}
            onChange={handleInputChange}
            required
            fullWidth
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name="school"
            label="School"
            value={tempProfile.school}
            onChange={handleInputChange}
            required
            fullWidth
            color="secondary"
          />
        </Grid>
        <Grid item />

        <Grid item xs={12}>
          <InputLabel id="pic-label" color="secondary">
            Profile Picture
          </InputLabel>
          <Input
            type="file"
            color="secondary"
            id="image"
            labelId="pic-label"
            disabled={saving}
            inputProps={{ accept: "image/*" }}
            style={{ width: "100%", height: "100%" }}
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Button
            style={{
              background: theme.palette.primary.mainGradient,
              color: "white",
              borderRadius: 20,
              fontWeight: "bolder",
              marginTop: 30,
              padding: 10,
            }}
            fullWidth
            type="submit"
            disabled={saving}
          >
            {saving ? (
              <CircularProgress style={{ color: "white" }}></CircularProgress>
            ) : (
              ((profile._id && "Edit") || "Create") + " Profile"
            )}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
