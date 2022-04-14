import {Button, Divider, Drawer, Grid, Toolbar, Typography, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import React from 'react';
import './App.css';
import {Choropleth} from "./Choropleth";
import {YearSelect} from "./Components/Select";
import {CitySelect} from "./Components/CitySelect";
import {parseCsv} from "./LoadYelpData";


function App() {
    parseCsv()
    return (
        <div className="App" style={{backgroundColor: "#E3ECE9"}}>
            <Grid container>
                <Grid container>
                    <Drawer
                        sx={{
                            backgroundColor: "#E3ECE9",
                            width: "20%",
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: "20%",
                                boxSizing: 'border-box',
                            }
                        }}
                        variant="permanent"
                        anchor="left"
                    >
                        <Toolbar sx={{backgroundColor: "#656176", color: "white"}}>
                            <Typography variant={"h5"}>Select from
                                below:</Typography>
                        </Toolbar>
                        <Divider></Divider>
                        <Grid container direction={"row"} justifyContent={"space-evenly"} alignItems={"space-between"}>
                            <Grid item md={12}>
                                <CitySelect></CitySelect>
                            </Grid>
                            <Grid item md={1}></Grid>
                            <Grid item md={5}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Vegetarian" />
                                </FormGroup>
                            </Grid>
                            <Grid item md={5}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="BYOB" />
                                </FormGroup>
                            </Grid>
                            <Grid item md={1}></Grid>
                            <Grid item md={1}></Grid>
                            <Grid item md={5}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Family Friendly" />
                                </FormGroup>
                            </Grid>
                            <Grid item md={5}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Brunch" />
                                </FormGroup>
                            </Grid>
                            <Grid item md={1}></Grid>
                            <Grid item md={12}>
                                <Button
                                    sx={{color: "#280004", backgroundColor: "#E3ECE9", marginTop: "4rem"}}>Submit</Button>
                            </Grid>
                        </Grid>
                    </Drawer>
                </Grid>
                <Grid container justifyContent={"center"} sx={{backgroundColor: "#E3ECE9"}}>
                    <Grid item xs={5}><YearSelect/></Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h4"} sx={{
                            margin: "2rem",
                            color: "#1E000E",
                            fontFamily: 'Mulish',
                            fontWeight: "800"
                        }}></Typography>
                    </Grid>
                    <Grid item xs={12} sx={{margin: "2rem", height: "75vh", width: "100vw"}}>
                        <Choropleth/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;


