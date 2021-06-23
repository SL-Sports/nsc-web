import {
  AppBar,
  Typography,
  IconButton,
  Avatar,
  Toolbar,
  Menu,
  MenuItem,
  Fade,
} from "@material-ui/core";
import { ArrowBack, Menu as MenuIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { theme } from "./navBarTheme";

import authService from "../../services/authService";

const Header = ({
  title,
  backButtonEnabled,
  menuEnabled,
  profilePicEnabled,
  profileId,
  profilePicUrl,
  setDrawerOpen,
}) => {
  const history = useHistory();
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const open = Boolean(profileMenuAnchor);

  return (
    <AppBar
      style={{
        background: theme.palette.primary.mainGradient,
        marginBottom: 30,
      }}
      position="relative"
    >
      <Toolbar>
        {menuEnabled && (
          <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
            <MenuIcon />
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
          style={{ width: "95%" }}
          align="left"
        >
          {title}
        </Typography>

        {profilePicEnabled && (
          <Avatar
            raised
            src={profilePicUrl}
            onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
          ></Avatar>
        )}
        <Menu
          id="fade-menu"
          anchorEl={profileMenuAnchor}
          keepMounted
          open={open}
          onClose={() => setProfileMenuAnchor(null)}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => history.push(`/profiles/${profileId}`)}>
            My Profile
          </MenuItem>
          <MenuItem onClick={async () => await authService.logout()}>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
