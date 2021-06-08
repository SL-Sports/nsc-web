import React, { useState, useEffect } from "react";
import activityService from "../../services/activityService";

import { Add, Close } from "@material-ui/icons";
import {
  CircularProgress,
  CssBaseline,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Card,
  Button,
  IconButton,
  ThemeProvider,
  Container,
  TextField,
} from "@material-ui/core";
import { theme, useStyles } from "./activityTheme";

const associationId = "60a7f13a8ae2f8ad47c5cd1a";

export default function ActivityTypes() {
  const [activityTypes, setActivityTypes] = useState(undefined);
  const [newTypeToggle, setNewTypeToggle] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newActivityType, setNewActivityType] = useState("");

  const classes = useStyles();

  const getActivityTypes = async () => {
    const activitiesRes = await activityService.getActivityTypes(associationId);
    if (activitiesRes.status === 200) {
      setActivityTypes(activitiesRes.data);
    }
  };

  useEffect(() => {
    getActivityTypes();
  }, []);

  const saveActivityType = async () => {
    setSaving(true);
    const saveRes = await activityService.addActivityType(
      newActivityType,
      associationId
    );
    alert(saveRes.data);
    setSaving(false);
    setNewActivityType("");
    setNewTypeToggle(false);
    if (saveRes.status === 200) {
      getActivityTypes();
    }
  };

  if (activityTypes === undefined) {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <CircularProgress
              style={{ color: theme.palette.primary.main, margin: "auto" }}
            ></CircularProgress>{" "}
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <AppBar
            style={{ background: theme.palette.primary.mainGradient }}
            position="relative"
          >
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Activity Types
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            <Container style={{ paddingTop: 30 }} maxWidth="sm">
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography
                    variant="h4"
                    align="left"
                    style={{ fontWeight: "bolder" }}
                  >
                    Activity Types
                  </Typography>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "right" }}>
                  <IconButton
                    color={newTypeToggle ? "secondary" : "primary"}
                    aria-label="new-activity-type"
                    size="small"
                    onClick={() => setNewTypeToggle(!newTypeToggle)}
                  >
                    {newTypeToggle ? (
                      <Close fontSize="large"></Close>
                    ) : (
                      <Add fontSize="large"></Add>
                    )}
                  </IconButton>
                </Grid>
                {newTypeToggle && (
                  <Grid item xs={8}>
                    <TextField
                      color="primary"
                      required
                      fullWidth
                      id="activityType"
                      label="Activity Type Name"
                      name="activityType"
                      autoComplete="activity type name"
                      autoFocus
                      value={newActivityType}
                      onChange={(e) => setNewActivityType(e.target.value)}
                    />
                  </Grid>
                )}
                {newTypeToggle && (
                  <Grid item xs={4}>
                    <Button
                      style={{
                        background: theme.palette.primary.mainGradient,
                        color: "white",
                        borderRadius: 20,
                        fontWeight: "bolder",
                      }}
                      disabled={saving}
                      fullWidth
                      onClick={saveActivityType}
                    >
                      {saving ? (
                        <CircularProgress
                          style={{ color: "white" }}
                        ></CircularProgress>
                      ) : (
                        "SAVE"
                      )}
                    </Button>
                  </Grid>
                )}
                {activityTypes.map((activityType) => (
                  <Grid item xs={12}>
                    <Card className={classes.card} style={{ width: "100%" }}>
                      <Typography
                        variant="h5"
                        style={{ fontWeight: "bolder" }}
                        align="left"
                      >
                        {activityType.activityType}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
        </CssBaseline>
      </ThemeProvider>
    );
  }
}
