import "../App.css";
import React, { useState } from "react";

interface todoProps {
  _id: string;
  name: string;
  description: string;
  status: boolean;
}

const TodoList: React.FC = () => {
  const URL = process.env.REACT_APP_TODO_LIST_API;
  const initialFormData = {
    name: "",
    description: "",
    status: false,
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [todoArray, setTodoArray] = useState<Array<todoProps>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    fetch(`${URL}add-todo`, options)
      .then((response) => response.json())
      .then((data) => setTodoArray(data.todos))
      .catch((error) => console.error(error));
  };

  const handleClick = async () => {
    try {
      const response = await fetch(`${URL}todos`);
      const data = await response.json();
      setTodoArray(data.todos);
      setOpen(!open);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: todoProps["_id"]): any => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${URL}delete-todo/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        setTodoArray(data.todos);
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = async (
    status: todoProps["status"],
    _id: todoProps["_id"]
  ) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: !status,
        }),
      };

      const response = await fetch(`${URL}edit-todo/${_id}`, options);
      const data = await response.json();
      setTodoArray(data.todos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <button onClick={handleClick}>{open ? "Hide" : "Show"} Todos</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <button type="submit">Submit Todo</button>
      </form>
      <div>
        {Array.isArray(todoArray) && open ? (
          <p>Todos Count: {todoArray.length}</p>
        ) : null}
        {Array.isArray(todoArray) && open
          ? [...(todoArray as Array<todoProps>)].reverse().map((todo): any => (
              <div key={todo._id}>
                <h3>
                  {todo.name} {todo.status ? "(DONE)" : null}
                </h3>
                <p>{todo.description}</p>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
                <button onClick={() => handleUpdate(todo.status, todo._id)}>
                  Update
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default TodoList;
