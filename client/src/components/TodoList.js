import React, { useEffect, useState } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import Selector from "./Selector";
import axios from "axios";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const url = "http://localhost:4000/api/task";
  const [data, setData] = useState([]);

  const fetchAll = async () => {
    return await axios.get(url).then((res) => {
      setData(res.data.allTask);
    });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`${url}/${id}`).then(() => window.location.reload());
  };

  const filteredTask = async (status) => {
    return await axios
      .get(`${url}/filter/${status}`)
      .then((res) => setData(res.data.allTask));
  };

  // const updateListArray = (obj, index) => {
  //   let tempList = taskList;
  //   tempList[index] = obj;
  //   localStorage.setItem("taskList", JSON.stringify(tempList));
  //   setTaskList(tempList);
  //   window.location.reload();
  // };

  const toggle = () => {
    setModal(!modal);
  };

  // const saveTask = (taskObj) => {
  //   let tempList = taskList;
  //   tempList.push(taskObj);
  //   localStorage.setItem("taskList", JSON.stringify(tempList));
  //   setTaskList(taskList);
  //   setModal(false);
  // };

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
        {data &&
          data.map((obj) => (
            <Card
              taskObj={obj}
              key={obj._id}
              deleteTask={deleteTask}
              // updateListArray={updateListArray}
            />
          ))}
      </div>
      {/* <CreateTask toggle={toggle} modal={modal} save={saveTask} /> */}
      <CreateTask toggle={toggle} modal={modal} />
    </div>
  );
};

export default TodoList;
