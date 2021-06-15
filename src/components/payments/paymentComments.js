import { Grid, Card } from "@material-ui/core";
import PaymentComment from "./paymentComment";
import { useStyles } from "./paymentsTheme";

const PaymentComments = ({ comments }) => {
  const classes = useStyles();

  return (
    <Card className={classes.commentsCard}>
      <Grid container spacing={2} direction="column">
        {comments.map((comment) => (
          <PaymentComment key={comment._id} comment={comment} />
        ))}
      </Grid>
    </Card>
  );
};

export default PaymentComments;