import { Fragment, useReducer, useState } from "react";
import "./Tes2.css";

const Test2 = () => {
  // Create initial state
  const initialState = [];

  // Create actions
  const ADD_TASK = "ADD_TASK";
  const TOGGLE_TASK = "TOGGLE_TASK";
  const DELETE_TASK = "DELETE_TASK";
  const TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE";
  const EDIT_TASK = "EDIT_TASK";

  // Reducer
  const todoReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
      // Thêm một nhiệm vụ mới vòa danh sách
      case ADD_TASK:
        return [
          // Copy toàn bộ phần tử trong state ban đầu
          ...state,
          // Thêm một phần tử mới ở cuối mảng
          {
            text: action.payload,
            completed: false,
            isEditing: false,
          },
        
        ];
      // Từ đỏ trả về một mảng mới chứa nhiệm vụ từ state ban đầu và nhiệm vụ đc thêm vào cuối mảng với các thuộc tính

      // Thay đổi trạng thái hoàn thành của một nhiệm vụ
      case TOGGLE_TASK:
        /** + Method map lọc qua các phần tử của state ban đầu
         *  + Với mỗi phần tử, ktra xem chỉ số index có trùng với action.payload hay ko
         *  + Nếu trùng thì thay đổi trạng thái task
         * Và tạo ra một ob mới bằng:copy thuộc tính của task hiện tại,chuyển thuộc tính completed bằng gtri nguoc
         *  + Nếu ko trùng thì trả về mảng ban đầu nghĩa là ko có sự toggle gì hết*/
        return state.map((task, index) => {
          index === action.payload
            ? { ...task, completed: !task.completed }
            : task;
        });

      // Xóa đi task
      case DELETE_TASK:
        /** + Method filter tạo ra  phần tử mới thỏa điều kiện
     *  + Với mỗi phần tử, ktra xem chỉ số index của ptu có trùng với action.payload ko
     *  + Nếu không bằng action.payload, điều kiện index !== action.payload sẽ trả về true, phần tử được giữ lại trong mảng mới
     *  + Nếu bằng action.payload,điều kiện trả về false, phần tử bị loại bỏ khỏi mảng mới.
        + Trả về là một mảng mới  chứa các nhiệm vụ có chỉ số khác với action.payload, tức là nhiệm vụ cần xóa đã được xóa khỏi danh sách 
     */console.log(state)

        return state.filter((item ,index) => index !== action.payload);


      // Chuyển đổi chế độ
      case TOGGLE_EDIT_MODE:
        return state.map((task, index) => {
          index === action.payload
            ? { ...task, isEditing: !task.isEditing }
            : task;
        });
      // Khi chuyển đổi chế độ thì luôn muốn kích hoặc trạng thái sửa hay ko sửa

      // Sửa nội dung task
      case EDIT_TASK:
        return state.map((task, index) => {
          index === action.payload.index
            ? { ...task, text: action.payload.text, isEditing: false }
            : task;
        });
      /** + Phải truy cập vào thuộc tính index của ob action.payload
    + .text để cập nhật nội dung mới cho phần tử trong mảng state
    + Khi cập nhật task mới thì kết thúc trạng thái chỉnh sửa của task mới đó và hiển thị nội dung đã được cập nhật.*/
      default:
        return state;
    }
  };
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditTask] = useState("");

  // Khi ko có task mới thì retrun dừng. Có task mới thì dispatch type action...
  // Nhập task mới xong thì trả lại gtri rỗng
  const addTask = () => {
    if (newTask.trim() === "") return;
    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });
    setNewTask("");
    console.log(todos)
  };

  const toggleTask = (index) => {
    dispatch({
      type: "TOGGLE_TASK",
      payload: index,
    });
  };

  const deleteTask = (index) => {
    dispatch({
      type: "DELETE_TASK",
      payload: index,
    });
  };

  const toggleEditMode = (index) => {
    dispatch({
      type: "TOGGLE_EDIT_MODE",
      payload: index,
    });
    // Set lại gtri cho biến
    //todos là một arr, index là chỉ số các phần tử trong arr đó, truy cập vào thuộc tính text để hiển thị lại task mới
    setEditTask(todos.text);
  };

  const editTask = (index) => {
    dispatch({
      type: "EDIT_TASK",
      // Truyền vào object mới vs thuộc tính
      // index chỉ số task
      // text nội dung mới
      payload: { index, text: editingTask },
    });
    // Edit xong thì trả về mảng rỗng
    setEditTask("");
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div className="to-do-list">
      <Fragment>
        <h1>To do list</h1>
        <input
          className="todo-input"
          type="text"
          placeholder="Add new task"
          value={newTask}
          onChange={handleChange}
        />
        <button onClick={addTask}>Add</button>
        <ul className="todo-items">
          {todos.map((todo, index) => (
            <li key={index} className="todo-items">
             
              {todo.isEditing ? (
                /** + Check công việc đang được chỉnh sửa*/
                <Fragment>
                  <input
                    className="todo-input todo-ibput-editng"
                    
                    type="text"
                    placeholder="Type your tasks,please..."
                    onChange={(e) => setEditTask(e.target.value)}
                  />
                  <button onClick={() => editTask()} className="save-button">
                    Save
                  </button>
                </Fragment>
              ) : ( 
                /** Check công việc không được chỉnh sửa */
                <Fragment>
                  <span
                    className={
                      todo.completed ? "todo-text completed" : "todo-text"
                    }
                    onClick={() => toggleTask(index)}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => toggleEditMode(index)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </Fragment>
              )}
            </li>
          ))}
        </ul>
      </Fragment>
    </div>
  );
};

export default Test2;
/**Nếu , 
 * nó sẽ hiển thị một ô input để người dùng có thể chỉnh 
 * sửa nội dung công việc và một nút "Save" để lưu thay đổi. 
 * Nếu , nó sẽ hiển thị nội dung 
 * công việc, các nút "Edit" và "Delete" để người dùng có thể 
 * chỉnh sửa hoặc xóa công việc tương ứng. */
