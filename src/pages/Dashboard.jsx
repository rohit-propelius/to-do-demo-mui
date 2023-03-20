import { Box, Typography, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton,ListItemIcon, ListItemText, Avatar, Divider} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Menu, Home, HeightOutlined } from "@mui/icons-material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useState} from 'react';
import '../App.css';

const useStyles = makeStyles((theme) => ({
    menuSliderContainer: {
        width: 250,
        background: "#a3a3a3",
        height: "100%"
    },
    avatar: {
        margin: "0.5rem auto",
        padding: "1rem",
    },
    listItem: {
        color: "tan"
    }
}));

function Dashboard (){

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const toggleSlider = () => {
        setOpen(!open);
    };

    const listItems = [
        {
            listIcon: <Home />,
            listText: "Dashboard",
            url: "/dashboard"
        },
        {
            listIcon: <AddBoxIcon />,
            listText: "Add Task",
            url: "/add-task"
        },
        {
            listIcon: <LibraryAddCheckIcon />,
            listText: "Completed",
            url: "/completed"
        },
        {
            listIcon: <DeleteForeverIcon />,
            listText: "Remove All",
            url: "/removeall"
        }
    ];

    const sideList = () => (
        <Box className={classes.menuSliderContainer} component="div">
        <Avatar
            className={classes.avatar}
            src="https://i.ibb.co/rx5DFbs/avatar.png"
            alt="Juaneme8"
        />
        <Divider />
        <List>
            {listItems.map((listItem, index) => (
            <ListItem className={classes.listItem} button key={index}>
                <ListItemIcon className={classes.listItem}>
                {listItem.listIcon}
                </ListItemIcon>
                <ListItemText primary={listItem.listText} />
            </ListItem>
            ))}
        </List>
        </Box>
    );

    return (
        <Box 
            backgroundColor={'black'}
            width={'100vw'}
            height={'100vh'}
        >
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton onClick={toggleSlider}>
                        <Menu/>
                    </IconButton>
                    <Typography color={'white'}>
                        To Do List
                    </Typography>
                    <Drawer open={open} anchor={'left'} onClose={toggleSlider} width={'33.33%'}>
                        {sideList()}
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Dashboard;