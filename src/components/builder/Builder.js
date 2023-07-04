import "./builder.css";
import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useDeferredValue,
} from "react";
import ReactFlow, {
  useNodesState,
  applyEdgeChanges,
  addEdge,
  Background,
  MiniMap,
} from "reactflow";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "reactflow/dist/style.css";
import CustomeNode from "../customnode/CustomeNode";
import WelcomeNode from "../welcomenode/WelcomeNode";
import PointedEdge from "../customEdge/PointEdge";
import { useChangeLabel } from "./customHooks/useChangeLabel";
import { useChangeInputType } from "./customHooks/useChangeInputType";
import useUpdateQuestion from "./customHooks/useUpdateQuestion";
import useChoices from "./customHooks/useChoices";
const options = [
  "Talk to sales",
  "Staff augmentation",
  "Project Estimate",
  "Job openings",
  "About Us",
  "Contact to hr",
];

// const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
let count = 0;
function Builder() {
  const [flag, setFlag] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useState([
    {
      id: "0",
      source: "0",
      target: "1",

      type: "pointEdge",
      style: { stroke: "black", strokeWidth: 2 },
    },
    // {
    //   id: "1",
    //   source: "1",
    //   target: "2",

    //   type: "pointEdge",
    //   style: { stroke: "black", strokeWidth: 2 },
    // },
  ]);
  const [label, setLabel] = useState();
  const [text, setText] = useState("");
  const [inputType, setInputType] = useState("");
  const [question, setQuestion] = useState("");
  const [choice, setChoice] = useState([]);
  const [isVisible, setIsVisible] = useState(0);

  const labelValue = useDeferredValue(label);
  const inputValue = useDeferredValue(inputType);
  const questionValue = useDeferredValue(question);
  const [edge, setEdge] = useState();
  const [isInitial, setIsInitial] = useState(false);
  const id = useSelector((state) => state.id);

  useChangeInputType(inputValue, setNodes);
  useUpdateQuestion(questionValue, setNodes);
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === localStorage.getItem("id")) {
          node.data = {
            ...node.data,
            isVisible: true,
          };
        }

        return node;
      })
    );
  }, [isVisible, setNodes]);
  useChangeLabel(labelValue, setNodes);
  useChoices(choice, setNodes);
  const nodeTypes = useMemo(
    () => ({ custom: CustomeNode, welcome: WelcomeNode }),
    []
  );
  useEffect(() => {}, [id]);
  const edgeTypes = useMemo(() => ({ pointEdge: PointedEdge }), []);
  const rootNode = (lbl) => {
    localStorage.setItem("id", 0);
    setNodes([
      {
        id: "0",
        type: "welcome",
        position: { x: 450, y: 30 },
        data: {
          label: "Welcome Node",
          msg: lbl,
          createNode: createNode,
          question: question,
        },
      },
    ]);
  };
  const createNode = (nodeId) => {
    setIsVisible(count);
    console.log(nodeId);

    if (count > 0) {
      setEdge({
        id: "" + count,
        source: nodeId,
        target: Number(count) + 1 + "",
        type: "pointEdge",
        style: { stroke: "black", strokeWidth: 2 },
      });
    }

    console.table({
      id: "" + count,
      source: nodeId + "",
      target: Number(count) + 1 + "",
    });

    let size = localStorage.getItem("id") === "0" ? 150 : 300;
    console.table(edges);
    setNodes((nodes) => [
      ...nodes,
      {
        id: Number(nodes[nodes.length - 1].id) + 1 + "",
        type: "custom",
        position: {
          x: nodes[nodes.length - 1].position.x,
          y: nodes[nodes.length - 1].position.y + size,
        },
        data: {
          label: label,
          createNode: createNode,
          options: [],
          question: question,
          inputType: inputType,
          isVisible: true,
        },
      },
    ]);
    localStorage.setItem("id", ++count);

    document.getElementById("question").value = "";
    document.getElementById("label").value = "";
    console.log(edges);
  };
  //   const onNodesChange = useCallback(
  //     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //     [setNodes]
  //   );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handler = (e) => {
    setInputType(e.target.value);
    if (e.target.value === "text") {
      document.getElementById("text").checked = true;
      document.getElementById("option").checked = false;
    } else {
      document.getElementById("option").checked = true;
      document.getElementById("text").checked = false;
    }
  };
  // console.log(edges);

  useEffect(() => {
    if (!isInitial) {
      if (count > 0) {
        setEdges((edges) => [...edges, edge]);
      }
      console.table(edges);
    } else {
      setIsInitial(false);
    }
  }, [edge]);
  return flag ? (
    <div className="wlcmScreen">
      <div className="innerWlcm">
        <div className="div1">
          <label>Enter the welcome message</label>
          <br />
          <input
            placeholder="Write your  message "
            id="lbl"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setFlag(false);
                rootNode(document.getElementById("lbl").value);
              }
            }}
          ></input>
          <br />
          <button
            onClick={() => {
              setFlag(false);
              rootNode(document.getElementById("lbl").value);
            }}
          >
            Let's start
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="BuilderDiv">
      <div style={{ height: "100%", width: "100%" }} className="FlowScreen">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          edgeTypes={edgeTypes}
        >
          <Background
            variant="dots"
            gap={12}
            size={1}
            style={{ background: "rgb(206, 205, 205)" }}
          />
          <MiniMap
            nodeColor={"#dd33ff"}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
        </ReactFlow>
      </div>
      <div className="LeftBar">
        <div className="top">
          <h3 style={{ color: "white" }}>Selected {id}</h3>
        </div>
        <div className="nodeLabel">
          <input
            id="label"
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label?"
          ></input>
        </div>
        <div className="questions">
          <label>Set the Question</label>
          <input
            id="question"
            placeholder="Question"
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              console.log(document.getElementById("question").visibleX);
            }}
          >
            start building
          </button>
        </div>
        <h2 style={{ color: "white", margin: "5px" }}>Responses-</h2>
        <div className="response">
          <div className="default">
            {options.map((op, i) => {
              return (
                <button
                  className="opBtn"
                  key={i}
                  onClick={() => setChoice(options[i])}
                >
                  {op}
                </button>
              );
            })}
          </div>
          <div className="customResponse">
            <input
              id="textInput"
              onChange={(e) => {
                setText(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  options.push(text);
                  setChoice(text);
                  document.getElementById("textInput").value = "";
                }
              }}
              placeholder="Your own response.."
            />
            <button
              onClick={() => {
                options.push(text);
                setChoice(text);
                document.getElementById("textInput").value = "";
              }}
            >
              Add
            </button>
          </div>
        </div>

        <h2>Input Type -</h2>
        <div className="inputType">
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Choices</label>
                </td>
                <td>
                  <input
                    type="radio"
                    defaultChecked={true}
                    value={"option"}
                    id="option"
                    onClick={(e) => handler(e)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Text</label>
                </td>
                <td>
                  <input
                    type="radio"
                    value={"text"}
                    id="text"
                    onClick={(e) => handler(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Builder;
