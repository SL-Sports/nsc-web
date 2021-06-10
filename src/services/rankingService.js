import axios from "axios";

const baseUrl = "https://slsports.anuda.me/profile/";

export async function getRankings(rankingType, sport) {
  const url = baseUrl + "rankings/get";
  const body = {
    rankingType: rankingType,
    sport: sport,
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

export async function addRanking(ranking, rankingType, profile, sport) {}

export async function editRanking(
  id,
  ranking,
  rankingType,
  profile,
  isDeleted
) {}

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
