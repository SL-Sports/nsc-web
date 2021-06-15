import React from "react";
import NavBar from "../navbar";

export default function Profiles() {
  return (
    <>
      <NavBar
        title="Profiles"
        profilePicEnabled
        menuEnabled
        profilesSelected
      ></NavBar>
      <h1>Profiles</h1>
    </>
  );
}
