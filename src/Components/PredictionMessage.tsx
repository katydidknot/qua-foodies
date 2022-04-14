import {Card, CardActions, CardContent, Typography} from "@mui/material";
import * as React from "react";

export const PredictionMessage: React.FC = () => {
    return (<Card sx={{padding: "2rem", backgroundColor: "#3da332"}}>
            <CardContent>
                <Typography variant={"h5"} sx={{color: "white"}}>You will have success!</Typography>
            </CardContent>
            <CardActions>
            </CardActions></Card>
    )
}
