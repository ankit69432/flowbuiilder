import { useEffect } from "react";

export function useChangeInputType(inputType, setNodes) {
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === localStorage.getItem("id")) {
          node.data = {
            ...node.data,
            inputType: inputType,
          };
        }

        return node;
      })
    );
  }, [inputType, setNodes]);
}
