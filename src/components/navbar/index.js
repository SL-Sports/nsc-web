import React, { useState, useEffect } from "react";
import Header from "./header";
import HeaderDrawer from "./drawer";

import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./navBarTheme";
import authService from "../../services/authService";

export default function NavBar({
  title,
  backButtonEnabled,
  menuEnabled,
  dashboardSelected,
  profilesSelected,
  paymentsSelected,
  rankingsSelected,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileId, setProfileId] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [isNSCAdmin, setNSCAdmin] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (menuEnabled) {
        let accountType = await authService.getAccountType();
        setNSCAdmin(accountType === "NSC_ADMIN");
      }

      setProfileId(await authService.getProfileID());
      setProfilePicUrl(await authService.getProfilePic());
    };

    loadData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Header
          title={title}
          backButtonEnabled={backButtonEnabled}
          menuEnabled={menuEnabled}
          profileId={profileId}
          profilePicEnabled={true}
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
          isNSCAdmin={isNSCAdmin}
        ></HeaderDrawer>
      </CssBaseline>
    </ThemeProvider>
  );
}
