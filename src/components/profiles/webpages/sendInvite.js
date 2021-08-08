import React, { useState } from "react";
import { sendInvite } from "../../../services/profileService";
import { theme } from "../profilesTheme";
import {
  Typography,
  CssBaseline,
  Container,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  Button,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../../navbar";

const accountTypesList = ["ATHLETE", "COACH", "ASSOCIATION_ADMIN"];
export default function NewRanking() {
  const [accountType, setAccountType] = useState("ATHLETE");
  const [phone, setPhone] = useState("");
  const { profileID } = useParams();
  const [saving, setSaving] = useState(false);
  const history = useHistory();

  const save = async () => {
    setSaving(true);
    //TODO: restrict profiles to within sport
    const saveRes = await sendInvite(phone, accountType, profileID);
    setSaving(false);
    if (saveRes.status === 200) {
      history.replace("/profiles/" + profileID);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <NavBar title="Send Invite" backButtonEnabled associationNameEnabled />
        <main>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <Select
                  id="account-type"
                  fullWidth
                  color="secondary"
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  style={{ textAlign: "left", height: "100%" }}
                >
                  {accountTypesList.map((type, index) => (
                    <MenuItem value={type}>
                      <Typography
                        variant="h5"
                        style={{
                          fontWeight: "bolder",
                          paddingLeft: 8,
                          fontStyle: "italic",
                        }}
                      >
                        {type}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  color="secondary"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  placeholder="7XXXXXXXX"
                  autoComplete="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Button
                  style={{
                    background: theme.palette.primary.mainGradient,
                    color: "white",
                    borderRadius: 20,
                    fontWeight: "bolder",
                    marginTop: 50,
                    padding: 10,
                  }}
                  fullWidth
                  onClick={save}
                  disabled={saving}
                >
                  {saving ? (
                    <CircularProgress
                      style={{ color: "white" }}
                    ></CircularProgress>
                  ) : (
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bolder" }}
                    >
                      SEND INVITE
                    </Typography>
                  )}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </main>
      </CssBaseline>
    </ThemeProvider>
  );
}
