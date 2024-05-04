"use client";

import Link from 'next/link'
import { AppBar, Button, Container, List, ListItem, Paper } from "@mui/material";
import { Clock, clockType } from './clock';
import { useState } from 'react';
// import { useLocalStorage } from '@uidotdev/usehooks';

import * as React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { theme } from '@/imports/theme';

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const Clocks = () => {
    // const [clocks, setClocks] = useLocalStorage<clockType[]>("clockData", [])
    const [clocks, setClocks] = useState<clockType[]>([])
    const theme = useTheme();
    return (
        <Container>
            <List>
                <ListItem>
                    <Link href="/">Home</Link>
                </ListItem>
                <ListItem>
                    <Link href="/clocks">Clocks</Link>
                </ListItem>
            </List>
            <Grid container>

                {clocks.map(
                    (clock, index) => <Clock
                        key={clock.uuid}
                        clock={clock}
                        setClock={(newClock) => {
                            clocks[index] = newClock;
                            setClocks([...clocks])
                        }}
                        deleteClock={()=>setClocks(c=>c.filter(i=>i.uuid !== clock.uuid))}
                    />)}
            </Grid>
            <Button onClick={() => setClocks([...clocks, { filled: 0, size: 4, title: "New Clock", uuid: makeid(12), color:theme.palette.grey[600] }])}>Add Clock</Button>
        </Container>
    );
}


export default function Dashboard() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute">
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Paper>

                            <Grid container spacing={3}>
                                <Clocks />
                            </Grid>
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}