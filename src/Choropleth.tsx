import React from "react";
import {ResponsiveChoropleth} from "@nivo/geo";
import {FeatureCollection, TestData} from "./us-states"
import {Grid} from "@mui/material";
import { linearGradientDef, patternDotsDef } from '@nivo/core'

export const Choropleth: React.FC = () => (
    <>
            <ResponsiveChoropleth
                data={TestData}
                features={FeatureCollection.features}
                margin={{top: 0, right: 0, bottom: 0, left: 20}}
                colors="PuOr"
                domain={[0, 1000000]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={1350}
                projectionTranslation={[ 1.75, 1.8]}
                projectionRotation={[ 0, 0, 0 ]}
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
                            }}
                        ]
                    }
                ]}
            />
    </>)
