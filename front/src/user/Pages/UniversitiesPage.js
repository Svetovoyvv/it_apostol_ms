import {
    Box,
    Container,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";

import {UniversityItemMobile} from "./University/UniversityItemMobile";
import {UniversitiesService} from "../../client";
import {useIsMobile, useLocalStorage} from "../../hooks";
import {useState} from "react";
export default function UniversitiesPage() {
    const isMobile = useIsMobile();
    const UniversityItem = isMobile ? UniversityItemMobile : UniversityItemMobile;
    const [universities, setUniversities] = useLocalStorage("universities", []);
    if (universities.length === 0) {
        UniversitiesService.getAllUniversitiesApiV1UniversitiesGet().then(res => {
            setUniversities(res);
        })
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
                <Typography variant="h4" fontWeight="900" sx={{
                    textAlign: "center",
                    marginBottom: 2
                }}>
                    Список поддерживаемых ВУЗов
                </Typography>
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