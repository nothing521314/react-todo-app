import React, { useState } from 'react';
import TaskItem from "./TaskItem";

function TaskList(props) {
  const [filter, setFilter] = useState({
    filterName: "",
    filterStatus: -1
  });
  const tasks = props.task;

  let elmTask = tasks.map((task, index) => {
      return <TaskItem key={task.key} id={index} task={task} 
                       onUpdateStatus={props.onUpdateStatus}
                       onDelete={props.onDelete}
                       onUpdate={props.onUpdate}/>
    });

  const onChange = (event) => {
    const {name, value} = event.target;
    props.onFilter(
      name === "filterName" ? value : filter.filterName,
      name === "filterStatus" ? value : filter.filterStatus
    );
    setFilter({...filter, [name]: value});
  }
    
  return (
    <div className="row mt-15">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input type="text" className="form-control" name="filterName" value={filter.filterName} onChange={onChange}/>
              </td>
              <td>
                <select className="form-control" name="filterStatus" value={filter.filterStatus} onChange={onChange}>
                  <option value={-1}>All</option>
                  <option value={0}>Hide</option>
                  <option value={1}>Active</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmTask}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;