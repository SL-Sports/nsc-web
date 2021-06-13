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
import { getAllSports } from "../../../services/sportService";
import { getAllAssociations } from "../../../services/associationService";

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
    profile.association._id || ""
  );
  const [selectedSport, setSelectedSport] = useState(profile.sport._id || "");
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
    onSubmit(tempProfile);
  }

  useEffect(() => {
    async function fetchSports() {
      getAllSports()
        .then((res) => {
          setSports(res.data);
        })
        .catch((err) => console.error(err));
    }

    async function fetchAssociations() {
      getAllAssociations()
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
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        align="left"
      >
        <Grid item>
          <TextField
            name="firstName"
            label="First Name"
            value={tempProfile.firstName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            name="lastName"
            label="Last Name"
            value={tempProfile.lastName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            name="preferredName"
            label="Preferred Name"
            value={tempProfile.preferredName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            name="city"
            label="City"
            value={tempProfile.city}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            name="country"
            label="Country"
            value={tempProfile.country}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            name="school"
            label="School"
            value={tempProfile.school}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item />
        <Grid item>
          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <DatePicker
              label="Date of Birth"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              openTo="year"
              views={["year", "month", "date"]}
              format="MMM DD, YYYY"
              required
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel id="association-label" required>
              Association
            </InputLabel>
            <Select
              // labelId="association-label"
              id="association"
              value={selectedAssociation}
              onChange={(event) => setSelectedAssociation(event.target.value)}
              required
            >
              {associations.map((association) => (
                <MenuItem key={association._id} value={association._id}>
                  {association.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel id="sport-label" required>
              Sport
            </InputLabel>
            <Select
              // labelId="sport-label"
              id="sport"
              value={selectedSport}
              onChange={(event) => setSelectedSport(event.target.value)}
              required
            >
              {sports.map((sport) => (
                <MenuItem key={sport._id} value={sport._id}>
                  {sport.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl style={{ minWidth: 150 }}>
            <InputLabel id="profiletype-label" required>
              Profile Type
            </InputLabel>
            <Select
              // labelId="profiletype-label"
              id="profiletype"
              value={selectedProfileType}
              onChange={(event) => setSelectedProfileType(event.target.value)}
              required
            >
              {profileTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item></Grid>
        <Grid item>
          <Button variant="contained" type="submit">
            Create Profile
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
