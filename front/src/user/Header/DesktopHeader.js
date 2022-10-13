import {AppBar, Box, Button, Container, Stack, Toolbar, Typography, Link, IconButton} from "@mui/material";
import {useAuthContext} from "../../context/AuthContext";
import Logo from "../../logo";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import AuthModal from "../AuthModal";
import {useState} from "react";
import {useIsMobile} from "../../hooks";
import MenuIcon from '@mui/icons-material/Menu';
import MobileDrawer from "./MobileDrawer";
const HeaderButton = ({to, onClick, ...props}) => {
    const navigate = useNavigate();
    if (to !== undefined) {
        onClick = () => {
            navigate(to);
        }
    }
    return <Button {...props} onClick={onClick} variant="outlined" sx={{
        color: "#fff",
        borderColor: "#fff",
        ":hover": {
            borderColor: "#fff",
            background: "#333"
        }
    }}/>
}
export default function DesktopHeader(){
    const ctx = useAuthContext();
    const [isOpenedModal, setOpenedModal] = useState(false);
    const [isOpenedDrawer, setOpenedDrawer] = useState(false);
    const isMobile = useIsMobile();
    return  <>
        <AppBar sx={{background: "#000"}}>
            <Toolbar>
                <Container>
                    <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Box>
                            <Link to="/" component={RouterLink} underline="none" color="inherit">
                                <Logo />
                            </Link>

                        </Box>
                        { isMobile ?
                            <>
                                <MobileDrawer
                                    isOpened={isOpenedDrawer}
                                    setOpened={setOpenedDrawer}
                                    setOpenedModal={setOpenedModal}
                                />
                                <IconButton onClick={() => setOpenedDrawer(true)}>
                                    <MenuIcon htmlColor="#fff"/>
                                </IconButton>
                            </> :
                            <Box>
                            <Stack direction="row" sx={{alignItems: "center"}} spacing={2}>
                                {ctx.isAuthorized ? <>
                                    <Typography>{ctx.userInfo.email}</Typography>
                                    { ctx.isAdmin ?
                                        <HeaderButton>
                                            Админка
                                        </HeaderButton> : null
                                    }
                                    <HeaderButton to="/logout">
                                        Выйти
                                    </HeaderButton>
                                </> : <>
                                    <HeaderButton onClick={() => {
                                        setOpenedModal(true);
                                    }}>
                                        Войти
                                    </HeaderButton>
                                </>}
                            </Stack>
                        </Box>}
                    </Box>
                    <AuthModal isOpened={isOpenedModal} setOpened={setOpenedModal}/>
                </Container>
            </Toolbar>
        </AppBar>
    </>;
}