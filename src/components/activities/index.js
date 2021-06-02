import React, { useState, useEffect } from 'react';
import activityService from '../../services/activityService';

const profileId = '60ac7a65658e534fb80b9f52';

export default function Activities() {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const getActivities = async () => {
          const activitiesRes = await activityService.getActivities(profileId);
          setActivities(activitiesRes.data);
        }
    
        getActivities();
      }, [])

    // if(activitiesRes.status !== 200){
    //     alert(activitiesRes.data);
    // }else{
    // }

    return (
        <>
            <h1>
                Activities - Tiger Woods
            </h1>
            <ul>
                { activities.map(
                    activity => 
                        <li key={activity.activity._id}>{activity.activity.title}</li>
                        )}
            </ul>
        </>
    );
}