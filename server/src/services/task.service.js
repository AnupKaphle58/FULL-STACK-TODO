// model
import { Task } from "../models/index.js";

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
  const { task_name, task_status, task_description, task_tag } = body;
  console.log(body);
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
  console.log(id, body);
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
    console.log(findtask, "found");
    if (!findtask) {
      return {
        type: "Error",
        statusCode: 409,
        message: "Could not find the task ",
      };
    }
    await Task.findByIdAndUpdate(id, body);
    return {
      type: "Success",
      statusCode: 200,
      message: "Updated",
    };
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
