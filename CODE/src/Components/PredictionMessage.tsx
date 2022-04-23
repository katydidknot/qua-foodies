import {Card, CardActions, CardContent, Typography} from "@mui/material";
import * as React from "react";

export const PredictionMessage: React.FC<{color: string, message: string}> = ({color, message}) => {
    return (<Card sx={{ margin: "1rem", backgroundColor: color}}>
            <CardContent>
                <Typography variant={"subtitle1"} sx={{color: "white"}}>{message}</Typography>
            </CardContent>
            <CardActions>
            </CardActions></Card>
    )
}
