import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Toolbar,
    Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import './App.css';
import {Choropleth} from "./Choropleth";
import {FeatureCollection} from "./us-states";
import Papa from "papaparse";
import StyledTextField from "./Components/StyledTextField";
import {PredictionMessage} from "./Components/PredictionMessage";
import axios from "axios";

export interface CSVRow {
    id: string,
    name: string,
    isClosed: number,
    "display_phone": string,
    "review_count": number,
    categories: string,
    rating: number
    price: number,
    pickup: number,
    delivery: number,
    restaurant_reservation: number,
    "location.address1": string,
    "location.address2": string,
    "location.address3": string,
    "location.city": string,
    "location.zip_code": number,
    "location.country": string,
    state: string,
    "location.display_address": string[],
    "coordinates.latitude": number,
    "coordinates.longitude": number,
}

function App() {
    const [openingData, setOpeningData] = useState<any>(null)
    const [closingData, setClosingData] = useState<any>(null)
    const [showPrediction, setShowPrediction] = useState<boolean>(false)
    const [showFeatureSelection, setShowFeatureSelection] = useState<boolean>(false)

    const getPrediction = async () => {
        const response = await axios.post("http://127.0.0.1:5000/api", {
            'review_count': 1,
            'rating': 1,
            'price': 1,
            'pickup': 1,
            'delivery': 1
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        setShowPrediction(true)
    }
    useEffect(() => {
        Papa.parse('yelp_data_final.csv', {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function (results) {
                console.log(results.data[0])
                setOpeningData([...FeatureCollection?.features?.map(i => {
                    const value = results.data?.filter(s => {
                        const csvRow = s as CSVRow
                        return (csvRow.isClosed === 0 && csvRow.state.trim() === i.properties.abbr.trim())
                    }).length;
                    console.log("STATE", i.properties.name, "HAS ", value, "OPENINGS")
                    return {
                        "id": i.id,
                        "value": value
                    }
                })])
                setClosingData([...FeatureCollection?.features?.map(i => {
                    const value = results.data?.filter(s => {
                        const csvRow = s as CSVRow
                        return (csvRow.isClosed === 1 && csvRow.state.trim() === i.properties.abbr.trim())
                    }).length;
                    console.log("STATE", i.properties.name, "HAS ", value, "CLOSINGS")
                    return {
                        "id": i.id,
                        "value": value
                    }
                })])
            }
        });
    }, [])

    return (
        <div className="App" style={{backgroundColor: "#E3ECE9", fontFamily: "Mulish"}}>
            <Typography variant={"h3"} sx={{padding: "1rem"}}>Welcome to the QuaFoodies App!</Typography>
            <Typography variant={"h5"} sx={{padding: "1rem"}}>We think the restaurant industry can do data better. </Typography>
            <Typography variant={"body1"} sx={{padding: "1rem"}}>Below you will find two maps outlining restaurant closures and openings since March 2020, which highlights the impact of the covid-19 pandemic.</Typography>
            <Typography variant={"body1"} sx={{padding: "1rem"}}>To take a closer look, please select the state "Arizona"</Typography>
            <Grid container justifyContent={"center"} alignItems={"center"}>
               <Choropleth data={openingData} title={"Openings"} colors={"BuPu"} titleColor={"#3B003A"}></Choropleth>
               <Choropleth data={closingData} title={"Closings"} colors={"PuRd"}  titleColor={"#530018"}></Choropleth>
                {showFeatureSelection && <Grid container>
                    <Grid container direction={"row"} justifyContent={"space-evenly"} alignItems={"space-between"}>
                        <Toolbar sx={{backgroundColor: "#656176", color: "white", width:"100%"}}>
                            <Typography variant={"h5"}>Select from
                                below:</Typography>
                        </Toolbar>
                    </Grid>
                        <Divider></Divider>
                        <Grid container direction={"row"} justifyContent={"space-evenly"} alignItems={"space-between"}>
                            <Grid item md={12} sx={{padding: "2rem"}}>
                            </Grid>
                            <Grid item md={1}></Grid>
                            <Grid item md={5}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox/>} label="Vegetarian"/>
                                </FormGroup>
                            </Grid>
                            <Grid item md={5}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox/>} label="BYOB"/>
                                </FormGroup>
                            </Grid>
                            <Grid item md={1}></Grid>
                            <Grid item md={1}></Grid>
                            <Grid item md={5}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox/>} label="Family Friendly"/>
                                </FormGroup>
                            </Grid>
                            <Grid item md={5}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox/>} label="Brunch"/>
                                </FormGroup>
                            </Grid>
                            <Grid item md={1}></Grid>
                            <Grid item md={10}>
                                {showPrediction && <PredictionMessage/>}
                            </Grid>
                            <Grid item md={12}>
                                <Button
                                    onClick={() => getPrediction()}
                                    sx={{
                                        color: "#280004",
                                        backgroundColor: "#E3ECE9",
                                        marginTop: "4rem"
                                    }}>Submit</Button>
                            </Grid>
                        </Grid>
                </Grid>}
            </Grid>
        </div>
    );
}

export default App;


