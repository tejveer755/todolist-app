import React from "react";

function Form(props) {


  
          // formBackgroundColor={currentTheme.formBackgroundColor}
          // addBtnBackgroundColor={currentTheme.addBtnBackgroundColor}
          // addBtnTextColor={currentTheme.addBtnTextColor}
  return (
    <form onSubmit={props.addTodo}>
      <input
        style={{
          backgroundColor: props.formBackgroundColor,
          color: props.textColor,
        }}
        type="text"
        value={props.inputValue}
        onChange={props.onChange}
        placeholder="Create a new todo.."
      />
      <button
        style={{
          backgroundColor: props.addBtnBackgroundColor,
          color: props.addBtnTextColor,
        }}
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default Form;
