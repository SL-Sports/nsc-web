import React, { useState } from "react";
import Header from "./header";
import HeaderDrawer from "./drawer";

import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { theme } from "./navBarTheme";

export default function NavBar({
  title,
  backButtonEnabled,
  menuEnabled,
  logOutEnabled,
  profileId,
  profilePicEnabled,
  profilePicUrl,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Header
          title="Hello John"
          menuEnabled={true}
          logOutEnabled={true}
          profilePicEnabled={true}
          profilePicUrl=""
          profileId="abc"
          setDrawerOpen={setDrawerOpen}
        ></Header>
        <HeaderDrawer
          open={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        ></HeaderDrawer>
      </CssBaseline>
    </ThemeProvider>
  );
}
