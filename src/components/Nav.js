import React, { useEffect, useState } from "react";

const Nav = (props) => {
  const { todoList } = props;
  const [activeFilter, setActiveFilter] = useState("all");

  const showAll = () => {
    if (todoList.length > 0) {
      props.showAll();
      setActiveFilter("all");
    }
  };

  const showActive = () => {
    if (todoList.length > 0) {
      props.showActive();
      setActiveFilter("active");
    }
  };

  const showCompleted = () => {
    if (todoList.length > 0) {
      props.showCompleted();
      setActiveFilter("completed");
    }
  };

  useEffect(() => {
    // Check if todoList is empty and reset activeFilter to default if true
    if (todoList.length === 0) {
      setActiveFilter("all"); // Reset to default filter
    }
  }, [todoList]);

  return (
    <nav style={{ backgroundColor: props.backgroundColor, color: props.textColor }}>
      <h3
        onClick={showAll}
        style={{
          cursor: todoList.length > 0 ? "pointer" : "default",
          color: activeFilter === "all" ? "blue" : props.textColor,
          transition: "color 0.3s ease",
        }}
      >
        All
      </h3>
      <h3
        onClick={showActive}
        style={{
          cursor: todoList.length > 0 ? "pointer" : "default",
          color: activeFilter === "active" ? "blue" : props.textColor,
          transition: "color 0.3s ease",
        }}
      >
        Active
      </h3>
      <h3
        onClick={showCompleted}
        style={{
          cursor: todoList.length > 0 ? "pointer" : "default",
          color: activeFilter === "completed" ? "blue" : props.textColor,
          transition: "color 0.3s ease",
        }}
      >
        Completed
      </h3>
    </nav>
  );
};

export default Nav;
