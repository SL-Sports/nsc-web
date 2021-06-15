import {
  AppBar,
  Typography,
  IconButton,
  Avatar,
  Toolbar,
  Button,
} from "@material-ui/core";
import { ArrowBack, Menu, ExitToApp } from "@material-ui/icons";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useStyles, theme } from "./navBarTheme";

import authService from "../../services/authService";

const Header = ({
  title,
  backButtonEnabled,
  menuEnabled,
  logOutEnabled,
  profileId,
  profilePicEnabled,
  profilePicUrl,
  setDrawerOpen,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar
      style={{ background: theme.palette.primary.mainGradient }}
      position="relative"
    >
      <Toolbar>
        {menuEnabled && (
          <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
            <Menu />
          </IconButton>
        )}
        {backButtonEnabled && (
          <IconButton onClick={history.goBack} color="inherit">
            <ArrowBack />
          </IconButton>
        )}
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          style={{ flexGrow: 1 }}
          align="left"
        >
          {title}
        </Typography>
        {logOutEnabled && (
          <IconButton
            onClick={async () => await authService.logout()}
            color="inherit"
            size="medium"
          >
            <ExitToApp fontSize="large" />
          </IconButton>
        )}
        {profilePicEnabled && (
          <Avatar
            src={profilePicUrl}
            onClick={() => history.push(`/profiles/${profileId}`)}
          ></Avatar>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
