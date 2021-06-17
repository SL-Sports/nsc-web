import {
  Grid,
  Card,
  IconButton,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useStyles, theme } from "../paymentsTheme";
import paymentsService from "../../../services/paymentsService";
import React, { useState } from "react";

const NewCommentCard = ({ paymentID, reload }) => {
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");
  const [saving, setSaving] = useState(false);

  const changeComment = (event) => {
    setCommentText(event.target.value);
  };

  const sendComment = async () => {
    setSaving(true);
    const body = {
      text: commentText,
      payment: paymentID,
    };

    const newComment = await paymentsService.newComment(body);
    await reload();
    setCommentText("");
    setSaving(false);

    if (newComment.status !== 200) {
      alert(newComment.data.message);
    }
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
          {saving ? (
            <CircularProgress color="primary"></CircularProgress>
          ) : (
            <IconButton
              onClick={sendComment}
              style={{ color: theme.palette.primary.main }}
              disabled={saving}
            >
              <SendIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default NewCommentCard;
