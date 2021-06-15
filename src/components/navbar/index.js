import React from "react";
import Header from "./header";

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
  setDrawerOpen,
}) {
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
        ></Header>
      </CssBaseline>
    </ThemeProvider>
  );
}
