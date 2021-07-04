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
  let date = moment.unix(unixTime).utc();
  return date.format("LL");
};

const getAge = (dobUnix) => {
  var birthday = moment(moment.unix(dobUnix)).format("dd-MMM-yyyy");
  var curTime = moment();
  var age = moment.duration(curTime.diff(birthday));
  var years = age.years();
  return years.toString();
};

export { getMonth, getYear, getDay, getDOB, getAge };
