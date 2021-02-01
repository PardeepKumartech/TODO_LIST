import React, { useState, useEffect } from "react";

function TodoApp() {
  const [task, setTask] = useState("");
  const [updatedTask, setUpdatedTask] = useState("");
  const [indexs, setIndex] = useState(0);
  const [tasklist, setTaskList] = useState([]);
  const [user, setUser] = useState({});
  const [count, setCount] = useState([]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleValueChange = (e) => {
    setTask(e.target.value);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    for (let i = 0; i < tasklist.length; i++) {
      if (tasklist[i].isCompleted) {
        setCount(tasklist[i].isCompleted);
      }
    }
  }, []);

  useEffect(() => {
    let countArray = [];
    for (let i = 0; i < tasklist.length; i++) {
      if (tasklist[i].isCompleted == true) {
        countArray.push(tasklist[i].isCompleted);
        setCount([...count, tasklist[i]]);
      }
    }
    console.log("countArray", countArray);
  }, [tasklist]);

  const AddTask = () => {
    if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
      };
      setTaskList([...tasklist, taskDetails]);
    }
  };

  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(tasklist.filter((t) => t.id != id));
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();

    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id == id);

    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };

    setTaskList(newTaskList);
  };
  const handleClick = () => {
    console.log("Logout");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleSearch = (e) => {
    let matches = tasklist.filter((v) => v.value.includes(e.target.value));
    setTaskList(matches);
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();
    //let's find index of element
    console.log("newTaskList[element]", indexs);
    //copy array into new variable
    const newTaskList = [...tasklist];
    console.log("newTaskList", newTaskList);
    //edit our element
    newTaskList[indexs] = {
      ...newTaskList[indexs],
      value: task,
    };
    console.log("newTaskList[element]", newTaskList[indexs]);

    setTaskList(newTaskList);
  };
  const handleEdit = (e,t, index) => {

    console.log("t",t);
    document.getElementById('updated').value= t;
    console.log("index",index);
    setUpdatedTask(t);
    setIndex(index);
  }

  const onClose = () =>{
    document.getElementById('updated').value= '';
  }
  return (
    <React.Fragment>
      <div className="login-nav py-2">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="media">
                <img
                  src={user.image_url}
                  className="mr-3 user-image rounded-circle"
                  alt="User Image"
                />
                <div className="media-body align-self-center">
                  <h5 className="mt-0">{user.name}</h5>
                </div>
              </div>
            </div>
            <div style={{ cursor: "pointer" }} onClick={handleClick}>
              Logout
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="todo mt-5">
              <div className="row">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="text"
                    className="form-control"
                    id="text"
                    onChange={(e) => handleChange(e)}
                    placeholder="Add task here..."
                  />
                  <button
                    className="add-btn btn btn-primary mt-3"
                    onClick={AddTask}
                  >
                    Add
                  </button>
                </div>
                <div className="col-md-6">
                  <input
                    type="search"
                    placeholder={`Search here`}
                    className="form-control"
                    onChange={(e) => handleSearch(e)}
                  />
                </div>
              </div>
              <br />
              <div className="row mt-3 mb-3">
                <div className="col-md-6">
                  <h5>Task Completed</h5>
                  <p>
                    {" "}
                    {count.length}/{tasklist.length}
                  </p>
                </div>
                <div className="col-md-6">
                  <h5>Last Created Task</h5>
                  <ul>
                    {tasklist.length
                      ? tasklist.map(
                          (task, index) =>
                            index <= 2 && (
                              <li
                                className={`${
                                  task.isCompleted ? "crossText" : "listitem"
                                }`}
                                key={index}
                              >
                                {task.value}
                              </li>
                            )
                        )
                      : ""}
                  </ul>
                </div>
              </div>
              {tasklist.length ? (
                <div className="row mt-3">
                  {tasklist.map((t, index) => (
                    <React.Fragment>
                      <div
                        key={index}
                        className={`col-md-4 mb-3 ${
                          t.isCompleted ? "crossText" : "listitem"
                        }`}
                      >
                        <div className="border p-3">
                          <h4 className="text-capitalize">{t.value}</h4>
                          <button
                            className="completed btn btn-success mr-2"
                            disabled={t.isCompleted}
                            onClick={(e) => taskCompleted(e, t.id)}
                          >
                            {t.isCompleted ? "Completed" : "Complete"}
                          </button>
                          <button
                            className="delete btn btn-danger mr-2"
                            onClick={(e) => deletetask(e, t.id)}
                          >
                            Delete
                          </button>

                          <button
                            className="delete btn btn-info"
                            data-toggle="modal"
                            id={index}
                            data-target="#exampleModal"
                            onClick={(e) => handleEdit(e, t.value,index)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Update Task
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <input
                                type="text"
                                className={'form-control'}
                                id="updated"
                                defaultValue={updatedTask}
                                onChange={(e) => handleValueChange(e)}
                              />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={onClose}
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                id={index}
                                onClick={(e) => handleUpdate(e, t.id)}
                              >
                                Save changes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TodoApp;
