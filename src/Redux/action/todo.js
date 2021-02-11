import * as actionType from './action';

export const addTodo = (data) => {
  return {
    type: actionType.CREATE_TODO,
    payload: data,
  };
};

export const editTodo = (data) => {
  return {
    type: actionType.EDIT_TODO,
    payload: data,
  };
};

export const deleteTodo = (data) => {
  return {
    type: actionType.DELETE_TODO,
    payload: data,
  };
};
