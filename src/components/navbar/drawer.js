import React from "react";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Speed as DashboardIcon,
  Home as HomeIcon,
  Contacts as ProfileIcon,
  MonetizationOn as PaymentIcon,
  VideogameAsset as RankingIcon,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { theme } from "./navBarTheme";

const HeaderDrawer = ({
  open,
  setDrawerOpen,
  dashboardSelected,
  profilesSelected,
  paymentsSelected,
  rankingsSelected,
}) => {
  const history = useHistory();

  return (
    <>
      <Drawer anchor={"left"} open={open} onClose={() => setDrawerOpen(false)}>
        <div
          style={{
            width: "auto",
          }}
          role="presentation"
        >
          <List>
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
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default HeaderDrawer;
