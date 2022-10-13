import {Box, Container, Stack, Toolbar, Typography} from "@mui/material";

export default function Error404Page({description}){
    const descriptionText = description ?? '';
    return <>
        <Toolbar/>
        <Container>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 5
            }}>
                <Stack>
                    <Typography variant="h2" textAlign="center">
                        404
                    </Typography>
                    { descriptionText.length > 0 ?
                        <Typography variant="h2" textAlign="center">
                            Description: {descriptionText}
                        </Typography> : null
                    }
                    <Typography variant="h3" textAlign="center">
                        Пашол нахуй
                    </Typography>

                </Stack>
            </Box>
        </Container>
    </>
}