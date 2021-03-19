function TaskItem(props) {
    let {task} = props;
    const onUpdateStatus = () => {
      props.onUpdateStatus(props.task.key);
    }

    const onDelete = () => {
      props.onDelete(props.task.key);
    }

    const onUpdate = () => {
      props.onUpdate(props.task.key);
    }

  return (
    <tr>
      <td>{props.id + 1}</td>
      <td>{task.name}</td>
      <td className="text-center">
        <span className={task.status === true ? "label label-danger" : "label label-success"}
              onClick={onUpdateStatus}>
          {task.status === true ? "Active" : "Hidden"}
        </span>
      </td>
      <td className="text-center">
        <button type="button" className="btn btn-warning" onClick={onUpdate}>
          <span className="fa fa-pencil mr-5"></span>Edit
        </button>
        &nbsp;
        <button type="button" className="btn btn-danger"  onClick={onDelete}>
          <span className="fa fa-trash mr-5"></span>Delete
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;