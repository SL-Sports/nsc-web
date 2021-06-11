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


const NewCommentCard = ({paymentID}) => {
    const classes = useStyles();
    const [commentText, setCommentText] = useState("");

    const changeComment = (event) => {
        setCommentText(event.target.value);
        console.log(commentText);
    }

    const sendComment = async () => {
        const body = {
            text: commentText,
            payment: paymentID
        };

        const newComment = await paymentsService.newComment(body);
        console.log(newComment.data);
        setCommentText("");
        alert(newComment.data);

    }


    return (
        <Grid item sm={12}>
            <Card className={classes.card}>
                <Grid container spacing={1}>
                    <Grid item sm={10}>
                        <Grid container spacing={1}>
                            <Grid item sm={2}>
                        
                            </Grid>
                            <Grid item sm={10} align="left">
                                <TextField 
                                onChange={changeComment} 
                                value={commentText} 
                                label="New Comment" 
                                align="left"
                                fullWidth={true}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={2}>
                        <Grid container spacing={1}>
                            <Grid item sm={12}>
                                <IconButton
                                onClick={sendComment}>
                                    <SendIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default NewCommentCard;