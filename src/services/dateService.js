import moment from "moment";

const getMonth = (unixTime) => {
  let date = moment.unix(unixTime);
  return moment(date).format("MMM");
};
const getYear = (unixTime) => {
  let date = moment.unix(unixTime);
  return moment(date).format("yyyy");
};
const getDay = (unixTime) => {
  let date = moment.unix(unixTime);
  return moment(date).format("DD");
};

const getDOB = (unixTime) => {
  let date = moment.unix(unixTime);
  return moment(date).format("LL");
};

export { getMonth, getYear, getDay, getDOB };
