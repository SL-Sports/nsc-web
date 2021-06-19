import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";

import { profileTypes } from "../profileTypes";

export function ProfileSearchForm({
  field,
  query,
  setQuery,
  profileTypeField,
  setProfileTypeField,
}) {
  let [queryField, setQueryField] = useState(query);

  const submit = () => {
    setQuery(queryField);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Grid item>
          <TextField
            name={field}
            label={field}
            value={queryField}
            variant="outlined"
            onChange={(event) => setQueryField(event.target.value)}
          />
        </Grid>
        <Grid item>
          <Select
            value={profileTypeField}
            onChange={(event) => setProfileTypeField(event.target.value)}
            variant="outlined"
          >
            <MenuItem value={profileTypes.ALL}>{profileTypes.ALL}</MenuItem>
            <MenuItem value={profileTypes.ATHLETES}>
              {profileTypes.ATHLETES}
            </MenuItem>
            <MenuItem value={profileTypes.COACHES}>
              {profileTypes.COACHES}
            </MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <Button onClick={submit} color="primary" variant="contained">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export function ProfileAdvancedSearchForm({ fields }) {
  return (
    <form>
      <Grid container alignItems="center" justify="center">
        <Grid item key="filter-label">
          <Box mx={1}>
            <h3>Filter:</h3>
          </Box>
        </Grid>
        {fields.map(({ field, value, setter }) => (
          <Grid item key={field}>
            <Box mx={1}>
              <TextField
                name={field}
                label={field}
                value={value}
                variant="outlined"
                onChange={(event) => setter(event.target.value)}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </form>
  );
}
