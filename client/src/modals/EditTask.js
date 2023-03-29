import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { CirclePicker } from "react-color";
import axios from "axios";

const EditTaskPopup = ({ modal, toggle, taskObj }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");
  const id = taskObj._id;
  const options = [{ INPROGRESS: "INPROGRESS" }, { COMPLETED: "COMPLETED" }];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else if (name === "status") {
      setStatus(value);
    } else if (name === "tag") {
      setTag(value);
    } else if (name === "description") {
      setDescription(value);
    } else {
      setColor(value);
    }
  };

  const onClickChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    setTaskName(taskObj.task_name);
    setDescription(taskObj.task_description);
    setTag(taskObj.task_tag);
    setStatus(taskObj.task_status);
    setColor(taskObj.tag_color);
  }, []);
  const handleColor = (e) => {
    setColor(e.hex);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let taskObj = {};
    taskObj["task_name"] = taskName;
    taskObj["task_description"] = description;
    taskObj["task_status"] = status;
    taskObj["task_tag"] = tag;
    taskObj["tag_color"] = color;
    await axios
      .patch(`http://localhost:4000/api/task/${id}`, taskObj)
      .then(() => {
        toggle("false");
        console.log(id);
        window.location.reload();
      });
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
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
          <Input
            type="select"
            onClick={onClickChange}
            defaultValue={taskObj.task_status}
          >
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
          <label>Tag color</label>
          <CirclePicker color={color} onChange={handleColor} />
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
