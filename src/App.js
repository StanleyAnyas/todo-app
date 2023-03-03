import './App.css';
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import IconButton from'@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
//import { DataGrid } from '@mui/x-data-grid';
import AddTodo from './AddTodo';


function App() {
    const [todo, setTodo] = useState({description: '', date: '', time: '', done: false});
    const [todos, setTodos] = useState([]);
    const [filled, setFilled] = useState(" ");
    todo.id = new Date().getTime();
    //const newTodo = { ...todo, id: new Date().getTime() };
    useEffect(() => {
        fecthItems();
    }, []);

    const fecthItems = () => {
        fetch('https://my-todolist-app-cff9e-default-rtdb.europe-west1.firebasedatabase.app/.json')
        .then(response => response.json())
        .then(data => setTodos(Object.values(data)))
        .catch(error => console.log(error));
    }

    const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = () => {
    if (todo.description === '' || todo.date === '' || todo.time === '') {
      setFilled("Please fill in all fields", 2000);
    }else{
      setTodos([...todos, todo]);
      setTodo({description: '', date: '', time: '', done: false});
      setFilled(" ");
      saveTodos();
    }
  }

  const deleteTodo = (row) => {
    setTodos(todos.filter((todo, index) => index !== row));
  }
  const doneTodo = (row) => {
    setTodos(todos.map((todo, index) => index === row ? {...todo, done: true} : todo));
  }
  
  const undoTodo = (row) => {
    setTodos(todos.map((todo, index) => index === row ? {...todo, done: false} : todo));
  }
  
  const saveTodos = () => {
    fetch('https://my-todolist-app-cff9e-default-rtdb.europe-west1.firebasedatabase.app/.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todos)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  }
  
  const deleteAllTodos = () => {
    setTodos([]);
    setFilled(" ");
  }
 
  const deleteAllDoneTodos = () => {
    setTodos(todos.filter(todo => !todo.done));
    setFilled(" ");
  }
 // create a function undelete the todo
  const undeleteTodo = (row) => {
    setTodos(todos.filter((todo, index) => index !== row));
  }
  const undeleteButton = (row) => {
     // after 5 seconds the button should disappear
    return (
      <Button variant="contained" onClick={() => undeleteTodo(row)}>Undelete</Button>
    )
  }
  setTimeout(() => {
    undeleteButton();
  }, 5000);
  const undoButton = (row) => {
    return (
      <Tooltip title="Reset as undone">
        <Button variant="contained" onClick={() => undoTodo(row)}>Undo</Button>
      </Tooltip>
      
    )
  }
  
    const deleteAllButton = () => {
    return (
      <Button variant="contained" onClick={() => deleteAllTodos()}>Delete all</Button>
    )
    }
   
    const deleteAllDoneButton = () => {
    return (
      <Button variant="contained" onClick={() => deleteAllDoneTodos()}>Delete all done</Button>
    )
    }
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Todolist
          </Typography>
        </Toolbar>
      </AppBar>
      <AddTodo addTodo={addTodo} />
      <Stack spacing={2} mt={2} direction="row" justifyContent="center" alignItems="center">
      <TextField type={Text} label="Description" variant="outlined" name="description" value={todo.description} onChange={inputChanged} />
      <TextField id="outlined-basic" type={"time"} variant="outlined" name="time" value={todo.time} onChange={inputChanged}/>
      <TextField id="outlined-basic" type={"date"} variant="outlined" name="date" value={todo.date} onChange={inputChanged}/>
      <Tooltip title="Add todo">
        <Button variant="contained" startIcon={<SaveIcon />} onClick={addTodo}>Add</Button>
      </Tooltip>
      </Stack>
      <br/>
      <p style={{color: "red"}}>{filled}</p>
      <table>
  <tbody>
    {todos.map((todo, index) => (
      <tr key={index} style={{ backgroundColor: todo.done ? 'green' : 'transparent' }}>
        <td className='todo-cell'>
          <h3>{todo.description}</h3> by <h3>{todo.time}</h3> on <h3>{todo.date}</h3>
        </td>
        <td>
              <Tooltip title="Delete todo">
                <IconButton onClick={() => deleteTodo(index)} size="small" color="red">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
          {!todo.done && <IconButton onClick={() => doneTodo(index)} style={{ color: "green" }}>
            <DoneIcon />
          </IconButton>}
          {todo.done && undoButton(index)}
        </td>
      </tr>
    ))}
  </tbody>
  <br/>
  <Tooltip title="Delete all todos">
    {deleteAllButton()}
  </Tooltip>
  <br/>
  <br/>
  <Tooltip title="Delete all done todos">
    {deleteAllDoneButton()}
  </Tooltip>
</table>
    </div>
  );
}

export default App;
