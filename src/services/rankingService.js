import axios from "axios";

const baseUrl = "https://slsports.anuda.me/profile/";
const token =
  "yqmtNLYIgtRoyFl4qXZoca4tIjeJ5tarsIaJqt3Ni3qsw9sT5UMLzgqhVvmGmF1HmneNnlDMvwHRLCpMyMEL3VyzMx0MbhDaQELsSH64lywvtpcDGXdPS7tsr4IHSwAY";

export async function getRankings(rankingType, sport) {
  const url = baseUrl + "rankings/get";
  const body = {
    rankingType: rankingType,
    sport: sport,
    isDeleted: false,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let result = {};

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;
      if (response.status === 200) {
        result.data = response.data;
      } else {
        if (response.data.message !== undefined) {
          result.data = response.data.message;
        } else {
          result.data =
            "We encountered an error while retrieving ranking data. Please try again.";
        }
        alert(result.data);
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while retrieving ranking data. Please try again.";
      }
      alert(result.data);
    });

  return result;
}

export async function addRanking(ranking, rankingType, profileId, sportId) {
  const url = baseUrl + "/rankings/new";
  const body = {
    ranking: ranking,
    rankingType: rankingType,
    profile: profileId,
    sport: sportId,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };

  let result = {};

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;
      if (response.status === 200) {
        result.data = response.data.message;
      } else {
        if (response.data.message !== undefined) {
          result.data = response.data.message;
        } else {
          result.data =
            "We encountered an error while saving this ranking information. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while saving this ranking information. Please try again.";
      }
    });

  alert(result.data);
  return result;
}

export async function editRanking(
  id,
  ranking,
  rankingType,
  profileId,
  isDeleted
) {
  const url = baseUrl + "/rankings/edit";
  const body = {
    ranking: ranking,
    rankingType: rankingType,
    profile: profileId,
    _id: id,
    isDeleted: isDeleted,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };

  let result = {};

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;
      if (response.status === 200) {
        result.data = response.data.message;
      } else {
        if (response.data.message !== undefined) {
          result.data = response.data.message;
        } else {
          result.data =
            "We encountered an error while saving this ranking information. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while saving this ranking information. Please try again.";
      }
    });

  alert(result.data);
  return result;
}

export async function deleteRanking(rankingId) {
  const url = baseUrl + "/rankings/edit";
  const body = {
    _id: rankingId,
    isDeleted: true,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };

  let result = {};

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;
      if (response.status === 200) {
        result.data = response.data.message;
      } else {
        if (response.data.message !== undefined) {
          result.data = response.data.message;
        } else {
          result.data =
            "We encountered an error while deleting this ranking. Please try again.";
        }
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while deleting this ranking. Please try again.";
      }
    });

  alert(result.data);
  return result;
}

export async function profileSearch(query) {
  const url = baseUrl + "/search";

  let body = {};

  body.query = query;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let result = {};

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;
      if (response.status === 200) {
        result.data = response.data;
      } else {
        if (response.data.message !== undefined) {
          result.data = response.data.message;
        } else {
          result.data =
            "We encountered an error while retrieving profile data. Please try again.";
        }
        alert(result.data);
      }
    })
    .catch((err) => {
      result.status = err.response.status;
      if (err.response.data.message !== undefined) {
        result.data = err.response.data.message;
      } else {
        result.data =
          "We encountered an error while retrieving profile data. Please try again.";
      }
      alert(result.data);
    });

  return result;
}
