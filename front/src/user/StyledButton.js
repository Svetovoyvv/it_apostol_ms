import {Button, Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function StyledButton({children, to, ...props}) {
    const theme = useTheme();
    const navigate = useNavigate();
    if (to !== undefined) {
        props.onClick = () => {
            navigate(to);
        }
    }
    return <Button
        {...props}
        sx={{
            height: "max-content",
            paddingY: theme.spacing(1),
            paddingX: theme.spacing(6),
            borderRadius: theme.spacing(2),
            backgroundColor: "#3874CE",
            textTransform: "none",
            textDecoration: "none !important",
            color: "#000",
            "&:hover": {
                backgroundColor: "#488aea",
                textDecoration: "none"
            },
        }}
    >
        <Typography variant="h6" style={{textDecoration: "none"}}>
            {children}
        </Typography>
    </Button>
}
