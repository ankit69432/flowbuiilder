import React from "react";
import { Handle, Position } from "reactflow";
import "./customeNode.css";

const CustomeNode = ({ data, id }) => {
  const clickHander = (e) => {
    // onNodeClik(id);
    localStorage.setItem("id", id);
    console.log(id);
  };

  return (
    <div className="node" onClick={(e) => clickHander(e)}>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{ background: "#555" }}
        //onConnect={handleConnect}
      />
      <div className="inner">
        <header className="nodeHeader">
          {data.label ? <label>{data.label}</label> : <label>No data</label>}
        </header>
        <hr />
        <div className="qDiv">
          {data.question ? <p>{data.question}</p> : ""}
        </div>
        {data.options.length > 0 ? (
          <div className="options">
            {data.options.map((op, i) => {
              return i % 2 === 0 ? <button key={i}>{op}</button> : "";
            })}
          </div>
        ) : (
          <></>
        )}
        <hr />
        <footer className="responseType">
          <div className="typeDiv">
            {data.inputType ? <label>{data.inputType}</label> : ""}
          </div>
          <div className="addNew">
            {data.isVisible ? (
              <button
                onClick={() => {
                  data.createNode();
                }}
              >
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="optDiv"></div>
        </footer>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default CustomeNode;
