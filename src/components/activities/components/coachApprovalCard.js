import { Typography, Grid, Card, Avatar } from "@material-ui/core";
import { Schedule } from "@material-ui/icons";
import moment from "moment";

import { useStyles } from "../activityTheme";

const CoachApprovalCard = ({
  isApproved,
  approvedBy,
  approvedAt,
  createdAt,
}) => {
  const classes = useStyles();

  const formatDate = (unixTime) => {
    let date = moment.unix(unixTime);
    return moment(date).format("HH:mm, DD/MM/yyyy");
  };

  return (
    <Card className={classes.card}>
      <Grid
        container
        alignItems="center"
        alignContents="center"
        justify="center"
        spacing={2}
      >
        <Grid item xs={9}>
          <Typography
            gutterBottom
            variant="h5"
            align="left"
            style={{ fontWeight: "bolder" }}
          >
            {isApproved
              ? "Approved by " +
                approvedBy.profileType +
                " " +
                approvedBy.preferredName
              : "Waiting for Coach Approval"}
          </Typography>
          <Typography gutterBottom variant="subtitle1" align="left">
            {isApproved
              ? "at " + formatDate(approvedAt)
              : "since " + formatDate(createdAt)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {isApproved ? (
            <Avatar
              src={approvedBy.profilePicUrl}
              style={{ width: 70, height: 70, float: "right" }}
            ></Avatar>
          ) : (
            <Schedule
              style={{
                width: 70,
                height: 70,
                float: "right",
                color: "grey",
              }}
            ></Schedule>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CoachApprovalCard;
