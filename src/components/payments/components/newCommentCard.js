import { Grid, Card, IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useStyles } from "../paymentsTheme";
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
    <Grid item sm={12}>
      <Card className={classes.card}>
        <Grid container spacing={1}>
          <Grid item sm={10}>
            <Grid container spacing={1}>
              <Grid item sm={2}></Grid>
              <Grid item sm={10} align="left">
                <TextField
                  onChange={changeComment}
                  value={commentText}
                  label="New Comment"
                  align="left"
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2}>
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <IconButton onClick={sendComment}>
                  <SendIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default NewCommentCard;
