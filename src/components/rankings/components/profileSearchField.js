import React from "react";
import { TextField, Avatar, Grid, Typography } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { profileSearch } from "../../../services/rankingService";

export default function ProfileSearchAutoComplete({
  onSelect,
  defaultProfile,
  title,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [label, setLabel] = React.useState("");
  const loading = open && options.length === 0;

  const onChangeHandle = async (value) => {
    // this default api does not support searching but if you use google maps or some other use the value and post to get back you reslut and then set it using setOptions
    if (value.length < 2) {
      setOptions([]);
    } else {
      const result = await profileSearch(value);

      const profiles = result.data;
      setOptions(profiles);
    }
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }

    if (title === undefined) {
      setLabel("Athlete Profile");
    } else {
      setLabel(title);
    }
  }, [open, title]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, value) => onSelect(value)} // prints the selected value
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => `${option.preferredName} ${option.lastName}`}
      options={options}
      loading={loading}
      defaultValue={defaultProfile}
      renderOption={(option) => {
        return (
          <Grid container alignItems="center">
            <Grid item xs={4} md={1}>
              <Avatar
                src={option.profilePicUrl}
                style={{ width: 50, height: 50 }}
              />
            </Grid>
            <Grid item xs={8} md={11}>
              <Typography variant="h5" align="left">
                {`${option.preferredName} ${option.lastName}`}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                align="left"
              >
                {`${option.association.name}`}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          color="secondary"
          onChange={(ev) => {
            // dont fire API if the user delete or not entered anything
            if (ev.target.value !== "" || ev.target.value !== null) {
              onChangeHandle(ev.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
