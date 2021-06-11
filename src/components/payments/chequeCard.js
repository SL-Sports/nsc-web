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

const ChequeCard = ({cheque}) => {
    const classes = useStyles();
    const [editingMode, setEditingMode] = useState(false);

    const [chequeNumber, setChequeNumber] = useState(cheque.chequeNumber);
    const [chequeCollected, setChequeCollected] = useState(cheque.collected);


    const deleteCheque = async () => {
        const body = {
            id: cheque._id,
            isDeleted: true,
            chequeNumber: cheque.chequeNumber
        };

        const deletedCheque = await paymentsService.editCheque(body);
        console.log(deletedCheque.data);
        alert(deletedCheque.data.message);
    };

    const saveEditedCheque = async () => {
        const body = {
            id: cheque._id,
            isDeleted: false,
            chequeNumber: chequeNumber
        };

        const editedCheque = await paymentsService.editCheque(body);
        setEditingMode(!editingMode);
        console.log(editedCheque.data);
        alert(editedCheque.data.message);
    };

    const changeChequeNumber = (event) => {
        setChequeNumber(event.target.value);
        console.log(chequeNumber);
    };

    const editCheque = () => {
        setEditingMode(!editingMode);
    };

    const collectCheque = async () => {
        const body = {
            chequeId: cheque._id
        };
        
        const collectedCheque = await paymentsService.collectCheque(body);
        setChequeCollected(true);
        console.log(collectedCheque.data);
        alert(collectedCheque.data.message);
    }

    return (
        <Grid item sm={12}>
            <Card className={classes.card}>
                <Grid container spacing={1}>
                    <Grid item sm={10}>
                        <Grid container spacing={1}>
                            <Grid item sm={2}>
                                <img src={cheque.createdBy.profilePicUrl} width="100%"/>
                            </Grid>
                            <Grid item sm={10}>
                                <Typography variant="h6">
                                    {cheque.createdBy.preferredName + " " + cheque.createdBy.lastName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item sm={2}>
                        
                            </Grid>
                            <Grid item sm={10} align="left">
                                {
                                !editingMode && <Typography>
                                    Cheque #{chequeNumber}
                                </Typography>
                                }
                                {
                                editingMode && 
                                <TextField
                                onChange={changeChequeNumber}
                                value={chequeNumber}>
                                </TextField>
                                }
                            </Grid>
                            <Grid item sm={6}>
                                <Typography>
                                    Cheque collected? Click to mark collected
                                </Typography>
                            </Grid>
                            <Grid item sm={3}>
                                <Checkbox 
                                    checked={chequeCollected}
                                    onClick={collectCheque}
                                    />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={2}>
                        <Grid container spacing={1}>
                            <Grid item sm={12}>
                                <IconButton
                                onClick={deleteCheque}>
                                    <ClearIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item sm={12}>
                                {!editingMode && <IconButton
                                 onClick={editCheque}>
                                    <EditIcon/>
                                </IconButton>}
                                {editingMode && <IconButton onClick={saveEditedCheque}>
                                    <SendIcon/>
                                    </IconButton>}
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                

            </Card>
        </Grid>
    )
};

export default ChequeCard;