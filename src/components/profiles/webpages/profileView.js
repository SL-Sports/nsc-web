import React from "react";
import { useParams } from "react-router-dom";

export default function ProfileView() {
  const { profileID } = useParams();

  return <>{profileID}</>;
}
