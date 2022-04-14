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
    const [selectedDataType, setSelectedDataType] = useState<string>("Openings")
    const selectedDataTypeOptions = ["Openings", "Closings"]

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
                            <Grid item md={12}>
                                <Button
                                    sx={{
                                        color: "#280004",
                                        backgroundColor: "#E3ECE9",
                                        marginTop: "4rem"
                                    }}>Submit</Button>
                            </Grid>
                        </Grid>
                    </Drawer>
                </Grid>
                <Grid container justifyContent={"center"} sx={{backgroundColor: "#E3ECE9"}}>
                    <Grid item xs={5} sx={{padding: "2rem"}}>
                        <Box sx={{minWidth: 120, backgroundColor: "#E3ECE9", margin: "1rem"}}>
                            <FormControl fullWidth size={"small"}>
                                <Autocomplete
                                    options={selectedDataTypeOptions}
                                    onChange={(event, newValue) => {
                                        setSelectedDataType((newValue as string));
                                    }}
                                    value={selectedDataType}
                                    renderInput={(params) =>
                                        <StyledTextField {...params}
                                                         variant={"outlined"}
                                                         fullWidth size={"small"}
                                                         label={"Select Openings or Closings"}
                                                         InputProps={{
                                                             ...params.InputProps
                                                         }}
                                        />}/>
                            </FormControl>
                        </Box></Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h4"} sx={{
                            margin: "2rem",
                            color: "#1E000E",
                            fontFamily: 'Mulish',
                            fontWeight: "800"
                        }}></Typography>
                    </Grid>
                    <Grid item xs={12} sx={{margin: "2rem", height: "75vh", width: "100vw"}}>
                        <Choropleth data={selectedDataType === "Openings" ? openingData : closingData}/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;


