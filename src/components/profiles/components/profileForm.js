import React, { useState, useEffect } from "react";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { getSports } from "../../../services/sportService";
import { getAssociations } from "../../../services/associationService";
import { theme } from "../profilesTheme";

export function ProfileForm({ profile, onSubmit }) {
  const profileTypes = [
    { value: "ADMIN", name: "Admin" },
    { value: "COACH", name: "Coach" },
    { value: "ATHLETE", name: "Athlete" },
  ];

  const [tempProfile, setTempProfile] = useState(profile);

  const [sports, setSports] = useState([]);
  const [associations, setAssociations] = useState([]);

  const [selectedAssociation, setSelectedAssociation] = useState(
    (profile.association && profile.association._id) || ""
  );
  const [selectedSport, setSelectedSport] = useState(
    (profile.sport && profile.sport._id) || ""
  );
  const [selectedProfileType, setSelectedProfileType] = useState(
    profile.profileType || ""
  );
  const [selectedDate, setSelectedDate] = useState(
    (profile.dateOfBirth && moment.unix(profile.dateOfBirth)) || moment()
  );

  function handleInputChange(event) {
    setTempProfile({
      ...tempProfile,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    tempProfile.sport = selectedSport;
    tempProfile.association = selectedAssociation;
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

    async function fetchAssociations() {
      getAssociations()
        .then((res) => {
          setAssociations(res.data);
        })
        .catch((err) => console.error(err));
    }

    fetchSports();
    fetchAssociations();
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
              onChange={(date) => setSelectedDate(date)}
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
          <InputLabel id="association-label" required color="secondary">
            Association
          </InputLabel>
          <Select
            // labelId="association-label"
            id="association"
            value={selectedAssociation}
            onChange={(event) => setSelectedAssociation(event.target.value)}
            required
            fullWidth
            color="secondary"
          >
            {associations.map((association) => (
              <MenuItem key={association._id} value={association._id}>
                {association.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
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
        <Grid item></Grid>
        <Grid item xs={12}>
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
          >
            {(profile._id && "Edit") || "Create"} Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
