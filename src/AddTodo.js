import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const AddTodo = (prop) => {
    const [open, setOpen] = useState(false);
    const [todo, setTodo] = useState({description: "", date: "", priority: ""});
    
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const inputChanged = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value});
    }
    const handleSave = () => {
        prop.addTodo(todo);
        handleClose();
    }
  return (
    <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
           Add Todo       
        </Button>
        <Dialog open={open}>
            <DialogTitle>New Todo</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" name="description" value={todo.description} onChange={inputChanged} label="Description" fullWidth />
                <TextField margin="dense" name="date" value={todo.date} onChange={inputChanged} label="Date" fullWidth />
                <TextField margin="dense" name="priority" value={todo.priority} onChange={inputChanged} label="Priority" fullWidth />
            </DialogContent> 
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancle</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>   
        </Dialog>    
    </div>
  );
};

export default AddTodo;