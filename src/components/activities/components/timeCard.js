import { Typography, Card } from "@material-ui/core";
import moment from "moment";

import { useStyles } from "../activityTheme";

const TimeCard = ({ labelText, time }) => {
  const classes = useStyles();

  const formatDate = (unixTime) => {
    let date = moment.unix(unixTime);
    return moment(date).format("MMM DD, yyyy");
  };

  const formatTime = (unixTime) => {
    let date = moment.unix(unixTime);
    return moment(date).format("HH:mm");
  };

  return (
    <Card className={classes.card}>
      <Typography variant="subtitle1" style={{ color: "grey" }}>
        {labelText}
      </Typography>
      <Typography
        variant="h4"
        style={{ fontWeight: "bolder", marginBottom: 10, marginTop: 10 }}
      >
        {formatTime(time)}
      </Typography>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        {formatDate(time)}
      </Typography>
    </Card>
  );
};

export default TimeCard;
