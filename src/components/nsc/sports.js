import React, { useState, useEffect } from "react";
import {
  getSports,
  editSport,
  getSportById,
  addSport,
} from "../../services/sportService";
import { theme, useStyles } from "./nscTheme";
import {
  Typography,
  Grid,
  Card,
  IconButton,
  TextField,
  CircularProgress,
  Container,
} from "@material-ui/core";
import { Edit, Add, Close } from "@material-ui/icons";

export default function Sports() {
  const classes = useStyles();
  const [sports, setSports] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  return <>sports</>;
}
