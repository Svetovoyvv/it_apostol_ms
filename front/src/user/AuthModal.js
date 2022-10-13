import {
    Alert,
    AlertTitle,
    Box,
    Button, CircularProgress, Collapse,
    Divider,
    IconButton,
    Modal,
    Paper,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {UserService, OpenAPI} from "../client/";
import {useState} from "react";
import {useAuthContext} from "../context/AuthContext";
import {config} from "../config";
export default function AuthModal({isOpened, setOpened}) {
    OpenAPI.BASE = config.API_URL;
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const ctx = useAuthContext();
    return <Modal
        open={isOpened}
    >
        <Box sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "500px",
            height: "max-content",
        }}>
            <Paper sx={{
                padding: theme.spacing(2),
                borderRadius: theme.spacing(1),
            }}>
                <Box sx={{marginBottom: theme.spacing(2)}}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                        <Typography variant="h5" color="black" fontWeight="600">
                            Войдите в аккаунт
                        </Typography>
                        <IconButton onClick={() => setOpened(false)}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <Divider/>
                </Box>
                <Box>
                    <Stack spacing={2}>
                        <TextField label="Почта" size="small" type="email"
                                   error={email.match(/.+@.+\..+/) === null}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField label="Пароль" size="small" type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained"
                                onClick={() => {
                                    if (email.match(/.+@.+\..+/) === null) {
                                        return;
                                    }
                                    setIsLoading(true);
                                    UserService.loginApiV1UserLoginPost({username: email, password: password}).then((res) => {
                                        ctx.setUserInfo({token: res.access_token});
                                        OpenAPI.TOKEN = res.access_token;
                                        UserService.profileApiV1UserProfileGet().then((res) => {
                                            ctx.setUserInfo({
                                                email: res.email,
                                                name: res.username,
                                                token: OpenAPI.TOKEN
                                            });
                                            setIsLoading(false);
                                            ctx.setAuthorized(true);
                                            setTimeout(() => setOpened(false), 500);
                                        }).catch((e) => {
                                            setIsLoading(false);
                                            setError(true);
                                        })
                                    }).catch(() => {
                                        setIsLoading(false);
                                        setError(true);
                                    })
                                }}
                        >
                            Войти
                        </Button>
                        <Collapse in={error}>
                            <Alert severity="error">
                                <AlertTitle>Ошибка авторизации</AlertTitle>
                                Неверный логин или пароль.
                            </Alert>
                        </Collapse>
                        <Collapse in={isLoading}>
                            <CircularProgress/>
                        </Collapse>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    </Modal>;
}