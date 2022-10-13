import {useState} from "react";
import {Box, Button, Collapse, Divider, List, ListItem, Paper, Popover, Typography} from "@mui/material";

export const UniversityItemDesktop = ({name, description, studyDirections}) => {
    studyDirections = studyDirections ?? [];
    const [anchorElement, setAnchorElement] = useState(null);
    const [isOpened, setOpened] = useState(false);
    const [isHoverPopover, setHoverPopover] = useState(false);
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
            justifyContent: "space-between",
            alignItems: "center"
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
                Показать направления
            </Button>
        </Box>
        <Popover
                open={isOpened}
                onClose={() => setOpened(false)}
                anchorEl={anchorElement}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
            >
                <List>
                    {studyDirections.map((direction, index) => (
                        <ListItem
                            key={index}
                            onMouseEnter={() => setHoverPopover(true)}
                            onMouseLeave={() => setHoverPopover(false)}
                        >
                            <Collapse
                                orientation="horizontal"
                                in={isHoverPopover}
                                collapsedSize={"6.5ch"}
                            >
                                <Box sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "block",
                                    whiteSpace: "nowrap",
                                }}>
                                    <Typography>
                                        <b>{direction.id}</b>&nbsp;{direction.name}
                                    </Typography>
                                </Box>
                            </Collapse>
                        </ListItem>
                    ))}
                </List>
            </Popover>
    </Paper>
}