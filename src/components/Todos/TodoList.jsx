import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  removeTodo,
  startTodo,
  endTodo,
  pauseTodo,
  resumeTodo,
} from "../../features/todos/todoSlice";
import TodoItem from "./TodoItem";
import TodoDetails from "./TodoDetails";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const activeTodo = useSelector((state) => state.todos.activeTodo);
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleAddTodo = () => {
    const name = prompt("Enter todo name");
    if (name) {
      dispatch(addTodo({ name }));
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleStartTodo = (id) => {
    dispatch(startTodo(id));
  };

  const handleEndTodo = (id) => {
    dispatch(endTodo(id));
  };

  const handlePauseTodo = (id) => {
    dispatch(pauseTodo(id));
  };

  const handleResumeTodo = (id) => {
    dispatch(resumeTodo(id));
  };

  const handleShowDetails = (todo) => {
    setSelectedTodo(todo);
  };

  return (
    <div>
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Todo
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Activity Name</th>
            <th className="border px-4 py-2">Duration</th>
            <th className="border px-4 py-2">Actions</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              index={index}
              todo={todo}
              activeTodo={activeTodo}
              onRemove={handleRemoveTodo}
              onStart={handleStartTodo}
              onEnd={handleEndTodo}
              onResume={handleResumeTodo}
              onPause={handlePauseTodo}
              onShowDetails={handleShowDetails}
            />
          ))}
        </tbody>
      </table>
      {selectedTodo && (
        <div className="mt-4 p-4 border rounded">
          <TodoDetails todo={selectedTodo} />
        </div>
      )}
    </div>
  );
};

export default TodoList;
