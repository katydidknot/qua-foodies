import React from "react";
import {ResponsiveChoropleth} from "@nivo/geo";
import {FeatureCollection} from "./us-states"


export const Choropleth: React.FC<{ data: any }> = ({data}) => {
    const maxData = () => {
        return Math.max.apply(Math, data?.map((o: any) => parseInt(o.value))) || 0
    }
    return (
        <>
            <ResponsiveChoropleth
                data={data || []}
                features={FeatureCollection.features}
                margin={{top: 0, right: 0, bottom: 0, left: 20}}
                colors="BuPu"
                domain={[0, maxData()]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionScale={1150}
                projectionTranslation={[1.6, 1.6]}
                projectionRotation={[0, 0, 0]}
                borderWidth={0.5}
                borderColor="#152538"
                legends={[
                    {
                        anchor: 'bottom-left',
                        direction: 'column',
                        justify: true,
                        translateX: 1500,
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
        </>)
}
