import React, { useState, useEffect } from "react";
import {
  getAssociations,
  editAssociation,
  addAssociation,
} from "../../services/associationService";
import { theme } from "./nscTheme";
import {
  Typography,
  Grid,
  IconButton,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Search, Add, Close } from "@material-ui/icons";
import Association from "./associationCard";

export default function Associations() {
  const [associations, setAssociations] = useState(undefined);
  const [filteredAssociations, setFilteredAssociations] =
    useState(associations);
  const [saving, setSaving] = useState(false);
  const [searching, setSearching] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [query, setQuery] = useState("");
  const [associationId, setAssociationId] = useState(undefined);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    let result = [];

    if (event.target.value.length === 0) {
      result = associations;
    } else {
      result = associations.filter((association) => {
        return (
          association.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
    }
    setFilteredAssociations(result);
  };

  const resetState = () => {
    setSaving(false);
    setSearching(false);
    setEditing(false);
    setName("");
    setDescription("");
    setQuery("");
    setAssociationId(undefined);
    setFilteredAssociations(associations);
  };

  const loadAssociations = async () => {
    const associationsRes = await getAssociations();
    if (associationsRes.status === 200) {
      setAssociations(associationsRes.data);
      setFilteredAssociations(associationsRes.data);
    }
  };

  useEffect(() => {
    loadAssociations();
  }, []);

  const save = async () => {
    setSaving(true);
    let saveRes = {};

    if (associationId === undefined) {
      saveRes = await addAssociation(name, description);
    } else {
      saveRes = await editAssociation(associationId, name, description);
    }

    if (saveRes.status === 200) {
      resetState();

      await loadAssociations();
    } else {
      setSaving(false);
    }
  };
  const onEdit = async (association) => {
    setSearching(false);
    setAssociationId(association._id);
    setName(association.name);
    setDescription(association.description);
    setEditing(true);
  };

  if (filteredAssociations === undefined) {
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
            Associations
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
        <Grid item xs={11} md={10} lg={10} xl={10}>
          <Typography
            variant="h4"
            align="left"
            style={{ fontWeight: "bolder" }}
          >
            Associations
          </Typography>
        </Grid>
        <Grid item xs={1} md={1} lg={1} xl={1}>
          {!(editing || searching) && (
            <IconButton
              color={editing || searching ? "secondary" : "primary"}
              aria-label="new-comment"
              size="medium"
              onClick={() => setSearching(true)}
              disabled={saving}
              style={{
                float: "right",
                textAlign: "right",
                margin: 0,
              }}
            >
              <Search fontSize="large"></Search>
            </IconButton>
          )}
        </Grid>
        <Grid item xs={12} md={1} lg={1} xl={1}>
          <IconButton
            color={editing || searching ? "secondary" : "primary"}
            aria-label="new-comment"
            size="medium"
            onClick={
              editing || searching ? () => resetState() : () => setEditing(true)
            }
            disabled={saving}
            style={{ float: "right" }}
          >
            {editing || searching ? (
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
              autoComplete="new association name"
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
                background: theme.palette.secondary.mainGradient,
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
        {searching && (
          <Grid item xs={12}>
            <TextField
              color="primary"
              variant="outlined"
              required
              fullWidth
              id="query"
              label="Search Associations"
              name="query"
              autoComplete="association search"
              value={query}
              autoFocus
              onChange={(e) => handleSearch(e)}
            />
          </Grid>
        )}
        {filteredAssociations.map((association) => (
          <Association
            key={association._id}
            association={association}
            editAssociation={onEdit}
            reloadAssociations={loadAssociations}
          />
        ))}
      </Grid>
    );
  }
}
