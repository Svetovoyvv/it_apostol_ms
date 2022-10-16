import {Box, Container, Stack, Toolbar, Typography} from "@mui/material";

export default function Error404Page({description}){;
    return <>
        <Toolbar/>
        <Container>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 5
            }}>
                <Stack>
                    <Typography variant="h3" textAlign="center">
                        404
                    </Typography>
                    <Typography variant="h3" textAlign="center">
                        {description ?? "Страница не найдена"}
                    </Typography>

                </Stack>
            </Box>
        </Container>
    </>
}