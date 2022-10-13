import {Alert, AlertTitle, Box, Container, Link, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import UniversityIcon from "../../icons/UniversityIcon";
import {Link as RouterLink} from "react-router-dom";
import StyledButton from "../StyledButton";
import {useAuthContext} from "../../context/AuthContext";
import {useState} from "react";
import {useIsMobile} from "../../hooks";
export default function IndexPage(){
    const ctx = useAuthContext();
    const theme = useTheme();
    const isMobile = useIsMobile();
    const [isAlertOpen, setAlertOpen] = useState(false);
    return <>
        <Toolbar/>
        <Container>
            <Box sx={{
                marginTop: theme.spacing(isMobile ? 8 : 20),
                marginBottom: theme.spacing(isMobile ? 12 : 24),
                display: "flex",
                flexDirection: "column"

            }}>
                <Typography variant="h3" fontWeight="900">
                    ПАРСЕР ДАННЫХ АБИТУРИЕНТОВ
                </Typography>
                <Box sx={{width: isMobile ? "100%" : "45%"}}>
                    <Typography variant="h5" fontWeight="700">
                        Этот сайт существует для облегчения поиска заявлений поданных абитуриентами
                    </Typography>
                </Box>
            </Box>

            <Box sx={{
                display: isMobile ? "flex" : "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                gap: theme.spacing(1)
            }}>
                <span/>
                {ctx.isAuthorized ?<Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Link to="search" component={RouterLink} underline="none">
                        <StyledButton>
                            Найти<br/>абитуриента
                        </StyledButton>
                    </Link></Box> : <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <StyledButton onClick={() => {setAlertOpen(true)}}>
                            Найти<br/>абитуриента
                        </StyledButton>
                    </Box>
                }
                <Link to="/universities" component={RouterLink} sx={{
                    color: "#000",
                    textDecorationColor: "#000"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <UniversityIcon/>
                        <Typography variant="h6" color="inherit">
                            ВУЗы
                        </Typography>
                    </Box>
                </Link>
            </Box>
            <Box sx={{
                marginTop: theme.spacing(3),
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}>
                { isAlertOpen ?
                    <Alert severity="error">
                        <AlertTitle>Ошибка</AlertTitle>
                        Для доступа к парсеру необходимо войти
                    </Alert> : null}
            </Box>

        </Container>
    </>
}