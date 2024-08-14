import { TextField, styled } from "@mui/material";

const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#ffffff",
    },
});

export default CustomTextField;
