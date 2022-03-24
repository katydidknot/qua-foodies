import {AppBar, Grid, IconButton, Toolbar, Typography} from '@mui/material';
import React from 'react';
import './App.css';
import {Choropleth} from "./Choropleth";
import {YearSelect} from "./Components/Select";


function App() {
    return (
        <div className="App" style={{backgroundColor: "#E3ECE9"}}>
            <AppBar position="static">
                <Toolbar sx={{backgroundColor: "#3b1954"}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container justifyContent={"center"} sx={{backgroundColor: "#E3ECE9"}}>
                <Grid item xs={8}><YearSelect/></Grid>
                <Grid item xs={12}>
                    <Typography variant={"h4"} sx={{margin: "2rem", color: "#1E000E", fontFamily: 'Mulish', fontWeight: "800"}}>Restaurant Closings</Typography>
                </Grid>
                <Grid item xs={12} sx={{margin: "2rem", height: "75vh", width: "100vw"}}>
                    <Choropleth/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;


