import axios from "axios";

const baseUrl = "https://slsports.anuda.me/association";
const token =
  "omHdMoX8HVao6Ui6aTfLhg8m6CNY6eNqazJFcWOl63fiJwbPg8PFYVa836xuL9uzgjhpmEuQjSDYUZFIsKg9ZN6oARoFJu5Vxl59rfOVmS19jBUqYvWVnmv4NwGaf2GX";

export async function getAllAssociations() {
  const url = baseUrl + "/get";

  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };

  let result = {};

  await axios
    .post(url, {}, config)
    .then((response) => {
      result.status = response.status;

      if (response.status === 200) {
        result.data = response.data;
      } else {
        result.data = response.data.message;
      }

      console.log(result);

      // return result;
    })
    .catch((err) => {
      result.status = err.response.status;
      result.data = err.response.data.message;

      // return result;
    });

  return result;
}
