import Link from 'next/link'
import { AppBar, Button, Container, List, ListItem, Paper, Stack, TextField } from "@mui/material";
import { Clock, clockOutline, clockRadius, clockType } from '../../imports/clock';

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
import { useLocalStorage } from 'usehooks-ts';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
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
    const [clocks, setClocks] = useLocalStorage<clockType[]>("clockData", [], { initializeWithValue: false })
    // const [clocks, setClocks] = useState<clockType[]>([])
    const theme = useTheme();
    return (
        <Container>
            <Grid container>

                {clocks.map(
                    (clock, index) => <Clock
                        key={clock.uuid}
                        clock={clock}
                        setClock={(newClock) => {
                            clocks[index] = newClock;
                            setClocks([...clocks])
                        }}
                        deleteClock={() => setClocks(c => c.filter(i => i.uuid !== clock.uuid))}
                    />)}
                <Grid item display="flex" justifyContent={"center"} alignItems={"flex-end"}>
                    <IconButton size={"large"} onClick={() => setClocks([...clocks, {
                        filled: 0, size: 4, title: "", uuid: makeid(12),
                        color: theme.palette.grey[600]
                    }])}>
                        <MoreTimeIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Container >
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
                        <Stack direction="row" spacing={1} height="100%">

                            <Grid item>
                                <Link href="/">Home</Link>
                            </Grid>
                            <Grid item>
                                <Link href="/clocks">Clocks</Link>
                            </Grid>

                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Stack>
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