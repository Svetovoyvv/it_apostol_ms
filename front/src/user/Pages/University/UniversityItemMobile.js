import {Box, Button, Collapse, Divider, List, ListItem, Paper, Popover, Typography} from "@mui/material";
import {useState} from "react";
import {useIsMobile} from "../../../hooks";

export const UniversityItemMobile = ({name, description, studyDirections}) => {
    studyDirections = studyDirections ?? [];
    const [anchorElement, setAnchorElement] = useState(null);
    const [isOpened, setOpened] = useState(false);
    const [isHoverPopover, setHoverPopover] = useState(false);
    const isMobile = useIsMobile();
    return <Paper sx={{
        padding: 2,
        borderRadius: 3
    }} elevation={5}>
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Typography variant="h4" fontWeight="700">
                {name}
            </Typography>
        </Box>
        <Divider sx={{marginY: 1}}/>
        <Box sx={{
            display: "flex",
            justifyContent: isMobile ? "center" : "space-between",
            alignItems: isMobile ? "start" : "center",
            flexDirection: isMobile ? "column" : "row",
            paddingBottom: 1
        }}>
            <Box sx={{width: "60%", marginRight: 1}}>
                <Typography variant="h5" fontWeight="600">
                    {description}
                </Typography>
            </Box>

            <Button variant="outlined" onClick={(e) => {
                setAnchorElement(e.target);
                setOpened(!isOpened);
            }}>
                {isOpened ? 'Скрыть' : 'Показать'} направления
            </Button>
        </Box>
        <Collapse in={isOpened}>
            <List disablePadding>
                {studyDirections.map((direction, index) => (
                    <ListItem key={index} disablePadding>
                        <Typography fontWeight="600">
                            <b>{direction.name}</b> {direction.description}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Collapse>

    </Paper>
}