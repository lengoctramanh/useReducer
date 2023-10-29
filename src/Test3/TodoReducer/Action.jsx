import * as TYPES from './ActionType'
// ADD
export const upgradeNewTask=(jobList) => {
    return {
        type:TYPES.ADD_TO_DO,
        payload:jobList
    }
}
//EDIT
export const changeOtherTask=(jobList)=> {
    return {
        type:TYPES.EDIT_TO_DO,
        payload:jobList
    }
}

// DELETE
export const removeTask=(jobList)=> {
    return {
        type:TYPES.DELETE_TO_DO,
        payload:jobList
    }
}

//TOGGLE
export const updateToggle=(jobList)=> {
    return {
        type:TYPES.TOGGLE_TO_DO,
        payload:jobList
    }
}

//TOGGLE EDIT MODE
export const updateEditMode=(jobList)=> {
    return {
        type:TYPES.TOGGLE_EDIT_MODE_TO_DO,
        payload:jobList
    }
}