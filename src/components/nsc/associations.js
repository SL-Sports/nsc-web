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

export default function Associations() {
  const classes = useStyles();
  const [associations, setAssociations] = useState(undefined);
  const [saving, setSaving] = useState(false);
  const [searching, setSearching] = useState(false);
  const [editing, setEditing] = useState(false);

  return <>associations</>;
}
