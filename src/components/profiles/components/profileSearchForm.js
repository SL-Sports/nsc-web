import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";

import { theme } from "../profilesTheme";

export function ProfileSearchForm({ field, query, setQuery }) {
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
        <Grid item md={10} xs={12}>
          <TextField
            name={field}
            label={field}
            value={queryField}
            variant="outlined"
            fullWidth
            onChange={(event) => setQueryField(event.target.value)}
            autoFocus
            color="primary"
          />
        </Grid>
        <Grid item md={2} xs={12}>
          <Button
            style={{
              background: theme.palette.primary.mainGradient,
              color: "white",
              borderRadius: 20,
              fontWeight: "bolder",
              padding: 8,
            }}
            fullWidth
            onClick={submit}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
