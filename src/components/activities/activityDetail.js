import React, { useState, useEffect } from "react";
import activityService from "../../services/activityService";
import { useParams } from "react-router-dom";

export default function ActivityDetail() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(undefined);

  useEffect(() => {
    const getActivity = async () => {
      const activityRes = await activityService.getActivityDetail(activityId);
      if (activityRes.status === 200) {
        if (activityRes.data.length === 0) {
          alert("Invalid activity ID. Please try again.");
        } else {
          setActivity(activityRes.data[0]);
          console.log(activityRes.data[0]);
        }
      }
    };

    getActivity();
  }, []);
  return (
    <>
      <h1>
        Activity Detail -{" "}
        {activity !== undefined ? activity.activity.title : activityId}
      </h1>
    </>
  );
}
