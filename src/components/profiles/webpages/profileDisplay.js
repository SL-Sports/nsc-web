import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Card,
  Avatar,
  Typography,
  Button,
  CircularProgress,
  CssBaseline,
  List,
  ListItemAvatar,
  ListItemText,
  Fab,
  IconButton,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getDOB } from "../../../services/dateService";
import { CoachList, StudentList } from "../components/profileList";
import NavBar from "../../navbar";
import { useParams, useHistory } from "react-router-dom";
import { theme, useStyles } from "../profilesTheme";
import { getProfile } from "../../../services/profileService";
import { ListItem } from "@material-ui/core";
import {
  Person,
  Cake,
  PermContactCalendar,
  School,
  Room,
  Edit as EditIcon,
  Home,
  Money,
  Computer,
  Phone,
  ConfirmationNumber,
  Sports,
} from "@material-ui/icons";
import ActivitiesList from "../../activities/components/activitiesList";
import paymentsService from "../../../services/paymentsService";
import PaymentsList from "../../payments/components/paymentsList";
import RankingsList from "../../rankings/components/rankingsList";
import { getRankingsForProfile } from "../../../services/rankingService";
import authService from "../../../services/authService";
import { getAge } from "../../../services/dateService";

function title(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function ProfileDisplay() {
  const [profileHeader, setProfileHeader] = useState(undefined);
  const [profile, setProfile] = useState(undefined);
  const history = useHistory();
  const { profileID } = useParams();
  const classes = useStyles();

  const [payments, setPayments] = useState(undefined);
  const [rankings, setRankings] = useState(undefined);
  const [accountType, setAccountType] = useState(undefined);
  const [isCoach, setIsCoach] = useState(false);
  useEffect(() => {
    async function getProfileData() {
      setAccountType(await authService.getAccountType());
      const profileResponse = await getProfile(profileID);

      if (profileResponse.status === 200) {
        // If request is good get profile
        const profileList = profileResponse.data;
        setProfile(profileList[0].profile);
        setProfileHeader(profileList[0]);
        setIsCoach(profileList[0].profile.profileType === "COACH");

        const paymentsResponse = await paymentsService.getPaymentsForProfile(
          profileID
        );

        const rankingsResponse = await getRankingsForProfile(profileID);

        if (rankingsResponse.status === 200) {
          setRankings(rankingsResponse.data);
        } else {
          alert(rankingsResponse.data);
          setRankings([]);
        }
        if (paymentsResponse.status === 200) {
          setPayments(paymentsResponse.data);
        } else {
          alert(paymentsResponse.data);
          setPayments([]);
        }
      } else {
        alert("Profile not found");
        history.replace("/profiles");
      }
    }

    getProfileData();
  }, [profileID, history, setProfile]);

  if (profile === undefined || profileHeader === undefined) {
    return (
      <>
        <CssBaseline>
          <main>
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
          </main>
        </CssBaseline>
      </>
    );
  } else {
    return (
      <>
        <NavBar
          backButtonEnabled
          title={`${profile.preferredName}'s Profile`}
          associationNameEnabled
        />
        <Container maxWidth="xl">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <Card raised className={classes.card}>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  spacing={2}
                  direction="column"
                >
                  <Grid item xs={12}>
                    <Avatar
                      src={profile.profilePicUrl}
                      style={{ width: 180, height: 180 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: "bolder", margin: "auto" }}
                    >
                      {profile.preferredName} {profile.lastName}
                    </Typography>
                    <Typography variant="subtitle1">
                      {`${title(profile.category)} ${title(
                        profile.profileType
                      )} - ${profile.sport.name}`}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      style={{ fontStyle: "italic" }}
                    >
                      {profile.association.name}
                    </Typography>
                  </Grid>
                </Grid>
                {!profile.hasSignedUp && (
                  <Button
                    style={{
                      background: theme.palette.primary.mainGradient,
                      color: "white",
                      borderRadius: 20,
                      fontWeight: "bolder",
                      marginTop: 15,
                      padding: 10,
                    }}
                    fullWidth
                    onClick={() => {
                      history.push(`/profiles/invite/${profile._id}`);
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bolder" }}
                    >
                      {profile.inviteSent
                        ? "Resend App Invite Code"
                        : "Send App Invite Code"}
                    </Typography>
                  </Button>
                )}
              </Card>
            </Grid>
            {/* <Grid item>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link
                    to={`/profiles/edit/${profile._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained" color="secondary">
                      Edit Profile
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Invite
                  </Button>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid item xs={12} md={6}>
              <Card className={classes.card} raised>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={6}>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <Person />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Full Name: ${profile.firstName} ${profile.lastName}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <PermContactCalendar />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Age: ${getAge(profile.dateOfBirth)}`}
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <Cake />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Birthday: ${getDOB(profile.dateOfBirth)}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <Room />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Location: ${profile.city}, ${profile.country}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <School />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`School: ${profile.school}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <Person />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Event(s): ${profile.eventNames}`}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <ConfirmationNumber />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`NIC #: ${profile.nic}`} />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <Home />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`Address: ${profile.address}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <Phone />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Contact No: ${profile.contactNumber}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <Sports />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`Club: ${profile.club}`} />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <Computer />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Occupation: ${profile.occupation}`}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            style={{
                              background: theme.palette.secondary.mainGradient,
                            }}
                          >
                            <Money />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Bank Details: ${profile.bankAccountNo}, ${profile.bankBranch} - ${profile.bankName}`}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item name="coaches-students" xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item md={11} xs={10}>
                  <Typography
                    variant="h5"
                    align="left"
                    style={{ fontWeight: "bolder" }}
                  >
                    {isCoach ? "Students" : "Coaches"}
                  </Typography>
                </Grid>

                <Grid item md={1} xs={2}>
                  <IconButton
                    color="primary"
                    aria-label="new-comment"
                    size="small"
                    onClick={() => {
                      if (isCoach) {
                        history.push(
                          `/profiles/coaches/new?coach=${profile._id}`
                        );
                      } else {
                        history.push(
                          `/profiles/coaches/new?athlete=${profile._id}`
                        );
                      }
                    }}
                  >
                    <Add />
                  </IconButton>
                </Grid>
                <Grid item xs={12} md={12}>
                  {isCoach ? (
                    <StudentList students={profileHeader.students} />
                  ) : (
                    <CoachList coaches={profileHeader.coaches} />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item name="rankings" xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item md={11} xs={10}>
                  <Typography
                    variant="h5"
                    align="left"
                    style={{ fontWeight: "bolder" }}
                  >
                    Rankings
                  </Typography>
                </Grid>

                <Grid item md={1} xs={2}>
                  <IconButton
                    color="primary"
                    aria-label="new-comment"
                    size="small"
                    onClick={() => history.push("/rankings/new")}
                  >
                    <Add />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <RankingsList rankings={rankings} forProfile />
                </Grid>
              </Grid>
            </Grid>
            <Grid item name="activities" xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    align="left"
                    style={{ fontWeight: "bolder" }}
                  >
                    Recent Activity
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ActivitiesList profileId={profile._id}></ActivitiesList>
                </Grid>
              </Grid>
            </Grid>
            <Grid item name="payments" xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={accountType === "NSC_ADMIN" ? 10 : 12}
                  md={accountType === "NSC_ADMIN" ? 11 : 12}
                >
                  <Typography
                    variant="h5"
                    align="left"
                    style={{ fontWeight: "bolder" }}
                  >
                    Payments
                  </Typography>
                </Grid>
                {accountType === "NSC_ADMIN" && (
                  <Grid item xs={2} md={1}>
                    <IconButton
                      color="primary"
                      aria-label="new-comment"
                      size="small"
                      onClick={() => history.push("/payments/new")}
                    >
                      <Add />
                    </IconButton>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <PaymentsList payments={payments} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <Link to={"/profiles/edit/" + profile._id}>
          <Fab aria-label="edit" className={classes.fab}>
            <IconButton>
              <EditIcon style={{ color: "white" }} />
            </IconButton>
          </Fab>
        </Link>
      </>
    );
  }
}
