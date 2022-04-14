import React from "react";
import {ResponsiveChoropleth} from "@nivo/geo";
import {Box, Grid, Typography} from '@mui/material';
import {AZCounties} from "../counties-az";

export const CountyChoropleth: React.FC<{ data: any, title: string, colors: string, titleColor: string }> = ({
                                                                                                           data,
                                                                                                           title,
                                                                                                           colors,
                                                                                                           titleColor
                                                                                                       }) => {
    const maxData = () => {
        return Math.max.apply(Math, data?.map((o: any) => parseInt(o.value))) || 0
    }
    return (
        <>  <Grid direction={"column"} justifyContent={"space-evenly"} alignItems={"center"}>
            <Typography variant={"h4"}
                        sx={{color: titleColor, fontWeight: "800", marginLeft: "1rem"}}>{title}</Typography>
            <Box sx={{height: "280px", width: "640px", backgroundColor: "#E3ECE9"}}>
                <ResponsiveChoropleth
                    data={data || []}
                    features={AZCounties.features}
                    margin={{top: 0, right: 0, bottom: 0, left: 20}}
                    colors={colors}
                    domain={[0, maxData()]}
                    unknownColor="white"
                    label="properties.name"
                    valueFormat=".2s"
                    projectionScale={1200}
                    projectionTranslation={[4.1 , 3.2]}
                    borderWidth={0.5}
                    borderColor="#152538"
                    onClick={(event) => console.log("clicked!", event)}
                    legends={[
                        {
                            anchor: 'bottom-left',
                            direction: 'column',
                            justify: true,
                            translateX: 100,
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
                                        itemTextColor: 'purple',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </Box>
        </Grid>
        </>)
}
