import "./welcomenode.css";
import { Handle, Position } from "reactflow";

function WelcomeNode({ lable, id, data }) {
  function getId() {
    //localStorage.setItem("id", Number(id));
  }
  return (
    <div onClick={() => getId()} className="welcomeNode">
      <div className="welcomediv1">{data.msg}</div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <hr></hr>
      <div className="divBtn">
        <button
          className="i-btn"
          onClick={() => {
            data.createNode();
          }}
        >
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default WelcomeNode;
