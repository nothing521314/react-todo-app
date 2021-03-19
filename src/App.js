import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

function App() {
  let [tasks, setTasks] = useState([]);
  let [editting, setEditting] = useState([]);
  let [isDisplayForm, setIsDisplayForm] = useState(false);

  const onSubmit = (name, status) => {
    let data = {
                key: generateKey(),
                name: name,
                status: status
                }
    setTasks(tasks => [...tasks, data]);
    console.log("local: ", localStorage.getItem("tasks", JSON.stringify(tasks)))
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const onUpdateStatus = (key) => {
    let index = findIndex(key);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      setTasks(tasks => [...tasks]);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));

  }

  const onDelete = (key) => {
    let index = findIndex(key);
    if (index !== -1) {
      tasks.splice(index, 1);
      setTasks(tasks => [...tasks]);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    onCloseForm();
  }

  const onUpdate = (key) => {
    onToggleForm();
    let index = findIndex(key);
    let editting = tasks[index];
    setEditting(editting => [...editting]);
    console.log("edit: ", editting)
  }

  const onToggleForm = () => {
    setIsDisplayForm(isDisplayForm = !isDisplayForm);
  };

  const onCloseForm = () => {
    setIsDisplayForm(isDisplayForm = false);
  }

  const onShowForm = () => {}

  const findIndex = (key) => {
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.key === key) {
        result = index;
      }
    });
    return result;
  }
  
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  };

  function generateKey () {
    return s4() + s4() + "-" + s4() + s4() + s4() + "-" + s4()
  }

  let elmTaskForm = isDisplayForm ? <TaskForm onCloseForm={onCloseForm} 
                                              onSubmit={onSubmit}
                                              edit={editting}
                                    /> : ""
                                             
  useEffect( () => {
    // Anything in here is fired on component mount.
    if (localStorage && localStorage.getItem("tasks")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      console.log("task usefx", tasks);
      setTasks(tasks);
    }
  },[]);


  return (
    <div className="container">
      <div className="text-center">
        <h1>Todo App</h1>
      </div>
      <div className="row">
        {/* Task form */}
        {elmTaskForm}
        <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
          <button type="button" 
                  className="btn btn-primary"
                  onClick={onToggleForm}>
            <span className="fa fa-plus mr-5"></span>Add Job
          </button>
          {/* Search sort */}
          <Control/>
          <TaskList task = {tasks} 
                    onUpdateStatus={onUpdateStatus} 
                    onDelete={onDelete}
                    onUpdate={onUpdate}/>
        </div>
      </div>
    </div> 
  );
}

export default App;
