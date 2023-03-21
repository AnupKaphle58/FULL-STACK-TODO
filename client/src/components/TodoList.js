import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import Selector from "./Selector";
import axios from "axios";
import TaskRate from "./TaskRate";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [task_rate, setTaskRate] = useState(false);
  const url = "http://localhost:4000/api/task";
  const [data, setData] = useState([]);

  const fetchAll = async () => {
    return await axios.get(url).then((res) => {
      setData(res.data.allTask);
    });
  };

  useEffect(() => {
    fetchAll();
  }, [modal]);

  const deleteTask = async (id) => {
    await axios.delete(`${url}/${id}`).then(() => window.location.reload());
  };

  const filteredTask = async (status) => {
    return await axios
      .get(`${url}/filter/${status}`)
      .then((res) => setData(res.data.allTask));
  };

  const toggle = () => {
    setModal(!modal);
  };

  const toggle_task_rate = () => {
    setTaskRate(!task_rate);
  };

  return (
    <div className="main">
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        <Selector filteredTask={filteredTask} fetchAll={fetchAll} />
        <button
          type="button"
          style={{ position: "absolute", right: " 15px" }}
          className={`btn btn-light mt-2`}
          onClick={() => setTaskRate(true)}
        >
          Task Rate
        </button>
        <TaskRate toggle_task_rate={toggle_task_rate} task_rate={task_rate} />
        {data &&
          data.map((obj) => (
            <Card taskObj={obj} key={obj._id} deleteTask={deleteTask} />
          ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} />
    </div>
  );
};

export default TodoList;
