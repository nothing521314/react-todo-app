import React, { useState } from "react";
import { useEffect } from "react";

function TaskForm(props) {

  const [inputValue, setInputValue] = useState({
    key: "",
    name: "",
    status: false
  })

  const handleOnChange = (event) => {
    const {name, value} = event.target;
    setInputValue({...inputValue, [name]: value});
  }
  
  const onCloseForm = () => {
    props.onCloseForm();
  }
  
  const onSubmit = (event) => {
    event.preventDefault();
    (inputValue.status === "true" || inputValue.status === true) ? (inputValue.status = true) : (inputValue.status = false);
    props.onSubmit(inputValue);
    onClear();
    onCloseForm();
  }

  const onClear = () => {
    setInputValue({
      name: "",
      status: false
      });
  }

  useEffect( () => {
    if (props.edit) {
      let cache =   {
        key: props.edit.key,
        name: props.edit.name,
        status: props.edit.status
      };
      setInputValue(cache)
    } else if (!props.edit) {
      setInputValue({
        key: "",
        name: "",
        status: false
      })
    }
  },[props.edit]);

  return (
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{inputValue.key ? "Editting" : "Adding"}
            <span className="fa fa-times-circle fl-right"
                  onClick={onCloseForm}>
            </span>
          </h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label >Name: </label>
              <input type="text" 
                    className="form-control" 
                    name="name"
                    value={inputValue.name}
                    onChange={handleOnChange}/>
            </div>
            <span className="label">Status: </span>
            <select name="status" 
                    className="form-control" 
                    value={inputValue.status}
                    onChange={handleOnChange}>
              <option value={true}>Active</option>
              <option value={false}>Hide</option>
            </select><br/>
            <div className="text-center">
              <button type="submit" className="btn btn-warning" onClick={onSubmit}>
                <span className="fa fa-plus mr-5"></span>Save
              </button>&nbsp;
              <button type="button" className="btn btn-danger" onClick={onClear}>
                <span className="fa fa-plus mr-5"></span>Cancel
              </button>&nbsp;
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;