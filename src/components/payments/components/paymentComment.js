import { Typography, Grid, Avatar } from "@material-ui/core";

const PaymentComment = ({ comment }) => {
  return (
    <Grid
      container
      alignItems="center"
      alignContents="center"
      justify="center"
      spacing={2}
      style={{ paddingBottom: 10 }}
    >
      <Grid item xs={2}>
        <Avatar
          src={comment.createdBy.profilePicUrl}
          style={{ width: 40, height: 40, float: "right" }}
        ></Avatar>
      </Grid>
      <Grid item xs={10}>
        <Typography
          variant="subtitle1"
          align="left"
          style={{ fontWeight: "bolder", marginBottom: 0 }}
        >
          {`${comment.createdBy.preferredName} ${comment.createdBy.lastName}`}
        </Typography>
        <Typography
          gutterBottom
          variant="body1"
          align="left"
          style={{ color: "grey" }}
        >
          {comment.text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PaymentComment;
