import React, {
  useEffect,
  useReducer,
  useState,
} from "react";
import "./App.css";
import { arr, ACTIONS as AC } from "./data/data";
import { reducer } from "./reducer/app";

let reducerObj: IReducerObj = {
  count: 0,
  todos: [],
  completed: [],
  filterdData: [],
};

function App() {
  const [tBVal, setTBVal] = useState("");
  const [editVal, setEditVal] = useState({ key: NaN, value: "" });
  const [state, dispatch] = useReducer(reducer, reducerObj);

  useEffect(() => {
    dispatch({
      type: AC.SETDATA, value: arr,
      key: editVal.key
    })
    return () => {
      dispatch({
        type: AC.SETDATA,
        value: [],
        key: editVal.key,
      });
    };
  }, []);

  const addToList = () => {
    if (tBVal.length > 0) {
      dispatch({
        type: AC.ADD,
        value: tBVal,
        key: editVal.key,
      });
      setTBVal("");
    }
  };

  const getEditValue = (key: number) => {
    setEditVal({
      key: key,
      value: state.todos[key]
    });
  };

  const editToDo = () => {
    let val = editVal;
    dispatch({type: AC.EDIT, key: val.key, value: val.value})
  };

  const completeToDo = (key: number) => {
    dispatch({
      type: AC.COMPLETE,
      value: key,
      key: editVal.key,
    });
  };

  const removeToDo = (key: number) => {
    dispatch({
      type: AC.REMOVE,
      value: key,
      key: editVal.key,
    });
  };

  const RemoveFromList = () => {
    dispatch({
      type: AC.REMOVEALL,
      value: tBVal,
      key: editVal.key,
    });
    setTBVal('')
    setEditVal({key: NaN, value: ''})
  };

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    let searchVal: any = document.getElementById("q")
    if (!!searchVal) searchVal = searchVal.value
    dispatch({
      type: AC.FILTER,
      value: searchVal,
      key: editVal.key,
    });
  };

  return (
    <div className="App">
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
            value={tBVal}
            onChange={(e) => setTBVal(e.target.value)}
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
            value={editVal.value}
            onChange={(e) => setEditVal({ ...editVal, value: e.target.value })}
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
          {state.todos.map(
            (
              val: string,
              key: number
            ) => {
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
            }
          )}
        </div>
        <div className="column">
          {state.completed.map(
            (
              val: string,
              key: number
            ) => {
              return (
                <div key={`keyR${key}`} className="">
                  <div className="">
                    <label key={`key${key}`}>
                      No. {key + 1} : {val}{" "}
                    </label>
                  </div>
                </div>
              );
            }
          )}
        </div>
        <div className="column">
          {state.filterdData.map(
            (
              val:string,
              key: number
            ) => {
              return (
                <div key={`keyR${key}`} className="">
                  <div className="">
                    <label key={`key${key}`}>
                      No. {key + 1} : {val}{" "}
                    </label>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
