import React, { useState } from "react";
import EditTask from "../modals/EditTask";

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);
  const created_date = new Date(taskObj.createdAt).toDateString();

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    console.log(obj._id);
    // updateListArray(obj, taskObj._id);
  };

  const handleDelete = () => {
    deleteTask(taskObj._id);
  };
  return (
    <>
      <div
        className="card border-secondary"
        style={{ width: "20%", height: "30%" }}
      >
        <div
          className="card-header"
          style={{ width: "100%", backgroundColor: `${taskObj.tag_color}` }}
        >
          Tag:{" "}
          <label className="m-1" style={{ fontWeight: "bold" }}>
            {" "}
            {taskObj.task_tag}
          </label>
          <div className="icons">
            <i
              className="bi pencil bi-pencil-square"
              onClick={() => setModal(true)}
            >
              <EditTask
                modal={modal}
                toggle={toggle}
                updateTask={updateTask}
                taskObj={taskObj}
              />
            </i>
          </div>
          <div className="icons">
            <i className="bi trash bi-trash3" onClick={handleDelete}></i>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{taskObj.task_name}</h5>
          <p className="card-text text-truncate">{taskObj.task_description}</p>
          <p className="card-text">{created_date}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
