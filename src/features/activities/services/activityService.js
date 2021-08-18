import { postHTTP } from "../../../helpers/http";

class ActivityService {
  static getActivities = (profileId) => {
    const data = {
      profile: profileId,
    };

    return postHTTP("/activity/get", data, { withCredentials: true });
  };

  static getActivityDetail = (activityId) => {
    const data = {
      _id: activityId,
    };

    return postHTTP("/activity/get", data, { withCredentials: true });
  };

  static approveActivity = (activityId, approvedBy) => {
    const data = {
      activityId: activityId,
      approvedBy: approvedBy,
    };

    return postHTTP("/activity/approve", data, { withCredentials: true });
  };

  static addComment = (text, activityId) => {
    const data = {
      activity: activityId,
      text: text,
    };

    return postHTTP("/activity/comment/new", data, { withCredentials: true });
  };

  static mediaUpload = (file, mediaType, activityId) => {
    const formData = new FormData();
    formData.append("media", file);

    return postHTTP("/activities/media/upload", formData, {
      withCredentials: true,
    }).then((res) => {
      const data = {
        activity: activityId,
        urlToMedia: res.data.filePath,
        mediaType: mediaType,
      };

      return postHTTP("/activities/media/new", data, { withCredentials: true });
    });
  };

  static addActivityType = (activityType, association) => {
    const data = {
      association,
      activityType,
    };

    return postHTTP("/activities/type/new", data, { withCredentials: true });
  };

  static getActivityTypes = (association) => {
    const data = { association };

    return postHTTP("/activities/type/get", data, { withCredentials: true });
  };
}

export default ActivityService;
