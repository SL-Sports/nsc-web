import React, { useState } from "react";
import { Box, Grid, TextField, Button } from "@material-ui/core";

export function ProfileSearchForm({ field, value, setter }) {
  let [query, setQuery] = useState(value);

  const submit = () => {
    console.log("Submitting search query...");
    setter(query);
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
            value={query}
            variant="outlined"
            onChange={(event) => setQuery(event.target.value)}
          />
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
