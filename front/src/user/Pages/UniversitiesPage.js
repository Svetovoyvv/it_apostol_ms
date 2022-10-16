import {
    Box,
    Container,
    Stack,
    Toolbar,
    Typography,
    IconButton
} from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import {UniversityItemMobile} from "./University/UniversityItemMobile";
import {UniversitiesService} from "../../client";
import {useIsMobile, useLocalStorage} from "../../hooks";
import {useState} from "react";
export default function UniversitiesPage() {
    const isMobile = useIsMobile();
    const UniversityItem = isMobile ? UniversityItemMobile : UniversityItemMobile;
    const [universities, setUniversities] = useLocalStorage("universities", []);
    const updateUniversities = () => {
        UniversitiesService.getAllUniversitiesApiV1UniversitiesGet().then(res => {
            setUniversities(res);
        })
    }
    if (universities.length === 0) {
        updateUniversities()
    }
    return <>
        <Toolbar/>
        <Container>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 1,
                flexDirection: "column"
            }}>
                <Stack direction="row" marginBottom={2} spacing={2}>
                    <Typography variant="h4" fontWeight="900" sx={{
                        textAlign: "center",
                    }}>
                        Список поддерживаемых ВУЗов
                    </Typography>
                    <IconButton size="large" onClick={() => {
                        updateUniversities()
                    }}>
                        <UpdateIcon/>
                    </IconButton>
                </Stack>
                <Box sx={{
                    width: "100%",
                    maxWidth: 800,
                    paddingBottom: 5
                }}>
                    <Stack spacing={3}>
                        {universities.map((item, index) =>
                            <UniversityItem
                                key={index}
                                name={item.display_name}
                                description={item.description}
                                studyDirections={item.study_directions}
                            />
                        )}
                    </Stack>
                </Box>

            </Box>
        </Container>
    </>
}