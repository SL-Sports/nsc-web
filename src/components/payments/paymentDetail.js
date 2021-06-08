import React, { useState, useEffect } from "react";
// import paymentService from "../../services/paymentService";
import { Add, AddComment, ArrowBack } from "@material-ui/icons";
import { Link, useParams } from "react-router-dom";
import {
  CircularProgress,
  CssBaseline,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  Button,
  IconButton,
  ThemeProvider,
} from "@material-ui/core";
import COLORS from "../../colors";
import { theme, useStyles } from "./paymentsTheme";
// import CoachApprovalCard from "./coachApprovalCard";
// import TimeCard from "./timeCard";
// import ActivityComments from "./activityComments";

const profileId = "60a7f13a8ae2f8ad47c5cd1a";

export default function PaymentDetail() {
    return (
        <>
        <Card>
            <Typography>
                Testing
            </Typography>
        </Card>
        </>
    )
};