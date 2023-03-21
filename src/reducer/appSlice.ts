
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { filterFun } from "../assests/app";

// export const reducer = (state: IReducerObj, action: IActionObj): IReducerObj => {
//   let returnObj: IReducerObj = { ...state };
//   switch (action.type) {
//     case "SETDATA":
//       returnObj = {
//         ...state,
//         todos: Array.isArray(action.value) ? action.value : [],
//       };
//       break;
//     case "ADD":
//       if (typeof action.value === "string") {
//         returnObj = {
//           ...state,
//           todos: [...state.todos, action.value],
//         };
//       }
//       break;
//     case "EDIT":
//       if (!!action.value && typeof action.value === "string") {
//         if(action.key!== undefined){
//           let key: number = action.key;
//           state.todos[key] = action.value;
//         }
//       }

//       returnObj = {
//         ...state,
//       };
//       break;
//     case "COMPLETE":
//       returnObj = {
//         ...state,
//         completed: [
//           ...state.completed,
//           state.todos.find((val: string, key: number) => key === action.key)!,
//         ],
//         todos: state.todos.filter(
//           (val: string, key: number) => key !== action.key
//         ),
//       };
//       break;
//     case "REMOVE":
//       returnObj = {
//         ...state,
//         count: state.count + 1,
//         todos: state.todos.filter(
//           (val: string, key: number) => key !== action.key
//         ),
//       };
//       break;
//     case "REMOVEALL":
//       returnObj = {
//         count: 0,
//         todos: [],
//         completed: [],
//         filterdData: [],
//       };
//       break;
//     case "FILTER":
//       returnObj = {
//         ...state,
//         filterdData: filterFun(state.todos, action.value),
//       };
//       break;
//     default:
//       returnObj = {
//         ...state,
//       };
//   }
//   return returnObj;
// };

import {arr} from '../data/data'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../store/store';

const initialState: IReducerObj = {
  count : 0,
  todos: arr,
  completed: [],
  filterdData: []
}

type TAction = PayloadAction<IActionObj>

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    addTask: (state, action: TAction) => {
      if (action.payload.value && typeof action.payload.value === "string") {
        state.todos.push(action.payload.value);
      }
    },
    removeTask: (state, action: TAction) => {
      state.todos = state.todos.filter((val: string, key: number)=> key!== action.payload.key)
    },
    editTask: (state, action: TAction)=> {
      if(action.payload.value && typeof action.payload.value === 'string'){
        if (action.payload.key !== undefined ) {
          state.todos[action.payload.key] = action.payload.value;
        }
      }
    },
    completeTask: (state, action: TAction)=> {
      if(action.payload.key != undefined){
        state.completed.push(state.todos[action.payload.key]);
        state.todos = state.todos.filter(
          (val: string, key: number) => key !== action.payload.key
        );
      } 
    },
    filterTask: (state, action: TAction)=> {
      state.filterdData = filterFun(state.todos, action.payload.value)
    },
    removeAllTasks: (state) => {
      // state = initialState;
      state.completed= []
      state.todos= arr
      state.filterdData= []
      state.count = 0
    },
    setData: (state) => {
      state.todos = arr
    }
  },
});

export const {addTask, removeAllTasks, removeTask, editTask, completeTask, filterTask, setData} = appSlice.actions

export const stateValues = (state: RootState) => state

export default appSlice.reducer;


