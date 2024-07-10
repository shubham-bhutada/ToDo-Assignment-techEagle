import React from "react";
import TodoList from "../components/Todos/TodoList.jsx";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Your To-Do List</h1>
      <TodoList />
    </div>
  );
};

export default Home;
