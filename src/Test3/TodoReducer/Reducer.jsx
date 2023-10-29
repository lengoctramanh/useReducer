import * as TYPES from "./ActionType";

export const initialData = [];

 const jobListReducer = (state = initialData, action) => {
  const { type } = action;
  switch (type) {
    case TYPES.ADD_TO_DO:
      return [
        ...state,
        {
          text: action.payload,
          isComplete: false,
          isEditing: false,
        },
      ];

    case TYPES.DELETE_TO_DO:
      return state.filter((item, index) => index !== action.payload);

    case TYPES.EDIT_TO_DO:
      return state.map((jobList, index) => {
        return index === action.payload
          ? {
              ...jobList,
              isEditing: false,
              text: action.payload.text,
            }
          : jobList;
      });

    case TYPES.TOGGLE_TO_DO:
      return state.map((jobList, index) => {
        return index === action.payload
          ? {
              ...jobList,
              isComplete: !jobList.isComplete,
            }
          : jobList;
      });

    case TYPES.TOGGLE_EDIT_MODE_TO_DO:
      return state.map((jobList, index) => {
        return index === action.payload.index
          ? {
              ...jobList,
              isEditing: !jobList.isEditing,
            }
          : jobList;
      });
    default:
      return state;
  }
};

export default jobListReducer