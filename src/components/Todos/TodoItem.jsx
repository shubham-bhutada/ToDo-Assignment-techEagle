import React, { useEffect, useState } from "react";

const TodoItem = ({
  index,
  todo,
  activeTodo,
  onRemove,
  onStart,
  onEnd,
  onResume,
  onPause,
  onShowDetails,
}) => {
  const [time, setTime] = useState(todo.duration);

  useEffect(() => {
    let timer;
    if (todo.status === "Ongoing") {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [todo.status]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (activeTodo) {
      alert("Please pause or end the current activity first.");
      return;
    }
    onStart(todo.id);
  };

  const handleEnd = () => {
    onEnd(todo.id);
  };

  const handleResume = () => {
    if (activeTodo) {
      alert("Please pause or end the current activity first.");
      return;
    }
    onResume(todo.id);
  };

  const handlePause = () => {
    onPause(todo.id);
  };

  const handleShowMore = () => {
    onShowDetails(todo);
  };

  return (
    <tr>
      <td className="border px-4 py-2">{index + 1}</td>
      <td className="border px-4 py-2">{todo.name}</td>
      <td className="border px-4 py-2">{formatTime(time)}</td>
      <td className="border px-4 py-2">
        <div className="flex flex-wrap gap-1 justify-center">
          {todo.status === "Pending" && (
            <button
              onClick={handleStart}
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
            >
              Start
            </button>
          )}
          {todo.status === "Ongoing" && (
            <>
              <button
                onClick={handleEnd}
                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
              >
                End
              </button>
              <button
                onClick={handlePause}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Pause
              </button>
            </>
          )}
          {todo.status === "Paused" && (
            <button
              onClick={handleResume}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Resume
            </button>
          )}
          {todo.status === "Completed" && (
            <button
              onClick={handleShowMore}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              Show Details
            </button>
          )}
          <button
            onClick={() => onRemove(todo.id)}
            className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      </td>
      <td className="border px-4 py-2">{todo.status}</td>
    </tr>
  );
};

export default TodoItem;
