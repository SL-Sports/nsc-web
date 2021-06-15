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

const profileID = "60ac7adc658e534fb80b9f55";

const NewChequeCard = ({paymentID}) => {
    const classes = useStyles();
    const [chequeNum, setChequeNum] = useState("");

    const changeCheque = (event) => {
        setChequeNum(event.target.value);
        console.log(chequeNum);
    }

    const sendCheque = async () => {
        const body = {
            payment: paymentID,
            chequeNumber: chequeNum,
            createdBy: profileID
        };

        const newCheque = await paymentsService.newCheque(body);
        console.log(newCheque.data);
        setChequeNum("");
        alert(newCheque.data);

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
                                onChange={changeCheque} 
                                value={chequeNum} 
                                label="New Cheque Number" 
                                align="left"
                                fullWidth={true}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={2}>
                        <Grid container spacing={1}>
                            <Grid item sm={12}>
                                <IconButton
                                onClick={sendCheque}>
                                    <SendIcon color="primary"/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default NewChequeCard;