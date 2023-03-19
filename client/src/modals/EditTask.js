import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import axios from "axios";

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("");
  const options = [{ INPROGRESS: "INPROGRESS" }, { COMPLETED: "COMPLETED" }];
  const id = taskObj._id;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else if (name === "status") {
      setStatus(value);
    } else if (name === "tag") {
      setTag(value);
    } else {
      setDescription(value);
    }
  };

  const onClickChange = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };

  useEffect(() => {
    setTaskName(taskObj.task_name);
    setDescription(taskObj.task_description);
    setTag(taskObj.task_tag);
    setStatus(taskObj.task_status);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(id);
    let taskObj = {};
    taskObj["task_name"] = taskName;
    taskObj["task_description"] = description;
    taskObj["task_status"] = status;
    taskObj["task_tag"] = tag;
    await axios
      .patch(`http://localhost:4000/api/task/${id}`, taskObj)
      .then(() => window.location.reload());
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={handleChange}
            name="taskName"
          />
        </div>
        <div className="form-group">
          <label>Task Status</label>
          <Input type="select" onClick={onClickChange}>
            {options.map((option, index) => {
              return (
                <option value={Object.values(option)} key={index}>
                  {" "}
                  {Object.keys(option)}{" "}
                </option>
              );
            })}
          </Input>
        </div>
        <div className="form-group">
          <label>Task tag</label>
          <input
            type="text"
            className="form-control"
            value={tag}
            onChange={handleChange}
            name="tag"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTaskPopup;
