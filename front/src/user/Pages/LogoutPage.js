import {Box, Container, Toolbar, useTheme} from "@mui/material";
import StyledButton from "../StyledButton";
import {useIsMobile} from "../../hooks";
import {useAuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function LogoutPage() {
    const theme = useTheme();
    const isMobile = useIsMobile();
    const ctx = useAuthContext();
    const navigate = useNavigate();
    return <>
        <Toolbar />
        <Container>
            <Box sx={{
                marginTop: theme.spacing(isMobile ? 8 : 20),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <StyledButton onClick={() => {
                    ctx.setAuthorized(false);
                    navigate("/");
                }}>
                    Выйти из аккаунта
                </StyledButton>
            </Box>

        </Container>
    </>
}