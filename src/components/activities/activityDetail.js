import React from "react";
import { useParams } from "react-router-dom";

export default function ActivityDetail() {
  const { activityId } = useParams();
  return (
    <>
      <h1>Activity Detail - {activityId}</h1>
    </>
  );
}
