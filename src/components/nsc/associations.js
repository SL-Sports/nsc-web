import React, { useState, useEffect } from "react";
import {
  getAssociations,
  editAssociations,
  getAssociationById,
  deleteAssociation,
  addAssociation,
} from "../../services/associationService";
import { theme, useStyles } from "./nscTheme";
import {
  Typography,
  Grid,
  Card,
  IconButton,
  Button,
  TextField,
  CircularProgress,
  Container,
} from "@material-ui/core";
import { Delete, Edit, Search, Add, Close } from "@material-ui/icons";
import Association from "./associationCard";

export default function Associations() {
  const classes = useStyles();
  const [associations, setAssociations] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const [searching, setSearching] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadAssociations = async () => {
    const associationsRes = await getAssociations();
    if (associationsRes.status === 200) {
      setAssociations(associationsRes.data);
    }
  };
  useEffect(() => {
    loadAssociations();
  }, []);
  const onEdit = async (association) => {};

  const onDelete = async (association) => {};
  if (associations === undefined) {
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
              // onClick={() => resetState()}
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
            // onClick={() => resetState()}
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
                background: theme.palette.primary.mainGradient,
                color: "white",
                borderRadius: 20,
                fontWeight: "bolder",
              }}
              fullWidth
              // onClick={save}
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
              value={name}
              autoFocus
              // onChange={(e) => setName(e.target.value)}
            />
          </Grid>
        )}
        {associations.map((association) => (
          <Association
            key={association._id}
            association={association}
            editAssociation={onEdit}
            deleteAssociation={onDelete}
          />
        ))}
      </Grid>
    );
  }
}
