import React, { useState } from "react";
import Header from "./header";
import HeaderDrawer from "./drawer";

import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./navBarTheme";

export default function NavBar({
  title,
  backButtonEnabled,
  menuEnabled,
  profileId,
  profilePicEnabled,
  profilePicUrl,
  dashboardSelected,
  profilesSelected,
  paymentsSelected,
  rankingsSelected,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Header
          title={title}
          backButtonEnabled={backButtonEnabled}
          menuEnabled={menuEnabled}
          profileId={profileId}
          profilePicEnabled={profilePicEnabled}
          profilePicUrl={profilePicUrl}
          setDrawerOpen={setDrawerOpen}
        ></Header>
        <HeaderDrawer
          open={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          dashboardSelected={dashboardSelected}
          profilesSelected={profilesSelected}
          paymentsSelected={paymentsSelected}
          rankingsSelected={rankingsSelected}
        ></HeaderDrawer>
      </CssBaseline>
    </ThemeProvider>
  );
}
