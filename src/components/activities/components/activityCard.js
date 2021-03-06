import { Typography, Grid, Card, Button } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import moment from "moment";
import { Link } from "react-router-dom";

import { theme, useStyles } from "../activityTheme";

const Activity = ({ activity }) => {
  const classes = useStyles();

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

  return (
    <Grid item key={activity._id} xs={12} sm={12} md={12}>
      <Card className={classes.card}>
        <Grid container spacing={2} style={{ height: "100%" }}>
          <Grid item xs={4} sm={3} md={3} lg={3}>
            <Card
              className={classes.dateCard}
              style={{
                background: theme.palette.secondary.mainGradient,
                height: "100%",
              }}
            >
              <div style={{ margin: "auto", paddingBottom: 4 }}>
                <Typography style={{ color: "white", fontWeight: "bolder" }}>
                  {getMonth(activity.startTime)}
                </Typography>
                <Typography style={{ color: "white", fontWeight: "bolder" }}>
                  {getDay(activity.startTime)}
                </Typography>
                <Typography style={{ color: "white", fontWeight: "bolder" }}>
                  {getYear(activity.startTime)}
                </Typography>
              </div>
              <Typography
                noWrap
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontStyle: "italic",
                }}
              >
                {activity.activityType.activityType}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={8} sm={9} md={9} lg={9}>
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <Typography
                  gutterBottom
                  variant="h5"
                  align="left"
                  style={{ fontWeight: "bolder" }}
                >
                  {activity.title}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                {activity.isApproved ? (
                  <CheckBox fontSize="large" style={{ color: "green" }} />
                ) : (
                  <CheckBoxOutlineBlank
                    fontSize="large"
                    style={{ color: "red" }}
                  />
                )}
              </Grid>
            </Grid>

            <Typography
              gutterBottom
              align="left"
              style={{ paddingTop: 15, paddingBottom: 15 }}
            >
              {activity.description}
            </Typography>
            <Link to={"/activities/" + activity._id}>
              <Button
                style={{
                  background: theme.palette.primary.mainGradient,
                  color: "white",
                  borderRadius: 20,
                  fontWeight: "bolder",
                }}
                fullWidth
              >
                SEE MORE
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Activity;
