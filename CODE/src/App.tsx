import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Divider,
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
import {PredictionMessage} from "./Components/PredictionMessage";
import axios from "axios";
import {Features} from "./Features";
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

export interface PredictionRequest {
    zipCode: string
    pickup: number,
    delivery: number,
    reservations: number,
    hotdogs: number,
    pizza: number,
    traditionalAmerican: number,
    sandwiches: number,
    burgers: number,
    coffee: number,
    mexican: number,
    brunch: number,
    newAmerican: number,
    italian: number,
    chinese: number,
    bar: number,
    chickenWings: number,
    iceCream: number,
    seafood: number,
    bakery: number,
    salad: number,
    desserts: number,
    delis: number,
    japanese: number,
    bbq: number,
    juiceBar: number,
    cafe: number,
    mediterranean: number,
    steak: number,
    asianfusion: number,
    vegetarian: number,
    vegan: number,
    sportsBar: number,
    rating: number,
    price: number
}

function App() {
    const [openingData, setOpeningData] = useState<any>(null)
    const [zipCode, setZipCode] = useState<string>("")
    const [closingData, setClosingData] = useState<any>(null)
    const [showPrediction, setShowPrediction] = useState<boolean>(false)
    const [prediction, setPrediction] = useState<{ color: string, message: string }>({
        color: "",
        message: ""
    })
    const [allowedZips, setAllowedZips] = useState<string[]>([])
    const [predictionRequest, setPredictionRequest] = useState<PredictionRequest>({
        zipCode: "",
        pickup: 0,
        delivery: 0,
        reservations: 0,
        hotdogs: 0,
        pizza: 0,
        traditionalAmerican: 0,
        sandwiches: 0,
        burgers: 0,
        coffee: 0,
        mexican: 0,
        brunch: 0,
        newAmerican: 0,
        italian: 0,
        chinese: 0,
        bar: 0,
        chickenWings: 0,
        iceCream: 0,
        seafood: 0,
        bakery: 0,
        salad: 0,
        desserts: 0,
        delis: 0,
        japanese: 0,
        bbq: 0,
        juiceBar: 0,
        cafe: 0,
        mediterranean: 0,
        steak: 0,
        asianfusion: 0,
        vegetarian: 0,
        vegan: 0,
        sportsBar: 0,
        price: 1,
        rating: 1
    })

    const getPrediction = async () => {
        predictionRequest.zipCode = zipCode
        const response = await axios.post("http://127.0.0.1:5000/api", predictionRequest, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        if (response.data.result === "1") {
            setPrediction({color: "#c93e2e", message: "You will have trouble surviving."})
        } else {
            setPrediction({color: "#3da332", message: "You will have success!"})
        }
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
                    // console.log("STATE", i.properties.name, "HAS ", value, "OPENINGS")
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
                    // console.log("STATE", i.properties.name, "HAS ", value, "CLOSINGS")
                    return {
                        "id": i.id,
                        "value": value
                    }
                })])

            }
        });
        Papa.parse('covid_restaurant_integrated_data.csv', {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function (results) {
                // @ts-ignore
                const zips = results.data.map(i => i.zip)
                // @ts-ignore
                const zipsWithoutDupes = [...new Set(zips)];
                setAllowedZips(zipsWithoutDupes.sort())
            }
        });
    }, [])

    return (
        <div className="App" style={{backgroundColor: "#E3ECE9", fontFamily: "Mulish"}}>
            <Typography variant={"h3"} sx={{padding: "1rem"}}>Welcome to the QuaFoodies App!</Typography>
            <Typography variant={"h5"} sx={{padding: "1rem"}}>We think the restaurant industry can do data
                better. </Typography>
            <Typography variant={"body1"} sx={{padding: "1rem"}}>Below you will find two maps outlining restaurant
                closures and restaurants that have stayed open since March 2020, which highlights the impact of the
                covid-19
                pandemic.</Typography>
            <Grid container justifyContent={"center"} alignItems={"center"} sx={{backgroundColor: "#E3ECE9"}}>
                <Choropleth data={openingData} title={"Lower 48 Open Restaurants"} colors={"BuPu"}
                            titleColor={"#3B003A"}></Choropleth>
                <Choropleth data={closingData} title={"Lower 48 Closings"} colors={"PuRd"}
                            titleColor={"#530018"}></Choropleth>
                <Grid container>
                    <Toolbar sx={{backgroundColor: "#656176", color: "white", width: "100%"}}>
                        <Grid item xs={12}><Typography variant={"h4"} sx={{fontWeight: "800"}}>Restaurant
                            Survivability</Typography></Grid>
                    </Toolbar>

                    <Divider></Divider>
                    <Grid item xs={12} md={4}></Grid>
                    <Grid item xs={12} md={4}>
                        {showPrediction && <PredictionMessage color={prediction.color} message={prediction.message}/>}
                    </Grid>
                    <Grid item xs={12} md={4}></Grid>
                    <Grid container direction={"row"} justifyContent={"space-evenly"} alignItems={"space-between"}>
                        <Grid item md={12} sx={{padding: "2rem"}}>
                            <Typography variant={"body1"}>Populate the inputs below to predict if your restaurant will
                                succeed.</Typography>
                            <Typography variant={"body1"}>Zipcode is required**</Typography>
                        </Grid>

                        <Grid container justifyContent={"center"}>
                            <Grid item>
                                <Box sx={{minWidth: 200, backgroundColor: "#E3ECE9", marginBottom: "2rem"}}>
                                    <FormControl fullWidth size={"small"}>
                                        <Autocomplete
                                            getOptionLabel={(option) => option?.toString() || ""}
                                            options={allowedZips}
                                            onChange={(event, newValue) => {
                                                // @ts-ignore
                                                predictionRequest["zipCode"] = newValue
                                                setPredictionRequest({...predictionRequest})
                                                setZipCode(newValue || "")
                                            }}
                                            value={zipCode.toString() || allowedZips[0]}
                                            renderInput={(params) =>
                                                <StyledTextField {...params}
                                                                 variant={"outlined"}
                                                                 fullWidth size={"small"}
                                                                 label={"Zip code"}
                                                                 InputProps={{
                                                                     ...params.InputProps
                                                                 }}
                                                />}/>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>

                        <Grid container justifyContent="center" spacing={1}>
                            <Toolbar sx={{backgroundColor: "#656176", color: "white", width: "100%"}}>
                                <Grid item xs={12}><Typography variant={"h6"} sx={{fontWeight: "800"}}>How to order
                                    food:</Typography></Grid>
                            </Toolbar>
                            <Grid container justifyContent={"center"} sx={{margin: "2rem"}}>
                                {Features.filter(i => i.name === "pickup" || i.name === "delivery" || i.name === "reservations").map(i => (
                                    <FormGroup row={true} key={i.name}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={Object.entries(predictionRequest).filter(p => p[0] === i.name)?.[0]?.[1] === 1}
                                                onChange={(val) => {
                                                    const toggled = val.target.checked
                                                    console.log(val.target.checked)
                                                    // @ts-ignore
                                                    predictionRequest[i.name as keyof PredictionRequest] = toggled ? 1 : 0
                                                    setPredictionRequest({...predictionRequest,})
                                                }}
                                            />} label={i.value}/>
                                    </FormGroup>))}
                            </Grid>
                            <Toolbar sx={{backgroundColor: "#656176", color: "white", width: "100%"}}>
                                <Grid item xs={12}><Typography variant={"h6"} sx={{fontWeight: "800",}}>Cuisine
                                    Type:</Typography></Grid>
                            </Toolbar>
                            {Features.filter(i => i.name !== "pickup" && i.name !== "delivery" && i.name !== "reservations" && i.name !== "price" && i.name !== "rating").map(i => (
                                <Grid key={i.name} item><FormGroup>
                                    <FormControlLabel control={<Checkbox
                                        checked={Object.entries(predictionRequest).filter(p => p[0] === i.name)?.[0]?.[1] === 1}
                                        onChange={(val) => {
                                            const toggled = val.target.checked
                                            console.log(val.target.checked)
                                            // @ts-ignore
                                            predictionRequest[i.name as keyof PredictionRequest] = toggled ? 1 : 0
                                            setPredictionRequest({...predictionRequest,})
                                        }}
                                    />} label={i.value}/>
                                </FormGroup></Grid>))}
                            <Toolbar sx={{backgroundColor: "#656176", color: "white", width: "100%"}}>
                                <Grid item xs={12}><Typography variant={"h6"} sx={{fontWeight: "800"}}>Rating and
                                    Price:</Typography></Grid>
                            </Toolbar>
                            <Grid container justifyContent={"center"} sx={{margin: "1rem"}}>
                                {Features.filter(i => i.name === "price" || i.name === "rating").map(i => {
                                    const options = i.name === "price" ? [1, 2, 3, 4] : [1, 2, 3, 4, 5]
                                    return (
                                        <Box key={i.name}
                                             sx={{minWidth: 120, backgroundColor: "#E3ECE9", margin: "1rem"}}>
                                            <FormControl fullWidth size={"small"}>
                                                <Autocomplete
                                                    getOptionLabel={(option) => option.toString() || ""}
                                                    options={options}
                                                    onChange={(event, newValue) => {
                                                        // @ts-ignore
                                                        predictionRequest[i.name as keyof PredictionRequest] = newValue
                                                        setPredictionRequest({...predictionRequest})
                                                    }}
                                                    // @ts-ignore
                                                    value={predictionRequest[i.name]}
                                                    renderInput={(params) =>
                                                        <StyledTextField {...params}
                                                                         variant={"outlined"}
                                                                         fullWidth size={"small"}
                                                                         label={i.value}
                                                                         InputProps={{
                                                                             ...params.InputProps
                                                                         }}
                                                        />}/>
                                            </FormControl>
                                        </Box>
                                    )
                                })}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Button
                                disabled={predictionRequest.zipCode.toString().length !== 5}
                                size="large"
                                onClick={() => getPrediction()}
                                sx={{
                                    '&.Mui-disabled': {backgroundColor: "lightgrey"},
                                    padding: "1rem",
                                    minWidth: "300px",
                                    marginTop: "3rem",
                                    marginBottom: "1rem",
                                    backgroundColor: "#656176",
                                    color: "white",
                                }}>Get Prediction</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;


