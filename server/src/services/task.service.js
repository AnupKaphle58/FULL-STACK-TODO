// model
import { Task } from "../models/index.js";

const yesterday = new Date(Date.now() - 86400000);
const a_day_before_yesterday = new Date(Date.now() - 86400000 - 86400000);
const today = new Date(Date.now());

export const completedRate = async () => {
  try {
    const pipeline = [
      {
        $setWindowFields: {
          output: {
            totalCount: {
              $count: {},
            },
          },
        },
      },
      {
        $match: {
          updatedAt: {
            $gte: new Date("2023-03-01"),
            $lte: new Date("2023-03-30"),
          },
          task_status: "COMPLETED",
        },
      },
      {
        $project: {
          totalCount: 1,
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$updatedAt",
            },
          },
          tasks: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          totalCount: 1,
          tasks: 1,
          avg: {
            $multiply: [
              {
                $divide: ["$tasks", "$totalCount"],
              },
              100,
            ],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          avg: {
            $sum: "$avg",
          },
        },
      },
    ];
    const completion_rate_per_day = await Task.aggregate(pipeline);
    console.log(completion_rate_per_day);
    return {
      type: "Success",
      statusCode: 200,
      message: "Rate of task",
      completion_rate_per_day,
    };
  } catch (error) {
    console.log(error);
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
  console.log(body, id);
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
