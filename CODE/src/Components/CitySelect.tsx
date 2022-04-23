import * as React from "react"
import {useState} from "react"
import {Autocomplete, Box, FormControl} from "@mui/material";
import StyledTextField from "./StyledTextField";

export const CitySelect: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<string>("Chicago")
    const years = ["Chicago", "New York", "Los Angeles"]
    return (
        <Box sx={{minWidth: 120, backgroundColor: "#E3ECE9", margin: "1rem"}}>
            <FormControl fullWidth size={"small"}>
                <Autocomplete
                    options={years}
                    onChange={(event, newValue) => {
                        setSelectedCity((newValue as string));
                    }}
                    value={selectedCity}
                    renderInput={(params) =>
                        <StyledTextField {...params}
                                         variant={"outlined"}
                                         fullWidth size={"small"}
                                         label={"City"}
                                         InputProps={{
                                             ...params.InputProps
                                         }}
                        />}/>
            </FormControl>
        </Box>
    );
}
