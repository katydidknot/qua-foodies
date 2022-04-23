import * as React from "react"
import {useState} from "react"
import {Autocomplete, Box, FormControl} from "@mui/material";
import StyledTextField from "./StyledTextField";

export const SelectNumberComponent: React.FC<{ options: any, label: string }> = ({options, label}) => {
    const [selectedAmount, setSelectedAmount] = useState<number>()
    return (
        <Box sx={{minWidth: 120, backgroundColor: "#E3ECE9", margin: "1rem"}}>
            <FormControl fullWidth size={"small"}>
                <Autocomplete
                    options={options}
                    onChange={(event, newValue) => {
                        setSelectedAmount((newValue as number));
                    }}
                    value={selectedAmount}
                    renderInput={(params) =>
                        <StyledTextField {...params}
                                         variant={"outlined"}
                                         fullWidth size={"small"}
                                         label={label}
                                         InputProps={{
                                             ...params.InputProps
                                         }}
                        />}/>
            </FormControl>
        </Box>
    );
}
