import { useEffect, useReducer, useState } from 'react';
import './App.css';

const arr = [
  'Drink tea',
  'Make Breakfast',
  'Make Bed',
  'Pack lunch',
  'Put clothes for laundry'
]

const filterFun = (arr, findVal) => {
  let filter = arr.filter(val => {
    let regEx = new RegExp(`${findVal}`,'gi')
    let matchVal = val.match(regEx)
    if(!!matchVal)
      return val
  })
  return filter
}

const reducer= (state, action)=> {
  let returnObj = {}
  switch(action.type){
    case 'SETDATA' : 
      returnObj = {
        ...state,
        todos : [...action.value],
      }
    break;
    case 'ADD' : 
      returnObj = {
        ...state,
        todos : [...state.todos, action.value],
      }
    break;
    case 'EDIT' :
      if(!!action.value)
        state.todos[action.key] = action.value
      returnObj = {
        ...state
      }
    break;
    case 'COMPLETE' :
      returnObj = {
        ...state,
        completed: [...state.completed, state.todos.find((val,key) => key === action.value)],
        todos: state.todos.filter((val,key) => key !== action.value)
      }
    break;
    case 'REMOVE' : 
      returnObj = {
        ...state,
        count : state.count + 1,
        todos : state.todos.filter((val,key) => key !== action.value),
      }
    break;
    case 'REMOVEALL': 
      returnObj = {
        count : 0,
        todos : [],
        completed: [],
        filterdData: []
      }
    break;
    case 'FILTER': 
      returnObj = {
        ...state,
        filterdData: filterFun(state.todos, action.value)
      }
    break;
    default: 
      returnObj = {
        ...state
      }
  }
  return returnObj
}

function App() {
  const [tBVal, setTBVal] = useState('')
  const [editVal, setEditVal] = useState({key:NaN, value:''})
  const [state, dispatch] = useReducer(reducer, {count: 0, todos:[], completed:[], filterdData:[]})
   
  useEffect(() => {
      dispatch({type: 'SETDATA', value:arr})
    return () => {
      dispatch({type: 'SETDATA', value:[]})
    }
  },[])
  
  const addToList = () => {
    if(tBVal.length > 0){
      dispatch({type: 'ADD', value:tBVal})
      setTBVal('')
    }
  }

  const getEditValue = (key) => {
    setEditVal({
      key: key,
      value: state.todos[key]
    })
  }

  const editToDo = ()=>{
    let val = editVal
    dispatch({type: 'EDIT', key: val.key, value: val.value})
  }

  const completeToDo = (key) => {
    dispatch({type: 'COMPLETE', value:key})
  }

  const removeToDo = (key) => {
    dispatch({type: 'REMOVE', value:key})
  }

  const RemoveFromList = () => {
    dispatch({type: 'REMOVEALL', value:tBVal})
  }

  const formHandler = (e)=>{
    e.preventDefault();
    let searchVal = document.getElementById('q').value
    dispatch({type: 'FILTER', value:searchVal})
  }

  return (
    <div className="App">
    <h1>To Do App</h1>
    <div className='row'>
      <div className="column">
        <form onSubmit={formHandler}>
          <input type="search" id="q" name="q" placeholder='Filter tasks'></input>
          <button type='submit'>Find</button>
        </form>
      </div>
    </div>
    <div className="row">
      <div className="col" >
        <input type='textbox' placeholder='Enter new task' name="taskbox" value={tBVal} onChange={(e) => setTBVal(e.target.value)} />
      </div>
      <div className="col" >
        <button onClick={addToList}>Add Task</button>
      </div>
    </div>
    <div className="row">
      <div className="col" >
        <input type='textbox' placeholder='Edit Task Value' name="editbox" value={editVal.value} onChange={(e) => setEditVal({...editVal,value:e.target.value})} />
      </div>
      <div className="col" >
        <button onClick={editToDo}>Edit Task</button>
      </div>
    </div>
    <div className="row">
      <button onClick={RemoveFromList}>Remove All Task</button>
    </div>
    <div className='row'>
      <div className="column">Tasks To Do</div>
      <div className="column">Completed</div>
      <div className="column">Filtered</div>
    </div>
    <div className="row">
      <div className='column'>
        {
          state.todos.map((val,key) => {
            return ( 
              <div key={`keyR${key}`} className=''>
                <div className="">
                  <label key={`key${key}`}>No. {key+1} : {val} </label>
                  <button onClick={()=> getEditValue(key)}>!</button>
                  <button onClick={()=> completeToDo(key)}>√</button>
                  <button onClick={()=> removeToDo(key)}>X</button>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='column'>
        {
          state.completed.map((val,key) => {
            return ( 
              <div key={`keyR${key}`} className=''>
                <div className="">
                  <label key={`key${key}`}>No. {key+1} : {val} </label>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='column'>
        {
          state.filterdData.map((val,key) => {
            return ( 
              <div key={`keyR${key}`} className=''>
                <div className="">
                  <label key={`key${key}`}>No. {key+1} : {val} </label>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
    </div>
  );
}

export default App;
