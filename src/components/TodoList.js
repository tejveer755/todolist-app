import React from "react";

const TodoList = ({
  todoList,
  clearCompleted,
  todoListBackgroundColor,
  textColor,
  taskLeftCount,
  todo,
}) => {
  return (
    <div
      className="content"
      style={{ backgroundColor: todoListBackgroundColor, color: textColor }}
    >
      <div className="todolist">
        {todoList.length > 0 ? todo : <h4>Task list is empty</h4>}
      </div>
      <div className="status">
        <h4>
          {taskLeftCount} {taskLeftCount > 1 ? "tasks" : "task"} left
        </h4>
        <h4 className="clear-completed" onClick={clearCompleted}>
          Clear Completed
        </h4>
      </div>
    </div>
  );
};

export default TodoList;
