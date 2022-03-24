import {styled, TextField} from "@mui/material";

const StyledTextField = styled(TextField)({
    backgroundColor: "#f1f2f2",
    color:  '#3b1954',
    '& label.Mui-focused': {
        color: '#3b1954',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#3b1954',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#3b1954',
        },
    },
    '&.Mui-focused fieldset': {
        borderColor: '#C7CDD3',
    },
    '&.MuiFormHelperText-root': {
        backgroundColor: '#ebf3f6',
        margin: 0,
        paddingLeft: 10,
    },
    "&  .MuiFormHelperText-root.Mui-error": {
        backgroundColor:'#ebf3f6',
        margin:0,
        paddingLeft: 10
    },
});

export default StyledTextField;
