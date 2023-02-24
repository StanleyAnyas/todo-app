import './App.css';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import IconButton from'@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App() {
    const [todo, setTodo] = useState({description: '', date: '', time: '', done: false});
    const [todos, setTodos] = useState([]);
    const [filled, setFilled] = useState(" ");

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
    }
  }

  const deleteTodo = (row) => {
    setTodos(todos.filter((todo, index) => index !== row));
  }
  const doneTodo = (row) => {
    setTodos(todos.map((todo, index) => index === row ? {...todo, done: true} : todo));
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
      <Stack spacing={2} mt={2} direction="row" justifyContent="center" alignItems="center">
      <TextField type={Text} label="Description" variant="outlined" name="description" value={todo.description} onChange={inputChanged} />
      <TextField id="outlined-basic" type={"time"} variant="outlined" name="time" value={todo.time} onChange={inputChanged}/>
      <TextField id="outlined-basic" type={"date"} variant="outlined" name="date" value={todo.date} onChange={inputChanged}/>
      <Button variant="contained" onClick={addTodo}>Add</Button>
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
          <IconButton>
            <DeleteIcon onClick={() => deleteTodo(index)} style={{ color: "red" }}/>
          </IconButton>
          {!todo.done && <button onClick={() => doneTodo(index)} style={{ color: "green" }}>
            Done
          </button>}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default App;
