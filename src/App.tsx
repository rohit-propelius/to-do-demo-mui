import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useReducer,
  useState,
} from "react";
import "./App.css";

const arr = [
  "Drink tea",
  "Make Breakfast",
  "Make Bed",
  "Pack lunch",
  "Put clothes for laundry",
];

const filterFun = (arr: any[], findVal: any) => {
  let filter = arr.filter((val: string) => {
    let regEx = new RegExp(`${findVal}`, "gi");
    let matchVal = val.match(regEx);
    if (!!matchVal) return val;
  });
  return filter;
};

interface IReducerObj {
  count: number;
  todos: string[];
  completed: string[];
  filterdData: string[];
}

interface IActionObj {
  type: string;
  value: string | {};
  key: string | number;
}

let reducerObj: IReducerObj = {
  count: 0,
  todos: [],
  completed: [],
  filterdData: [],
};

const reducer = (state: IReducerObj, action: IActionObj): IReducerObj => {
  let returnObj: IReducerObj = { ...state };
  switch (action.type) {
    case "SETDATA":
      returnObj = {
        ...state,
        todos: Array.isArray(action.value) ? action.value : [],
      };
      break;
    case "ADD":
      if (typeof action.value === "string") {
        returnObj = {
          ...state,
          todos: [...state.todos, action.value],
        };
      }
      break;
    case "EDIT":
      if (!!action.value && typeof action.value === "string") {
        let key: number | string = action.key;
        if (typeof key === "string") key = parseInt(key);
        state.todos[key] = action.value;
      }

      returnObj = {
        ...state,
      };
      break;
    case "COMPLETE":
      returnObj = {
        ...state,
        completed: [
          ...state.completed,
          state.todos.find((val: string, key: number) => key === action.value)!,
        ],
        todos: state.todos.filter(
          (val: string, key: number) => key !== action.value
        ),
      };
      break;
    case "REMOVE":
      returnObj = {
        ...state,
        count: state.count + 1,
        todos: state.todos.filter(
          (val: string, key: number) => key !== action.value
        ),
      };
      break;
    case "REMOVEALL":
      returnObj = {
        count: 0,
        todos: [],
        completed: [],
        filterdData: [],
      };
      break;
    case "FILTER":
      returnObj = {
        ...state,
        filterdData: filterFun(state.todos, action.value),
      };
      break;
    default:
      returnObj = {
        ...state,
      };
  }
  return returnObj;
};

interface IDispatchType {
  type: string;
  value: {} | string | number;
}

function App() {
  const [tBVal, setTBVal] = useState("");
  const [editVal, setEditVal] = useState({ key: NaN, value: "" });
  // const [state, dispatch] = useReducer(reducer, {count: 0, todos:[], completed:[], filterdData:[]})
  const [state, dispatch] = useReducer(reducer, reducerObj);

  useEffect(() => {
    dispatch({
      type: 'SETDATA', value: arr,
      key: ''
    })
    return () => {
      dispatch({
        type: 'SETDATA', value: [],
        key: ''
      })
    };
  }, []);

  const addToList = () => {
    if (tBVal.length > 0) {
      dispatch({
        type: 'ADD', value: tBVal,
        key: ''
      })
      setTBVal("");
    }
  };

  const getEditValue = (key: string | number) => {
    key = typeof key === "string" ? parseInt(key) : NaN;
    setEditVal({
      key: key,
      value: state.todos[key]
    });
  };

  const editToDo = () => {
    let val = editVal;
    dispatch({type: 'EDIT', key: val.key, value: val.value})
  };

  const completeToDo = (key: any) => {
    dispatch({
      type: 'COMPLETE', value: key,
      key: ''
    })
  };

  const removeToDo = (key: any) => {
    dispatch({
      type: 'REMOVE', value: key,
      key: ''
    })
  };

  const RemoveFromList = () => {
    dispatch({
      type: 'REMOVEALL', value: tBVal,
      key: ''
    })
  };

  const formHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let searchVal: any = document.getElementById("q");
    if (!!searchVal) searchVal = searchVal.nodeValue;
    dispatch({
      type: 'FILTER', value: searchVal,
      key: ''
    })
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
              val:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined,
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
              val:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined,
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
              val:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined,
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
