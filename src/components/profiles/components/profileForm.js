import React, { useState } from "react";
import { Button, FormControl, Grid, TextField } from "@material-ui/core";

export function ProfileForm({ profile, onSubmit }) {
  const [tempProfile, setTempProfile] = useState(profile);

  function handleInputChange(event) {
    setTempProfile({
      ...tempProfile,
      [event.target.name]: event.target.value,
    });
  }

  function submit() {
    onSubmit(tempProfile);
  }

  return (
    <FormControl>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <TextField
            name="firstName"
            label="First Name"
            value={tempProfile.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="lastName"
            label="Last Name"
            value={tempProfile.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="preferredName"
            label="Preferred Name"
            value={tempProfile.preferredName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="city"
            label="City"
            value={tempProfile.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            name="school"
            label="School"
            value={tempProfile.school}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item></Grid>
        <Grid item>
          <Button variant="contained" onClick={submit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
}
