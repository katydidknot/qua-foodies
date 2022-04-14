import {Card, CardActions, CardContent, Typography} from "@mui/material";
import * as React from "react";

export const PredictionMessage: React.FC = () => {
    return (<Card sx={{ margin: "1rem", backgroundColor: "#3da332"}}>
            <CardContent>
                <Typography variant={"subtitle1"} sx={{color: "white"}}>You will have success!</Typography>
            </CardContent>
            <CardActions>
            </CardActions></Card>
    )
}
