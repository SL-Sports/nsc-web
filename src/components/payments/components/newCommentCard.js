import { Grid, Card, IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useStyles, theme } from "../paymentsTheme";
import paymentsService from "../../../services/paymentsService";
import React, { useState } from "react";

const NewCommentCard = ({ paymentID }) => {
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");

  const changeComment = (event) => {
    setCommentText(event.target.value);
  };

  const sendComment = async () => {
    const body = {
      text: commentText,
      payment: paymentID,
    };

    const newComment = await paymentsService.newComment(body);
    setCommentText("");
    alert(newComment.data);
  };

  return (
    <Card className={classes.card}>
      <Grid container spacing={1} alignItems="flex-end" justify="flex-end">
        <Grid item xs={10}>
          <TextField
            onChange={changeComment}
            color="secondary"
            value={commentText}
            label="New Comment"
            align="left"
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            onClick={sendComment}
            style={{ color: theme.palette.primary.main }}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default NewCommentCard;
