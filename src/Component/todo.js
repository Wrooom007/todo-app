import React, { useState } from 'react';
import './style.css';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, editTodo } from '../Redux/action/todo';

function Todo(props) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  const onchangehendler = (e) => {
    e.preventDefault();
    if (e.keyCode == 13) {
      if (name.trim() == '') {
        setNameError(true);
      } else {
        if (isEdit) {
          const editPayload = { ...selectedTodo, name: name };
          props.editTodo(editPayload);
        } else {
          const payload = {
            id: new Date().getTime(),
            name: name,
            status: 'uncompleted',
          };
          props.addTodo(payload);
        }
        setName('');
        setIsEdit(false);
        setNameError(false);
        return;
      }
    }
  };

  const deleteTodo = (id) => {
    props.deleteTodo(id);
  };

  const editTodo = (id) => {
    const index = props.todo.findIndex((row) => row.id == id);
    if (index >= 0) {
      const todoData = props.todo[index];
      setName(todoData.name);
      setSelectedTodo(todoData);
      setIsEdit(true);
    }
  };

  const compliteTodo = (id, status) => {
    const index = props.todo.findIndex((row) => row.id == id);
    if (index >= 0) {
      const todoData = props.todo[index];
      const editPayload = { ...todoData, status };
      props.editTodo(editPayload);
    }
  };

  return (
    <div className="container pt-5  main">
      <div className="p-header text-right w-100 pb-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <div className="form-group row m-0">
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                placeholder="Enter task name and tap enter to add"
                onKeyUp={(e) => {
                  onchangehendler(e);
                }}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(false);
                }}
              />
            </div>
          </div>

          <div className="row m-0">
            {isEdit ? <div className="col-6 pt-1 text-left ">Edit mode</div> : null}
            {nameError ? <div className="col-6 pt-1 text-right error">Enter valid task</div> : null}
          </div>
        </form>
      </div>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="t-body">
          {props.todo.length > 0 ? (
            props.todo.map((row, i) => {
              return (
                <tr scope="row" key={`row-${i}`}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.status}</td>
                  <td>
                    {row.status == 'uncompleted' ? (
                      <button
                        className="btn btn-info m-1"
                        onClick={() => compliteTodo(row.id, 'completed')}>
                        Complete
                      </button>
                    ) : (
                      <button
                        className="btn btn-info m-1"
                        onClick={() => compliteTodo(row.id, 'uncompleted')}>
                        Incomplete
                      </button>
                    )}
                    <button className="btn btn-primary m-1" onClick={() => editTodo(row.id)}>
                      Edit
                    </button>
                    <button className="btn btn-danger m-1" onClick={() => deleteTodo(row.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-center" colSpan={4}>
                {' '}
                NO DATA
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    todo: store,
  };
};
const actionDispatchToProps = (dispatch) => {
  return {
    addTodo: (data) => dispatch(addTodo(data)),
    deleteTodo: (data) => dispatch(deleteTodo(data)),
    editTodo: (data) => dispatch(editTodo(data)),
  };
};

export default connect(mapStateToProps, actionDispatchToProps)(Todo);
