import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@material-ui/core';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

import { getProfiles } from '../../services/profileService';

function ProfileRow (props) {
    const profile = props.profile;

    return (
        <TableRow key={profile._id}>
            <TableCell>{ profile.firstName }</TableCell>
            <TableCell>{ profile.lastName }</TableCell>
            <TableCell>Test</TableCell>
        </TableRow>
    )
}

export default function Profiles () {
    // eslint-disable-next-line
    let [firstName, setFirstName] = useState("");
    // eslint-disable-next-line
    let [lastName, setLastName] = useState("");

    let [profiles, setProfiles] = useState([]);

    useEffect(() => {
        async function updateProfiles() {
            const profilesResponse = await getProfiles();
            setProfiles(profilesResponse.data);
        }

        updateProfiles();

        // Why does just this not work?
        // getProfiles().then(resp => {
        //     console.log(resp);
        // })
    }, []);

    return (
        <>
            <h1>
                Profiles
            </h1>
            <Box className="profile-list">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Preferred Name</TableCell>
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