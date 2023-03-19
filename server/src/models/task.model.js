import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    task_name: {
      type: String,
      required: [true, "Please enter the task name"],
      trim: true,
    },
    task_description: {
      type: String,
      required: [true, "Please enter the task description"],
      trim: true,
    },
    task_status: {
      type: String,
      enum: ["INPROGRESS", "COMPLETED"],
      required: true,
      default: "INPROGRESS",
    },
    task_tag: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
