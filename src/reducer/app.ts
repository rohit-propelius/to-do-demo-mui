import { filterFun } from "../assests/app";


export const reducer = (state: IReducerObj, action: IActionObj): IReducerObj => {
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
