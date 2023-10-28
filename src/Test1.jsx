import { Fragment, useReducer } from "react";

const Test1 = () => {
  // Create initial state
  const initState = { count: 0 };
  // count được khởi tạo với giá trị ban đầu {count: 0}

  // Create actions
  const UP_ACTION = "UP_ACTION"; // Đặt tên biến in hoa
  const DOWM_ACTION = "DOWM_ACTION";

  // Reducer
  /** + Tạo hàm reducer
   *  + Nguyên tắc chạy:nhận state state hiện tại và action và trả về state mới
   *  +
   */

  const reducer = (state, action) => {
    console.log("re-render", "===============");
    switch (action.type) {
      case UP_ACTION:
        return { count: state.count + 1 }; // state này là hiện tại
      case DOWM_ACTION:
        return { count: state.count - 1 };
      default:
        return state;
    }
  };
  // setCount thay thành dispatch giúp action chạy đc
  /** + useReducer chưa gọi hàm reducer liền */
  const [count, dispatch] = useReducer(reducer, initState);
  // count là đối tượng chứa trạng thái hiện tại của ứng dụng.
  const handleUp = () => {
    dispatch({ type: "UP_ACTION" }); // dispatch cần truyển vào một action
    {
      /**+ Lấy UP_ACTION này gọi hàm reducer
    + Thì lấy state hiện tại là initState và action từ dispatch 
    + Lúc đó nó đối chiếu với cây case và trả về theo logic
    +  Render lại, upgrade lại state, */
    }
  };
  const handleDown = () => {
    dispatch({ type: "DOWM_ACTION" });
  };
  return (
    <Fragment>
      {/** Hiển thị giá trị của count trong đối tượng count */}
      <h1>Count:{count.count}</h1>

      <button onClick={handleUp}>Up</button>

      <button onClick={handleDown}>Down</button>
    </Fragment>
  );
};

export default Test1;
