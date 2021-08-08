import { Grid, Card } from "@material-ui/core";
import ActivityComment from "./activityComment";
import { useStyles } from "../activityTheme";

const ActivityComments = ({ comments }) => {
  const classes = useStyles();

  return (
    <Card className={classes.commentsCard}>
      <Grid container spacing={2} direction="column">
        {comments.map((comment) => (
          <ActivityComment key={comment._id} comment={comment} />
        ))}
      </Grid>
    </Card>
  );
};

export default ActivityComments;
