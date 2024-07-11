import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Nav from "./components/Nav";

function App() {
  // Dark mode state and theme
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem("darkMode");
    return storedMode ? JSON.parse(storedMode) : "dark";
  });

  const theme = {
    dark: {
      backgroundColor: "hsl(235, 21%, 11%)",
      backgroundImg: "./images/bg-desktop-dark.jpg",
      switchBtn: "./images/icon-sun.svg",
      todoListBackgroundColor: "#25273c",
      textColor: "hsl(233, 11%, 84%)",
      addBtnBackgroundColor: "#161722",
      addBtnTextColor: "#cacde8",
      formBackgroundColor: "#25273c",
    },
    light: {
      backgroundColor: "white",
      backgroundImg: "./images/bg-desktop-light.jpg",
      switchBtn: "./images/icon-moon.svg",
      todoListBackgroundColor: "white",
      textColor: "hsl(235, 21%, 11%)",
      addBtnBackgroundColor: "#e5e5e5",
      addBtnTextColor: "hsl(235, 21%, 11%)",
      formBackgroundColor: "white",
    },
  };

  const currentTheme = mode === "dark" ? theme.dark : theme.light;

  const changeMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  // Todo state and functions
  const [inputValue, setInputValue] = useState("");

  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todo")) || []
  );

  const [todoCount, setTodoCount] = useState();

  const [filteredTodos, setFilteredTodos] = useState([]);

  const addTodo = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Math.random().toString(36).substr(2, 9),
        body: inputValue.trim(),
        completed: false,
      };
      setTodoList((prevTodos) => [newTodo, ...prevTodos]);
      localStorage.setItem("todo", JSON.stringify([newTodo, ...todoList]));
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  };

  const toggleTodoCompletion = (id) => {
    const updatedTodos = todoList.map((todoItem) =>
      todoItem.id === id
        ? { ...todoItem, completed: !todoItem.completed }
        : todoItem
    );
    setTodoList(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  };

  const clearCompleted = () => {
    const updatedTodos = todoList.filter((todoItem) => !todoItem.completed);
    setTodoList(updatedTodos);
    // setFilteredTodos(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  };

  const todo = filteredTodos.map((todo) => (
    <div key={todo.id} className={` ${todo.completed ? "checked" : ""}`}>
      <div className="todo">
        <div
          className="checkbox"
          style={{
            transition: "background-color 0.3s ease",
            background: todo.completed
              ? "linear-gradient(120deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
              : "transparent",
          }}
          onClick={() => toggleTodoCompletion(todo.id)}
        >
          {todo.completed && (
            <div className="check-icon">
              <img src="./images/icon-check.svg" alt="check" />
            </div>
          )}
        </div>
        <p
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: currentTheme.textColor,
          }}
        >
          {todo.body}
        </p>
        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
          <img src="./images/icon-cross.svg" alt="delete" />
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    const leftTodoCount = todoList.filter((todo) => !todo.completed).length;
    setTodoCount(leftTodoCount);
  }, [todoList]);

  useEffect(() => {
    setFilteredTodos(todoList); // Initial load shows all todos
  }, [todoList]);

  const showAll = () => {
    setFilteredTodos(todoList);
  };

  const showActive = () => {
    const activeTodos = todoList.filter((todo) => !todo.completed);
    setFilteredTodos(activeTodos);
  };

  const showCompleted = () => {
    const completedTodos = todoList.filter((todo) => todo.completed);
    setFilteredTodos(completedTodos);
  };

  return (
    <main style={{ backgroundColor: currentTheme.backgroundColor }}>
      <img className="image" src={currentTheme.backgroundImg} alt="" />
      <div className="container">
        <Header changeMode={changeMode} theme={currentTheme.switchBtn} />

        <Form
          addTodo={addTodo}
          inputValue={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          formBackgroundColor={currentTheme.formBackgroundColor}
          addBtnBackgroundColor={currentTheme.addBtnBackgroundColor}
          addBtnTextColor={currentTheme.addBtnTextColor}
          textColor={currentTheme.textColor}
        />

        <TodoList
          todoList={filteredTodos}
          deleteTodo={deleteTodo}
          todoListBackgroundColor={currentTheme.todoListBackgroundColor}
          textColor={currentTheme.textColor}
          clearCompleted={clearCompleted}
          taskLeftCount={todoCount}
          todo={todo}
        />

        {todoList.length > 0 && (
          <Nav
            backgroundColor={currentTheme.todoListBackgroundColor}
            textColor={currentTheme.textColor}
            showAll={showAll}
            showActive={showActive}
            showCompleted={showCompleted}
            todoList={todoList}
          />
        )}
      </div>
    </main>
  );
}

export default App;
