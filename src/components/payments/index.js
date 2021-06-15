import React from "react";
import NavBar from "../navbar";

export default function Payments() {
  return (
    <>
      <NavBar
        title="Payments"
        profilePicEnabled
        menuEnabled
        paymentsSelected
      ></NavBar>
      <h1>Payments</h1>
    </>
  );
}
