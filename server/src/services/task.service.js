// model
import { Task } from "../models/index.js";

const yesterday = new Date(Date.now() - 86400000);
const a_day_before_yesterday = new Date(Date.now() - 86400000 - 86400000);
const today = new Date(Date.now()).toISOString().split("T")[0];

export const completedRate = async () => {
  const completed_task = await Task.find({ task_status: "COMPLETED" });
  const task = await Task.find();
  const task_count = task.length;
  const completion_rate_per_day = {};
  let task_completed_a_day_before_yesterday = 0;
  let task_completed_yesterday = 0;
  let task_completed_today = 0;
  try {
    for (let i = 0; i < completed_task.length; i++) {
      if (completed_task[i].updatedAt.getDate() === yesterday.getDate()) {
        task_completed_yesterday++;
      } else if (
        completed_task[i].updatedAt.getDate() ===
        a_day_before_yesterday.getDate()
      ) {
        task_completed_a_day_before_yesterday++;
      } else {
        task_completed_today++;
      }
    }
    completion_rate_per_day[
      a_day_before_yesterday.toISOString().split("T")[0]
    ] = (task_completed_a_day_before_yesterday / task_count) * 100;
    completion_rate_per_day[yesterday.toISOString().split("T")[0]] =
      (task_completed_yesterday / task_count) * 100;
    completion_rate_per_day[today] = (task_completed_today / task_count) * 100;
    return {
      type: "Success",
      statusCode: 200,
      message: "Rate of task",
      completion_rate_per_day,
    };
  } catch (error) {
    return {
      type: "Error",
      message: "OPPS! Something went wrong",
      statusCode: 400,
    };
  }
};

export const getAllTask = async () => {
  const allTask = await Task.find();
  if (allTask.length === 0) {
    return {
      type: "Success",
      message: "There are no task currently.",
      statusCode: 204,
    };
  }
  return {
    type: "Success",
    statusCode: 201,
    message: "Task fetched successfully",
    allTask,
  };
};

export const getFilteredTask = async (task_status) => {
  const allTask = await Task.find({ task_status: task_status.status });
  if (allTask.length === 0) {
    return {
      type: "Success",
      message: "There are no task currently.",
      statusCode: 204,
    };
  }
  return {
    type: "Success",
    statusCode: 201,
    message: "Task fetched successfully",
    allTask,
  };
};

export const createTask = async (body) => {
  const { task_name, task_status, task_description, task_tag, tag_color } =
    body;
  if (!task_name || !task_status || !task_description) {
    return {
      type: "Error",
      message: "Fields cannot be empty",
      statusCode: 400,
    };
  }
  try {
    const task = await Task.create({
      task_name,
      task_description,
      task_status,
      task_tag,
      tag_color,
    });
    return {
      type: "Success",
      statusCode: 201,
      message: "Task created successfully",
      task,
    };
  } catch (error) {
    if (error.errors.task_status.kind == "enum") {
      return {
        type: "Error",
        statusCode: 403,
        message: "Allowed value for taskstatus are : ['INPROGRESSS', 'DONE' ]",
      };
    }
    return {
      type: "Error",
      statusCode: 404,
      message: "Opps something went wrong",
    };
  }
};

export const updateTask = async (body, id) => {
  const { task_status } = body;
  if (!task_status) {
    return {
      type: "Error",
      message: "Fields cannot be empty",
      statusCode: 400,
    };
  }
  try {
    const findtask = await Task.findById({ _id: id });
    if (!findtask) {
      return {
        type: "Error",
        statusCode: 409,
        message: "Could not find the task ",
      };
    }
    if (body.task_status === "INPROGRESS") {
      await Task.findByIdAndUpdate(id, body, { timestamps: false });
      return {
        type: "Success",
        statusCode: 200,
        message: "Updated",
      };
    } else {
      await Task.findByIdAndUpdate(id, body);
      return {
        type: "Success",
        statusCode: 200,
        message: "Updated",
      };
    }
  } catch (error) {
    return {
      type: "Error",
      statusCode: 404,
      message: "Opps something went wrong",
    };
  }
};

export const deleteTask = async (id) => {
  if (!id) {
    return {
      type: "Error",
      message: "Specify a task to delete",
      statusCode: 400,
    };
  }
  try {
    const findtask = await Task.findById({ _id: id });
    if (!findtask) {
      return {
        type: "Error",
        statusCode: 409,
        message: "Task not found to delete",
      };
    }
    await Task.findByIdAndDelete(id);
    return {
      type: "Success",
      statusCode: 200,
      message: "Deleted task",
    };
  } catch (error) {
    return {
      type: "Error",
      statusCode: 404,
      message: "Opps something went wrong",
    };
  }
};
