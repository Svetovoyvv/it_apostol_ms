import {Box, Container, Stack, Toolbar, Typography} from "@mui/material";

export default function Error404Page({description}){
    const descriptionText = description ?? '';
    return <>
        <Toolbar/>
        <Container>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Stack>
                    <Typography variant="h2">
                        404
                    </Typography>
                    { descriptionText.length > 0 ?
                        <Typography variant="h2">
                            Description: {descriptionText}
                        </Typography> : null
                    }

                </Stack>
            </Box>
        </Container>
    </>
}