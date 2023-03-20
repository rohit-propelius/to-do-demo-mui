import { Box, Typography, AppBar, Toolbar, IconButton, Drawer } from '@mui/material';
import { Apps, Menu, ContactMail, AssignmentInd, Home } from "@mui/icons-material";
import React, {useState} from 'react';
function Dashboard (){

    const [open, setOpen] = useState(false);

    const toggleSlider = () => {
        setOpen(!open);
    };
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
                        this is list
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Dashboard;