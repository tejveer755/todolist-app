import React from "react"

const Header= (props) => {
  return (
    <div className="head">
          <h1>TODO</h1>
          <button onClick={props.changeMode}>
            <img src={props.theme} alt="" />
          </button>
        </div>
  )
};

export default Header;
