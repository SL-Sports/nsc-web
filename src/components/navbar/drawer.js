import React from "react";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@material-ui/core";
import {
  Speed as DashboardIcon,
  Home as HomeIcon,
  Contacts as ProfileIcon,
  MonetizationOn as PaymentIcon,
  VideogameAsset as RankingIcon,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { theme, useStyles } from "./navBarTheme";

const HeaderDrawer = ({
  open,
  setDrawerOpen,
  dashboardSelected,
  profilesSelected,
  paymentsSelected,
  rankingsSelected,
  isNSCAdmin,
}) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      <Drawer anchor={"left"} open={open} onClose={() => setDrawerOpen(false)}>
        <div className={classes.drawerHeader}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            align="left"
            style={{ fontWeight: "bolder" }}
          >
            SL Sports
          </Typography>
        </div>

        <Divider />
        <div
          style={{
            width: "auto",
          }}
          role="presentation"
        >
          <List>
            {isNSCAdmin && (
              <ListItem
                button
                style={{ marginRight: 80 }}
                onClick={() => history.push("/")}
              >
                <ListItemIcon>
                  <HomeIcon></HomeIcon>
                </ListItemIcon>
                <ListItemText primary="NSC Home" />
              </ListItem>
            )}
            <ListItem
              button
              selected={dashboardSelected}
              style={{ marginRight: 80 }}
              onClick={() => history.push("/dashboard")}
            >
              <ListItemIcon>
                <DashboardIcon></DashboardIcon>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              selected={profilesSelected}
              button
              style={{ marginRight: 80 }}
              onClick={() => history.push("/profiles")}
            >
              <ListItemIcon>
                <ProfileIcon></ProfileIcon>
              </ListItemIcon>
              <ListItemText primary="Profiles" />
            </ListItem>

            <ListItem
              selected={paymentsSelected}
              button
              style={{ marginRight: 80 }}
              onClick={() => history.push("/payments")}
            >
              <ListItemIcon>
                <PaymentIcon></PaymentIcon>
              </ListItemIcon>
              <ListItemText primary="Payments" />
            </ListItem>
            <ListItem
              selected={rankingsSelected}
              button
              style={{ marginRight: 80 }}
              onClick={() => history.push("/rankings")}
            >
              <ListItemIcon>
                <RankingIcon></RankingIcon>
              </ListItemIcon>
              <ListItemText primary="Rankings" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default HeaderDrawer;
