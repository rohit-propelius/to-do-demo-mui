import React, {
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import "./App.css";
import { arr, ACTIONS as AC, globalStateObj } from "./data/data";
import {
  addTask,
  removeAllTasks,
  removeTask,
  editTask,
  completeTask,
  filterTask,
  stateValues
} from "./reducer/appSlice";
import { useAppSelector, useAppDispatch } from "./assests/hooks/hooks";
import { Link } from "react-router-dom";

function App() {
  const [globalStateVal, setGlobalStateVal] = useState(globalStateObj);
  const { reducerValues: rV } = useAppSelector(stateValues);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({
      type: AC.SETDATA, value: arr,
    })
    return () => {
      dispatch({
        type: AC.SETDATA,
        value: []
      });
    };
  }, []);

  const addToList = () => {
    let textboxVal = globalStateVal.values["taskbox"]?.value;
    if (!!textboxVal && textboxVal.length > 0) {
      dispatch(addTask({ value: textboxVal }))
      globalStateVal.values = {};
    } else 
      console.error('Empty Value in Add Task Box!')
  };

  const getEditValue = (key: number) => {
    setGlobalStateVal({
      ...globalStateVal,
      values: {
        ...globalStateVal.values,
        "editbox":{
          key: key,
          value: rV.todos[key]
        }
      }
    });
  };

  const editToDo = () => {
    let val = globalStateVal.values['editbox'];

    if(val.key !== undefined){
      if(!!val.value)
        dispatch(editTask({key: val.key, value: val.value}))
        else 
        console.error('Empty Value Found for Edit!')
    } else {
      console.error('no element to edit found'); 
    }
  };

  const completeToDo = (key: number) => {
    dispatch(completeTask({value: key, key: key}))
  };

  const removeToDo = (key: number) => {
    dispatch(removeTask({key: key}))
  };

  const RemoveFromList = () => {
    dispatch(removeAllTasks());
    globalStateVal.values = {}
  };

  const setGlobalStateValFn = (e: ChangeEvent<HTMLInputElement>) => {
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
    let searchVal: any = document.getElementById("q")
    if (!!searchVal) searchVal = searchVal.value
    dispatch(filterTask({value: searchVal}))
  };

  return (
    <div className="App">
      {/* <Link href={`/dashboard`}>Dashboard</Link> */}
      <Link to={'/dashboard'}>Dashboard</Link>
      <h1>To Do App MUI</h1>
      <div className="row">
        <div className="column">
          <form onSubmit={formHandler}>
            <input
              type="search"
              id="q"
              name="q"
              placeholder="Filter tasks"
            ></input>
            <button type="submit">Find</button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input
            type="textbox"
            placeholder="Enter new task"
            name="taskbox"
            value={globalStateVal.values["taskbox"]?.value || ""}
            onChange={setGlobalStateValFn}
          />
        </div>
        <div className="col">
          <button onClick={addToList}>Add Task</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input
            type="textbox"
            placeholder="Edit Task Value"
            name="editbox"
            value={globalStateVal.values["editbox"]?.value || ""}
            onChange={setGlobalStateValFn}
          />
        </div>
        <div className="col">
          <button onClick={editToDo}>Edit Task</button>
        </div>
      </div>
      <div className="row">
        <button onClick={RemoveFromList}>Remove All Task</button>
      </div>
      <div className="row">
        <div className="column">Tasks To Do</div>
        <div className="column">Completed</div>
        <div className="column">Filtered</div>
      </div>
      <div className="row">
        <div className="column">
          {rV.todos.map((val: string, key: number) => {
            return (
              <div key={`keyR${key}`} className="">
                <div className="">
                  <label key={`key${key}`}>
                    No. {key + 1} : {val}{" "}
                  </label>
                  <button onClick={() => getEditValue(key)}>!</button>
                  <button onClick={() => completeToDo(key)}>√</button>
                  <button onClick={() => removeToDo(key)}>X</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="column">
          {rV.completed.map((val: string, key: number) => {
            return (
              <div key={`keyR${key}`} className="">
                <div className="">
                  <label key={`key${key}`}>
                    No. {key + 1} : {val}{" "}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        <div className="column">
          {rV.filterdData.map((val: string, key: number) => {
            return (
              <div key={`keyR${key}`} className="">
                <div className="">
                  <label key={`key${key}`}>
                    No. {key + 1} : {val}{" "}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
