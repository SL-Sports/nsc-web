import { Typography, Grid, Card, Button, IconButton, CardMedia, TextField } from "@material-ui/core";
import { CheckBox, CheckBoxOutlineBlank} from "@material-ui/icons";
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import SendIcon from '@material-ui/icons/Send';
import moment from "moment";
import { Link } from "react-router-dom";
import Checkbox from '@material-ui/core/Checkbox';
import { theme, useStyles } from "./paymentsTheme";
import paymentsService from "../../services/paymentsService";
import React, {useState} from "react";
import Avatar from '@material-ui/core/Avatar';

const CommentCard = ({comment}) => {
    const classes = useStyles();
    const [editingMode, setEditingMode] = useState(false);
    const [commentText, setCommentText] = useState(comment.text);

    const deleteComment = async () => {
        const body = {
            id: comment._id,
            text: comment.text,
            isDeleted: true,
        };

        const editedComment = await paymentsService.editComment(body);
        alert(editedComment.data);
    };

    const editComment = () => {
        setEditingMode(!editingMode)
    }

    const changeComment = (event) => {
        setCommentText(event.target.value);
        console.log(commentText);
    };

    const saveEditedComment = async () => {
        const body = {
            id: comment._id,
            text: commentText,
            isDeleted: false,
        };

        const editedComment = await paymentsService.editComment(body);
        setEditingMode(!editingMode);
        console.log(editedComment.data);
        alert(editedComment.data.message);
    };


    return (
        <Grid item sm={12}>
            <Card className={classes.card}>
                <Grid container spacing={1}>
                    <Grid item sm={10}>
                        <Grid container spacing={1}>
                            <Grid item sm={2}>
                                <Avatar 
                                alt={comment.createdBy.preferredName + " " + comment.createdBy.lastName}
                                src={comment.createdBy.profilePicUrl}/>
                            </Grid>
                            <Grid item sm={10}>
                                <Typography variant="h6">
                                    {comment.createdBy.preferredName + " " + comment.createdBy.lastName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item sm={2}>
                        
                            </Grid>
                            <Grid item sm={10} align="left">
                                {!editingMode && <Typography>
                                    {comment.text}
                                </Typography>}
                                {editingMode && 
                                <TextField
                                onChange={changeComment}
                                value={commentText}>

                                </TextField>
                                
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={2}>
                        <Grid container spacing={1}>
                            <Grid item sm={12}>
                                <IconButton
                                onClick={deleteComment}>
                                    <ClearIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item sm={12}>
                                {!editingMode && <IconButton
                                 onClick={editComment}>
                                    <EditIcon/>
                                </IconButton>}
                                {editingMode && <IconButton onClick={saveEditedComment}>
                                    <SendIcon/>
                                    </IconButton>}
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                

            </Card>
        </Grid>
    )

}

export default CommentCard;