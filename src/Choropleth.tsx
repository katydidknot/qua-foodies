import React from "react";
import {ResponsiveChoropleth} from "@nivo/geo";
import {FeatureCollection, TestData} from "./us-states"
import {Toolbar, AppBar, IconButton, Typography, Grid} from "@mui/material";


export const Choropleth: React.FC = () => (
    <>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    qua-foodies
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid container justifyContent={"center"} sx={{margin: "2rem", height: "50vh", width: "50vw"}}>
            <ResponsiveChoropleth
                data={TestData}
                features={FeatureCollection.features}
                margin={{top: 0, right: 0, bottom: 0, left: 20}}
                colors="nivo"
                domain={[0, 1000000]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={237}
                projectionTranslation={[1, 1]}
                projectionRotation={[0, 0, 0]}
                enableGraticule={true}
                graticuleLineColor="#dddddd"
                borderWidth={0.5}
                borderColor="#152538"
                legends={[
                    {
                        anchor: 'bottom-left',
                        direction: 'column',
                        justify: true,
                        translateX: 0,
                        translateY: -50,
                        itemsSpacing: 0,
                        itemWidth: 94,
                        itemHeight: 18,
                        itemDirection: 'left-to-right',
                        itemTextColor: '#444444',
                        itemOpacity: 0.85,
                        symbolSize: 18,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000000',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </Grid>
    </>)
