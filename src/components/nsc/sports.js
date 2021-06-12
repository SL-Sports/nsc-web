import React, { useState, useEffect } from "react";
import { getSports, editSport, addSport } from "../../services/sportService";
import { theme } from "./nscTheme";
import {
  Typography,
  Grid,
  IconButton,
  TextField,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";
import Sport from "./sportCard";

export default function Sports() {
  const [sports, setSports] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [sportId, setSportId] = useState(undefined);

  const onEdit = async (sport) => {
    setSportId(sport._id);
    setName(sport.name);
    setDescription(sport.description);
    setEditing(true);
  };

  const resetState = async () => {
    setName("");

    setDescription("");
    setSportId(undefined);
    setEditing(!editing);
    setSaving(false);
  };

  const loadSports = async () => {
    const sportsRes = await getSports();
    if (sportsRes.status === 200) {
      setSports(sportsRes.data);
    }
  };
  useEffect(() => {
    loadSports();
  }, []);

  const save = async () => {
    setSaving(true);
    let saveRes = {};

    if (sportId === undefined) {
      saveRes = await addSport(name, description);
    } else {
      saveRes = await editSport(sportId, name, description);
    }

    if (saveRes.status === 200) {
      await loadSports();
      resetState();
    } else {
      setSaving(false);
    }
  };

  if (sports === undefined) {
    return (
      <Grid
        container
        spacing={2}
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            align="left"
            style={{ fontWeight: "bolder" }}
          >
            Sports
          </Typography>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "20vh" }}
        >
          <Grid item xs={3}>
            <CircularProgress
              style={{ color: theme.palette.primary.main, margin: "auto" }}
            ></CircularProgress>{" "}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid
        container
        spacing={2}
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={10}>
          <Typography
            variant="h4"
            align="left"
            style={{ fontWeight: "bolder" }}
          >
            Sports
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton
            color={editing ? "secondary" : "primary"}
            aria-label="new-comment"
            size="medium"
            onClick={() => resetState()}
            disabled={saving}
          >
            {editing ? (
              <Close fontSize="large"></Close>
            ) : (
              <Add fontSize="large"></Add>
            )}
          </IconButton>
        </Grid>
        {editing && (
          <Grid item xs={12}>
            <TextField
              color="primary"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="new sport name"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
        )}
        {editing && (
          <Grid item xs={12}>
            <TextField
              color="primary"
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="new sport description"
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        )}
        {editing && (
          <Grid item xs={12}>
            <Button
              style={{
                background: theme.palette.primary.mainGradient,
                color: "white",
                borderRadius: 20,
                fontWeight: "bolder",
              }}
              fullWidth
              onClick={save}
              disabled={saving}
            >
              {saving ? (
                <CircularProgress style={{ color: "white" }}></CircularProgress>
              ) : (
                "SAVE"
              )}
            </Button>
          </Grid>
        )}
        {sports.map((sport) => (
          <Sport key={sport._id} sport={sport} editSport={onEdit} />
        ))}
      </Grid>
    );
  }
}
