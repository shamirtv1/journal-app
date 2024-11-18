import {
    Box,
    Divider,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {TurnedInNot} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../store";
import {noteType, setActiveNote} from "../../store/journal/journalSlice.ts";

const SideBar = ({ drawerWidth = 240 }: { drawerWidth: number }) => {

    const dispatch = useAppDispatch();

    const { displayName } = useAppSelector(state => state.auth);
    const { notes } = useAppSelector(state => state.journal);

    const onActiveNote = (note: noteType) =>{
        dispatch(setActiveNote(note));
    }

    return (
        <Box
            component={'nav'}
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >

            <Drawer
                variant="permanent"
                open={ true }
                sx={{
                    display: { xs: 'block'},
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >

                <Toolbar>
                    <Typography variant="h6" noWrap>{ displayName?.toUpperCase() }</Typography>

                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map((note: noteType) =>(
                            <ListItem
                                onClick={ () => onActiveNote(note)}
                                key={note.id} disablePadding={true} >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot />
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={note.title} />
                                        <ListItemText secondary={note.body} />
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    );
};

export default SideBar;