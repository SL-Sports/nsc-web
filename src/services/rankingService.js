import axios from "axios";

const baseUrl = "https://slsports.anuda.me/profile/";
const token =
  "Sx5LzLrNEFhsa6EYlWI7PVaopfOX0pDv9IMzgwcnvb8HH164mpw8k95kCMVkgu2mGNCY6IkVUOZP4e1mHKMtQzTsxprgBtP8rn4kHgpfmLvOOJfzGyutnZUutXvUaBqA";

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

export async function getRankingById(id) {
  const url = baseUrl + "rankings/get";
  const body = {
    _id: id,
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

export async function editRanking(id, ranking, rankingType, profileId) {
  const url = baseUrl + "/rankings/edit";
  const body = {
    ranking: ranking,
    rankingType: rankingType,
    profile: profileId,
    _id: id,
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
