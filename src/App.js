import "./App.css";
import React from "react";

import Routes from "./components/routes";
import { ProvideAuth } from "./features/auth";

function App() {
  return (
    <ProvideAuth>
      <Routes />
    </ProvideAuth>
  );
}

export default App;
