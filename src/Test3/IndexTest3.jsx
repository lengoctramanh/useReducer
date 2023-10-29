// REACT
import { Fragment, useReducer, useState } from "react";

// LIBRARY
import { ToastContainer } from "react-toastify";

// STYLES
import "./Test3.css";

// UTILS
import * as ToastUtils from "../utils/toast";

// REDUCER
import * as Action from "./TodoReducer/Action";
import jobListReducer from "./TodoReducer/Reducer";
// import logger from "logger";
import { initialData } from "./TodoReducer/Reducer";

const JobList = () => {
  const [jobList, dispatch] = useReducer(jobListReducer, initialData);
  const [editJobList, setEditJobList] = useState("");
  const [newJob, setNewJob] = useState("");
  //ADD
  const upgrade = () => {
    if (newJob.trim() === "") {
      ToastUtils.showToastError("Vui lòng không để trống!");
      return;
    }
    dispatch(Action.upgradeNewTask(newJob));
    ToastUtils.showToastSuccess(`Đã thêm ${newJob} thành công`);
    setNewJob("");
  };

  //DELETE
  const remove = (index) => {
    const presentTask = jobList[index].text;
    dispatch(Action.removeTask(index));
    ToastUtils.showToastSuccess(`Đã xóa ${presentTask} thành công`);
  };

  //EDIT
  const change = (index) => {
    const presentValue = jobList[index].text;
    if (editJobList.trim() === "")
      return ToastUtils.showToastError("Vui lòng không để trống !");
    dispatch(Action.upgradeNewTask(index, editJobList));
    if (presentValue === editJobList)
      return ToastUtils.showToastInfor("Không có sự thay đổi nào!");
    ToastUtils.showToastSuccess(
      `Đã thay đổi ${presentValue} thành công thành ${editJobList}`
    );
  };

  // TOGGLE
  const isToggle = (index) => {
    dispatch(Action.updateToggle(index));
  };

  // TOGGLE EDIT MODE
  const isToggleEditMode = (index) => {
    dispatch(Action.updateEditMode(index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    upgrade();
  };
  return (
    <Fragment>
      <ToastContainer />
      <div className="todo-list">
        <h1>Job List</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="todo-input"
            type="text"
            value={newJob}
            onChange={(e) => setNewJob(e.target.value)}
            placeholder="Type your task here!, please"
          />
          <button className="todo-button" >Create</button>
        </form>
        <ul className="todo-items">
          {jobList.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo.isEditing ? (
                <Fragment>
                  <input
                    className="todo-input todo-input-editing"
                    type="text"
                    placeholder="Type new task,please!"
                    value={editJobList}
                    onChange={(e) => setEditJobList(e.target.value)}
                  />
                  <button onClick={() => change(index)} className="save-button">
                    Save
                  </button>
                  <button
                    onClick={() => isToggleEditMode(index)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <span
                    onClick={() => isToggle(index)}
                    className={
                      todo.completed ? "todo-text completed" : "todo-text"
                    }
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => isToggleEditMode(index)}
                    className="edit-button"
                  >
                    Change
                  </button>
                  <button
                    onClick={() => remove(index)}
                    className="delete-button"
                  >
                    Remove
                  </button>
                </Fragment>
              )}
            </li>
          ))}
          
        </ul>
      </div>
    </Fragment>
  );
};
export default JobList;
