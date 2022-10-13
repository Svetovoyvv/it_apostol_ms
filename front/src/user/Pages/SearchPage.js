import {
    Alert,
    AlertTitle,
    Box, CircularProgress,
    Collapse,
    Container, Divider, Link,
    Paper,
    Stack,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {useIsMobile} from "../../hooks";
import InputMask from "react-input-mask"
import {useState} from "react";
import StyledButton from "../StyledButton";
import {SearchService} from "../../client";
import {useAuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function SearchPage() {
    const isMobile = useIsMobile();
    const [name, setName] = useState("");
    const [insNumber, setInsNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [response, setResponse] = useState([]);
    const ctx = useAuthContext();
    const navigate = useNavigate();
    if (!ctx.isAuthorized) {
        navigate("/");
    }
    return <>
        <Toolbar/>
        <Container>
            <Box sx={{
                marginTop: 4
            }}>
                <Stack alignItems="center" spacing={3}>
                    <Typography variant="h3" textAlign="center" fontWeight={700}>
                        Введите данные абитуриента
                    </Typography>
                    <Paper sx={{
                        width: isMobile ? "80%" : "50%",
                        maxWidth: 500,
                        padding: 3,
                        borderRadius: 3
                    }} elevation={3}>
                        <Stack>
                            <Stack spacing={2}>
                                <TextField
                                    label="ФИО"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <InputMask
                                    mask="999-999-999 99"
                                    value={insNumber}
                                    onChange={(e) => setInsNumber(e.target.value)}
                                    maskChar="_"
                                    name="ins_number"
                                >
                                    {() => <TextField autoComplete="on" label="СНИЛС" name="ins_number" error={
                                        insNumber.match(/^[0-9]{3}[ -][0-9]{3}[ -][0-9]{3}[ -][0-9]{2}$|^[_-]+$/) === null
                                    }/>}
                                </InputMask>
                                <StyledButton onClick={() => {
                                    if (insNumber.match(/^[0-9]{3}[ -][0-9]{3}[ -][0-9]{3}[ -][0-9]{2}$/) === null)
                                        return;
                                    setIsError(false);
                                    setIsSuccess(false);
                                    setIsLoading(true);
                                    SearchService.searchApiV1SearchPost({ins_number: insNumber}).then((res) => {
                                        setIsLoading(false);
                                        if (res.length === 0){
                                            setIsError(true)
                                            return;
                                        }
                                        setResponse(res);
                                        setIsSuccess(true);
                                    }).catch((e) => {
                                        setIsLoading(false);
                                        ctx.setAuthorized(false);
                                        navigate("/")
                                    })
                                }
                                }>
                                    Найти
                                </StyledButton>
                            </Stack>
                            <Collapse in={isError}>
                                <Box marginTop={2}>
                                    <Alert severity="error">
                                        <AlertTitle>
                                            Ошибка
                                        </AlertTitle>
                                        Абитуриентов с такими данными не найдено
                                    </Alert>
                                </Box>
                            </Collapse>
                            <Collapse in={isLoading}>
                                <Box marginTop={2} display="flex" justifyContent="center">
                                    <CircularProgress />
                                </Box>
                            </Collapse>
                        </Stack>
                    </Paper>
                    <Box sx={{
                        width: isMobile ? "90%" : "70%",
                        paddingTop: 4
                    }}>
                        <Collapse in={isSuccess}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            gap: 2,
                            flexWrap:  "wrap",
                            justifyContent: "space-between"
                        }}>
                            {response.map((item, index) => (
                                <Paper sx={{
                                    width: isMobile ? "100%" : "45%",
                                    padding: 2,
                                    backgroundColor: item.agreed ? "#c8e6c9" : "#ffcdd2",
                                    borderRadius: 4,
                                }} key={index}>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}>
                                        <Stack direction="row" alignItems="end" spacing={1}>
                                            <Typography variant="h5" fontWeight={600}>
                                                {item.university.display_name}
                                            </Typography>
                                            <Typography variant="h6">
                                                {item.study.name}
                                            </Typography>
                                        </Stack>
                                        <Link href={item.link} target="_blank">
                                            <Typography variant="h6">
                                                Источник
                                            </Typography>
                                        </Link>
                                    </Box>
                                    <Box sx={{
                                        marginTop: 1,
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}>
                                        <Typography variant="h6">
                                            Дата обновления:
                                        </Typography>
                                        <Typography variant="h6" title={new Date(item.change * 1000).toLocaleString()}>
                                            {new Date(item.change * 1000).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Paper>
                            ))}
                        </Box>
                    </Collapse>
                    </Box>
                </Stack>
            </Box>

        </Container>
    </>;
}