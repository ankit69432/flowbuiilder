import "./welcomenode.css";
import { Handle, Position } from "reactflow";
import { useDispatch } from "react-redux";
import { setId } from "../redux/idSlice";

function WelcomeNode({ lable, id, data }) {
  const dispatch = useDispatch();
  function getId() {
    //localStorage.setItem("id", Number(id));
    dispatch(setId(id));
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
            data.createNode(id);
          }}
        >
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}

export default WelcomeNode;
