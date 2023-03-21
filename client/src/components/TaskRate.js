import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

function TaskRate({ task_rate, toggle_task_rate }) {
  const [rates, setRate] = useState({});
  const dataFetch = async () => {
    return await axios
      .get("http://localhost:4000/api/task/comp-rate")
      .then((res) => {
        setRate(res.data.completion_rate_per_day);
      });
  };
  useEffect(() => {
    dataFetch();
  }, [toggle_task_rate]);
  return (
    <div>
      <Modal isOpen={task_rate} toggle={toggle_task_rate}>
        <ModalHeader toggle={toggle_task_rate}>Task Rate</ModalHeader>
        <ModalBody>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Completion rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(rates).map((rate, index) => (
                <tr key={index}>
                  <th scope="row"> {rate}</th>
                  <td> {rates[rate] ? rates[rate]?.toFixed(2) : "0.00"}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default TaskRate;
