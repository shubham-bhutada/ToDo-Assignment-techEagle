import React from "react";

const TodoDetails = ({ todo }) => {
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h3 className="text-xl mb-2">Activity Details</h3>
      <p>
        <strong>Name:</strong> {todo.name}
      </p>
      <p>
        <strong>Start Time:</strong> {new Date(todo.startTime).toLocaleString()}
      </p>
      <p>
        <strong>End Time:</strong> {new Date(todo.endTime).toLocaleString()}
      </p>
      <p>
        <strong>Duration:</strong> {formatTime(todo.duration)}
      </p>
    </div>
  );
};

export default TodoDetails;
