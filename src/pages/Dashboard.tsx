import React, { ChangeEvent, useEffect, useState } from "react";
import { arr, ACTIONS as AC, globalStateObj } from "../data/data";
import {
  addTask,
  removeAllTasks,
  removeTask,
  editTask,
  completeTask,
  filterTask,
  stateValues,
} from "../reducer/appSlice";
import { useAppSelector, useAppDispatch } from "../assests/hooks/hooks";

import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  TextField,
  InputAdornment,
  Card,
  Paper,
  CardHeader,
  CardContent,
  Grid,
  Button
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { Menu, Home } from "@mui/icons-material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';
import '../App.css';
import { log } from "console";

// Make Style Hooks for particular Page
const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: "black",
    width: "100vw",
    height: "100%",
  },
  menuSliderContainer: {
    width: 250,
    background: "#a3a3a3",
    height: "100%",
  },
  avatar: {
    margin: "0.5rem auto",
    padding: "1rem",
  },
  listItem: {
    color: "tan",
  },
  wrapper: {
    padding: "1rem",
  },
  rootCard: {
    padding: "1rem",
    margin: "1rem",
    background: "#a3a3a3",
    borderRadius: "10px",
  },
  listItems: {
    padding: "1rem",
    background: "white",
    borderRadius: "1",
  },
  cardContent: {
    padding: "1rem",
    display: "grid",
    columnGap: "1rem",
    rowGap: "1rem",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  actionButtons: {
    minWidth: "0px"
  }
}));

function Dashboard (){
  // Start : App.tsx Code
  const [globalStateVal, setGlobalStateVal] = useState(globalStateObj);
  console.log('globalStateValue :: :: :: ', globalStateVal);
  const { reducerValues: rV } = useAppSelector(stateValues);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: AC.SETDATA,
      value: arr,
    });
    return () => {
      dispatch({
        type: AC.SETDATA,
        value: [],
      });
    };
  }, []);

  const addToList = () => {
    let textboxVal = globalStateVal.values["taskbox"]?.value;
    if (!!textboxVal && textboxVal.length > 0) {
      dispatch(addTask({ value: textboxVal }));
      globalStateVal.values = {};
    } else console.error("Empty Value in Add Task Box!");
  };

  const getEditValue = (key: number) => {
    setGlobalStateVal({
      ...globalStateVal,
      values: {
        ...globalStateVal.values,
        editbox: {
          key: key,
          value: rV.todos[key],
        },
      },
    });
  };

  const editToDo = () => {
    let val = globalStateVal.values["editbox"];

    if (val.key !== undefined) {
      if (!!val.value) dispatch(editTask({ key: val.key, value: val.value }));
      else console.error("Empty Value Found for Edit!");
    } else {
      console.error("no element to edit found");
    }
  };

  const completeToDo = (key: number) => {
    dispatch(completeTask({ value: key, key: key }));
  };

  const removeToDo = (key: number) => {
    dispatch(removeTask({ key: key }));
  };

  const RemoveFromList = () => {
    dispatch(removeAllTasks());
    globalStateVal.values = {};
  };

  const setGlobalStateValFn = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('E :: :: ::: :',  e.target.value)
    setGlobalStateVal({
      ...globalStateVal,
      values: {
        ...globalStateVal.values,
        [e.target.attributes[2].value]: {
          ...globalStateVal.values[e.target.attributes[2].value],
          value: e.target.value,
        },
      },
    });
  };

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    let searchVal: any = document.getElementById("q");
    if (!!searchVal) searchVal = searchVal.value;
    dispatch(filterTask({ value: searchVal }));
  };
  // END : App.tsx Code

  const classes = useStyles(); // classes definition for particular page
  const [open, setOpen] = useState(false);

  // Function to Open/Close Toggle Sidebar/Drawer
  const toggleSlider = () => {
    setOpen(!open);
  };

  // list Item Data to render on sidebar/drawer
  const listItems = [
    {
      listIcon: <Home />,
      listText: "Dashboard",
      url: "/dashboard",
    },
    {
      listIcon: <AddBoxIcon />,
      listText: "Add Task",
      url: "/add-task",
    },
    {
      listIcon: <LibraryAddCheckIcon />,
      listText: "Completed",
      url: "/completed",
    },
    {
      listIcon: <DeleteForeverIcon />,
      listText: "Remove All",
      url: "/removeall",
    },
  ];

  // function to render sidebar/drawer list items
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
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
      <Box className={classes.wrapper}>
        {/* START : Add Edit Card */}
        <Card
          className={classes.rootCard}
          sx={{ backgroundColor: "#a3a3a3 !important" }}
        >
          <CardHeader title="Add/Edit To Do" />
          <Divider></Divider>
          <CardContent
            className={classes.cardContent}
            sx={{
              gridTemplateColumns: "repeat(1, 1fr)",
            }}
          >
            <Grid container>
              <Grid item={true} xs={12} sm={12} md={6} lg={6}>
                <Paper className={classes.listItems} variant="outlined">
                  <TextField
                    id="addTask"
                    label="Enter Task Value"
                    variant="standard"
                    name="taskbox"
                    onChange={setGlobalStateValFn}
                    value={globalStateVal.values["taskbox"]?.value || ""}
                  />
                  <Button
                    sx={{ minWidth: "0px" }}
                    onClick={addToList}
                  >
                    Add Task
                  </Button>
                </Paper>
              </Grid>
              <Grid item={true} xs={12} sm={12} md={6} lg={6}>
                <Paper className={classes.listItems} variant="outlined">
                  <TextField
                    id="addTask"
                    label="Task Edit Value"
                    variant="standard"
                    name="editbox"
                    onChange={setGlobalStateValFn}
                    value={globalStateVal.values["editbox"]?.value || ""}
                  />
                  <Button
                    sx={{ minWidth: "0px" }}
                    onClick={editToDo}
                  >
                    Edit Task
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* END : Add Edit Card */}

        {/* START : To Dos Card */}
        <Card
          className={classes.rootCard}
          sx={{ backgroundColor: "#a3a3a3 !important" }}
        >
          <CardHeader title="Tasks To Do" />
          <Divider></Divider>
          <CardContent className={classes.cardContent}>
            {rV.todos.map((val, key) => {
              return (
                <Grid container>
                  <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                    <Paper className={classes.listItems} variant="outlined">
                      <Grid container>
                        <Grid item={true} xs={8} sm={8} md={8} lg={8}>
                          <Typography
                            variant="h6"
                            sx={{
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              fontSize: "16px",
                            }}
                          >
                            {val}
                          </Typography>
                        </Grid>
                        <Grid item={true}
                          xs={4}
                          sm={4}
                          md={4}
                          lg={4}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            sx={{ minWidth: "0px" }}
                            onClick={() => getEditValue(key)}
                          >
                            !
                          </Button>
                          <Button
                            sx={{ minWidth: "0px" }}
                            onClick={() => completeToDo(key)}
                          >
                            √
                          </Button>
                          <Button
                            sx={{ minWidth: "0px" }}
                            onClick={() => removeToDo(key)}
                          >
                            X
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              );
            })}
          </CardContent>
        </Card>
        {/* END : To Dos Card */}

        {/* START : Completed Tasks Card */}
        <Card
          className={classes.rootCard}
          sx={{ backgroundColor: "#a3a3a3 !important" }}
        >
          <CardHeader title="Completed Tasks" />
          <Divider></Divider>
          <CardContent className={classes.cardContent}>
            {rV.completed.map((val) => {
              return (
                <Grid container>
                  <Grid item={true} xs={12} sm={12} md={12} lg={12}>
                    <Paper className={classes.listItems} variant="outlined">
                      <Typography
                        variant="h6"
                        sx={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "16px",
                        }}
                      >
                        {val}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              );
            })}
          </CardContent>
        </Card>
        {/* END : Completed Tasks Card */}
      </Box>
    </Box>
  );
}

export default Dashboard;
{/* <Grid xs={12} sm={12} md={12} lg={12}>
  <Grid container>
    <Grid xs={8} sm={8} md={8} lg={8}></Grid>
    <Grid xs={4} sm={4} md={4} lg={4}>
      X
    </Grid>
  </Grid>
</Grid>; */}