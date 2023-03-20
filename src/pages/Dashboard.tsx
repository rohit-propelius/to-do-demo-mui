import {useState} from 'react';

import { Box, Typography, AppBar, Toolbar, IconButton, Drawer, List, ListItemButton,ListItemIcon, ListItemText, Avatar, Divider, TextField, InputAdornment} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Menu, Home } from "@mui/icons-material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';

const useStyles = makeStyles((theme) => ({
    box:{
        backgroundColor:'black',
        width:'100vw',
        height:'100vh',
    },
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
                <ListItemButton className={classes.listItem} key={index}>
                    <ListItemIcon className={classes.listItem}>
                    {listItem.listIcon}
                    </ListItemIcon>
                    <ListItemText primary={listItem.listText} />
                </ListItemButton>
                ))}
            </List>
        </Box>
    );

    return (
      <Box className={classes.box}>
        <AppBar>
          <Toolbar sx={{ display: "flex", justifyContent: 'space-between' }}>
            <IconButton onClick={toggleSlider}>
              <Menu />
            </IconButton>
            <Typography color={"white"}>To Do List</Typography>
            <Drawer open={open} anchor={"left"} onClose={toggleSlider}>
              {sideList()}
            </Drawer>
            <TextField
              id="input-with-icon-textfield"
              placeholder="Find task..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Dashboard;