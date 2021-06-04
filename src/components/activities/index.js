import React, { useState, useEffect } from 'react';
import activityService from '../../services/activityService';
import { AppBar, createMuiTheme, Typography, Toolbar, CssBaseline, Container, Grid, CardContent, Card, Button, CardMedia, CardActions, makeStyles } from '@material-ui/core';
import COLORS from '../../colors';
import { CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import moment from 'moment';

const profileId = '60ac7a65658e534fb80b9f52';

const theme = createMuiTheme({
    palette: {
        primary:{
            main: COLORS.blueGradientStart,
            mainGradient: "linear-gradient(to right,#0575e6, #021b79)"
        },
        secondary:{
            main: COLORS.blueGradientStart,
            mainGradient: "linear-gradient(to right,#f7971e, #ffd200)"
        }
    }
});

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      borderRadius: 20
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    dateCard:{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
      background: theme.palette.secondary.mainGradient,
      borderRadius: 20
    }
  }));

export default function Activities() {
    const classes = useStyles();


    const [activities, setActivities] = useState([]);

    const getMonth = (unixTime) =>{
        let date = moment.unix(unixTime);
        return moment(date).format('MMM');
    };
    const getYear = (unixTime) =>{
        let date = moment.unix(unixTime);
        return moment(date).format('yyyy');
    };
    const getDay = (unixTime) =>{
        let date = moment.unix(unixTime);
        return moment(date).format('DD');
    };

    useEffect(() => {
        const getActivities = async () => {
          const activitiesRes = await activityService.getActivities(profileId);
          if(activitiesRes.status === 200){
            setActivities(activitiesRes.data);
          }
        }
    
        getActivities();
      }, [])


    return (
        <>
            <CssBaseline>
                <AppBar style={{ background: theme.palette.primary.mainGradient }} position="relative" >
                    <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Activities - Tiger Woods
                    </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <Container className={classes.cardGrid} maxWidth="sm">
                        <Grid container spacing={2}>
                            {activities.map((activity) => (
                            <Grid item key={activity.activity._id} xs={12} sm={12} md={12}>
                                <Card className={classes.card}>
                                <Grid container spacing = {2}  style={{height:"100%" }}>
                                    <Grid item xs = {3}>
                                        <Card className={classes.dateCard} style={{ background: theme.palette.secondary.mainGradient, height:'100%'}}>
                                            <div style={{margin:'auto', paddingBottom: 4}}>
                                            <Typography style = {{color: "white", fontWeight: 'bolder'}}>{getMonth(activity.activity.startTime)}</Typography>
                                            <Typography style = {{color: "white", fontWeight: 'bolder'}}>{getDay(activity.activity.startTime)}</Typography>
                                            <Typography style = {{color: "white", fontWeight: 'bolder'}}>{getYear(activity.activity.startTime)}</Typography>
                                            </div>
                                            <Typography style = {{color: "white", fontWeight: 'bolder', fontStyle: 'italic'}}>{activity.activity.activityType.activityType}</Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs = {9}>
                                        <Grid container spacing = {1}>
                                            <Grid item xs = {10}>
                                                <Typography gutterBottom variant="h5"  align="left" style={{fontWeight:'bolder'}}>
                                                    {activity.activity.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs = {2} >
                                                {activity.activity.isApproved?<CheckBox fontSize='large' style={{color:"green"}}/>:<CheckBoxOutlineBlank fontSize='large' style={{color:"red"}}/>}
                                            </Grid>
                                        </Grid>
                                        
                                        <Typography gutterBottom align="left" style={{paddingTop:15, paddingBottom:15}}>
                                            {activity.activity.description}
                                        </Typography>
                                        
                                        <Button  style={{background: theme.palette.primary.mainGradient, color: 'white', borderRadius: 20, fontWeight:'bolder'}} fullWidth>
                                            SEE MORE
                                        </Button>
                                    </Grid>
                                </Grid>
                                    
                                
                                </Card>
                            </Grid>
                            ))}
                        </Grid>
                    </Container>
                    {/* <ul>
                        { activities.map(
                            activity => 
                                <li key={activity.activity._id}>{activity.activity.title}</li>
                                )}
                    </ul> */}
                </main>
            </CssBaseline>
        </>
    );
}