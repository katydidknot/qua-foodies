import React from "react";
import {ResponsiveChoropleth} from "@nivo/geo";
import {FeatureCollection} from "./us-states"
import {Box, Typography, Grid} from '@mui/material';

export const Choropleth: React.FC<{ data: any, title: string, colors: string, titleColor: string}> = ({data, title, colors, titleColor}) => {
    const maxData = () => {
        return Math.max.apply(Math, data?.map((o: any) => parseInt(o.value))) || 0
    }
    return (
        <>
            <Typography variant={"h5"} sx={{marginLeft: "3rem", color: titleColor, fontWeight: "800"}}>{title}</Typography>
            <Box sx={{margin: "2rem", height: "400px", width: "640px"}}>
                <ResponsiveChoropleth
                    data={data || []}
                    features={FeatureCollection.features}
                    margin={{top: 0, right: 0, bottom: 0, left: 20}}
                    colors={colors}
                    domain={[0, maxData()]}
                    unknownColor="white"
                    label="properties.name"
                    valueFormat=".2s"
                    projectionScale={400}
                    projectionTranslation={[1.69, 1.43]}
                    // projectionRotation={[0, 0, 0]}
                    borderWidth={0.5}
                    borderColor="#152538"
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
        </>)
}
