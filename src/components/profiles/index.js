import React, { useEffect, useState } from 'react';
import { Box, Paper, Grid, TextField } from '@material-ui/core';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
// eslint-disable-next-line
import { spacing } from "@material-ui/system";

import { getProfiles } from '../../services/profileService';

function ProfileRow (props) {
    const profile = props.profile;

    return (
        <TableRow key={profile._id}>
            <TableCell>{ profile.firstName }</TableCell>
            <TableCell>{ profile.lastName }</TableCell>
            <TableCell>{ profile.preferredName }</TableCell>
            <TableCell>{ profile.profileType }</TableCell>
        </TableRow>
    )
}

function ProfileFilterForm ({fields}) {
    return (
        <form>
            <Grid container alignItems="center" justify="center">
                <Grid item key="filter-label">
                    <Box mx={1}>
                        <h3>Filter:</h3>
                    </Box>
                </Grid>
                { fields.map( ({ field, value, setter }) => 
                    <Grid item key={field}>
                        <Box mx={1}>
                            <TextField 
                            name={field} 
                            label={field} 
                            value={value}
                            variant="outlined"
                            onChange = { (event) => setter (event.target.value) } />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </form>

    )
}

export default function Profiles () {
    // Profile lists
    let [profiles, setProfiles] = useState([]);
    // eslint-disable-next-line
    let [admins, setAdmins] = useState([]);
    // eslint-disable-next-line
    let [athletes, setAthletes] = useState([]);
    // eslint-disable-next-line
    let [coaches, setCoaches] = useState([]);

    // Form filter fields
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let fields = [
        { field: "First Name", value: firstName, setter: setFirstName },
        { field: "Last Name", value: lastName, setter: setLastName },
    ];

    useEffect(() => {
        async function updateProfiles() {
            const profilesResponse = await getProfiles(firstName, lastName);
            console.log(profilesResponse);
            if (profilesResponse.status === 200) {
                // If request is good get profiles
                const profiles = profilesResponse.data;

                // Set whole profiles list
                setProfiles(profiles
                    .sort(
                    (p1, p2) => {
                        return p1.profile.profileType.localeCompare(p2.profile.profileType);
                    }
                    )
                );

                // Get admins
                setAdmins(
                    profiles.filter(
                        (p) => {
                            return p.profile.profileType === "ADMIN";
                        }
                    )
                );

                // Get athletes
                setAthletes(
                    profiles.filter(
                        (p) => {
                            return p.profile.profileType === "ATHLETE";
                        }
                    )
                );

                // Get coaches
                setCoaches(
                    profiles.filter(
                        (p) => {
                            return p.profile.profileType === "COACH";
                        }
                    )
                );
            }
        }

        updateProfiles();

        // Why does just this not work?
        // getProfiles().then(resp => {
        //     console.log(resp);
        // })
    }, [firstName, lastName]);

    return (
        <>
            <h1>
                Profiles
            </h1>
            <Box name="profile-filter-form" my={2}>
                <ProfileFilterForm fields = {fields} />
            </Box>
            <Box name="profile-list">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Preferred Name</TableCell>
                                <TableCell>Profile Type</TableCell>
                            </TableRow>    
                        </TableHead>
                        <TableBody>
                            { profiles.map(profile => <ProfileRow key={profile.profile._id} profile={profile.profile} />) }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}