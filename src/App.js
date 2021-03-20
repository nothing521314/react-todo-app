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
  let [filter, setFilter] = useState({
    name: "",
    status: -1
  })
  let [search, setSeacrch] = useState({
    keyword: ""
  })

  const onSubmit = (data) => {
    let arr = tasks;

    if (!data.key) {
      data.key = generateKey()
      arr.push(data);
    } else {
      let index = findIndex(data.key);
      arr[index] = data;
    }
    setTasks(arr);
    setEditting(null);
    localStorage.setItem("tasks", JSON.stringify(arr));
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
      console.log(tasks)
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    onCloseForm();
  }

  const onUpdate = (key) => {
    let index = findIndex(key);
    // let editting = tasks[index];
    setEditting(tasks[index]);
    console.log("editting: ", editting)
    onShowForm();
  }

  const onFilter = (name, status) => {
    name = name.toLowerCase()
    status = parseInt(status, 10);
    setFilter({name, status});  
  }

  const onToggleForm = () => {
    setIsDisplayForm(isDisplayForm = true);
    setEditting(null);
  };

  const onCloseForm = () => {
    setIsDisplayForm(isDisplayForm = false);
    setEditting(null);
  }

  const onShowForm = () => {
    setIsDisplayForm(isDisplayForm = true);
  }

  const onSearch = (keyword) => {
    setSeacrch(keyword)
  }

  const findIndex = (key) => {
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.key === key) {
        result = index;
      }
    });
    return result;
  }

  useEffect( () => {
    if (localStorage && localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  },[]);
  
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  };

  function generateKey () {
    return s4() + s4() + "-" + s4() + s4() + s4() + "-" + s4()
  }

  let elmTaskForm = isDisplayForm ? <TaskForm
    onCloseForm={onCloseForm} 
    onSubmit={onSubmit}
    edit={editting}
  /> : ""
      
  if (filter) {
    // let tasksFilter = tasks            
    if (filter.name) {
      tasks = tasks.filter(task => {
        return task.name.toLowerCase().indexOf(filter.name) !== -1;
      })
    }
    tasks = tasks.filter(task => {
      if (filter.status === -1) {
        return tasks
      } else {
        console.log("filter: ", tasks)
        return task.status === (filter.status === 0 ? false : true);
      }
    })
    // tasks = tasksFilter
  }
  

  //search
  // if (search) {
  //   if (search.keyword) {
  //     tasks = tasks.filter(task => {
  //       return task.name.toLowerCase().indexOf(search.keyword) !== -1;
  //     })
  //   }

  return (
    <div className="container">
      <div className="text-center">
        <h1 className="title-h1">Todo App by Nothing</h1>
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
          <Control onSearch = {onSearch}/>
          <TaskList task = {tasks} 
                    onUpdateStatus={onUpdateStatus} 
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onFilter={onFilter}/>
        </div>
      </div>
    </div> 
  );
}

export default App;
