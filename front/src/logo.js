import {Box, Typography, useTheme} from "@mui/material";
export default function LogoItApostol(){
    const theme = useTheme();
    return <>
        <Box sx={{display: "flex"}}>
            <div style={{
                borderLeft: "1px solid #fff",
                borderLeftWidth: theme.spacing(1),
                marginRight: theme.spacing(1)}} />
            <Typography variant="h4" fontWeight="700">
                IT-APOSTOL
            </Typography>
        </Box>

    </>
}