import {Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
export default function MobileDrawer({isOpened, setOpened, setOpenedModal}) {
    const ctx = useAuthContext();
    const navigate = useNavigate();
    return <>
        <Drawer open={isOpened} onClose={() => setOpened(false)}>
            <Box role="presentation" sx={{width: 250}}>
                <List>
                    {ctx.isAuthorized ? <>
                        <ListItem disablePadding key={1}>
                            <ListItemButton>
                                <ListItemText primary={`Email: ${ctx.userInfo.email}`}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem disablePadding key={2}>
                            <ListItemButton onClick={() => {
                                setOpened(false);
                                navigate("/");
                            }}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Главная"/>
                            </ListItemButton>
                        </ListItem>
                        { ctx.isAdmin ?
                            <ListItem disablePadding key={3}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Админка"/>
                                </ListItemButton>
                            </ListItem> : null
                        }
                        <ListItem disablePadding key={4}>
                            <ListItemButton onClick={() => {
                                setOpened(false);
                                navigate("/logout");
                            }
                            }>
                                <ListItemIcon>
                                    <LogoutIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Выйти"/>
                            </ListItemButton>
                        </ListItem>
                    </> : <>
                        <ListItem disablePadding key={5}>
                            <ListItemButton onClick={() => {
                                setOpened(false);
                                navigate("/");
                            }}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Главная"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding key={6}>
                            <ListItemButton onClick={() => {
                                setOpened(false);
                                setOpenedModal(true);
                            }
                            }>
                                <ListItemIcon>
                                    <LoginIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Войти"/>
                            </ListItemButton>
                        </ListItem>
                    </>}
                </List>
            </Box>
        </Drawer>
    </>
}