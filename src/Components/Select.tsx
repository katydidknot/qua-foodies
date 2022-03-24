import * as React from "react"
import {useState} from "react"
import {Autocomplete, Box, FormControl, TextField} from "@mui/material";
import StyledTextField from "./StyledTextField";

export const YearSelect: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<string>("2022")
    const years = ["2020", "2021", "2022"]
    return (
        <Box sx={{minWidth: 120, backgroundColor: "#E3ECE9", margin: "1rem"}}>
            <FormControl fullWidth size={"small"}>
                <Autocomplete
                    options={years}
                    onChange={(event, newValue) => {
                        setSelectedYear((newValue as string));
                    }}
                    value={selectedYear}
                    renderInput={(params) =>
                        <StyledTextField {...params}
                                   variant={"outlined"}
                                   fullWidth size={"small"}
                                   label={"Select Year"}
                                   InputProps={{
                                       ...params.InputProps
                                   }}
                        />}/>
            </FormControl>
        </Box>
    );
}
