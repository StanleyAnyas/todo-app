import './App.css';
import React, { useState } from 'react';

function App() {
    const [todo, setTodo] = useState({description: '', date: '', time: '', done: false});
    const [todos, setTodos] = useState([]);

    const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = () => {
    setTodos([...todos, todo]);
  }

  const deleteTodo = (row) => {
    setTodos(todos.filter((todo, index) => index !== row));
  }
  const doneTodo = (row) => {
    setTodos(todos.map((todo, index) => index === row ? {...todo, done: true} : todo));
  }
  return (
    <div className="App">
      <input placeholder="Description" name="description" value={todo.description} onChange={inputChanged} />
      <input type={'time'} placeholder="Time" name="time" value={todo.time} onChange={inputChanged}/>
      <input type={"date"} placeholder="Date" name="date" value={todo.date} onChange={inputChanged}/>
      <button onClick={addTodo}>Add</button>
      <table>
  <tbody>
    {todos.map((todo, index) => (
      <tr key={index} style={{ backgroundColor: todo.done ? 'green' : 'transparent' }}>
        <td className='todo-cell'>
          To do <h3>{todo.description}</h3> by <h3>{todo.time}</h3> on <h3>{todo.date}</h3>
        </td>
        <td>
          <button onClick={() => deleteTodo(index)} style={{ color: "red" }}>
            Delete
          </button>
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
