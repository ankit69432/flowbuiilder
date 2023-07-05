import { useEffect } from "react";

export function useChangeLabel(labelValue, setNodes) {
  useEffect(() => {
    const id = localStorage.getItem("id");
    console.log(id);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label: labelValue,
          };
        }

        return node;
      })
    );
  }, [labelValue, setNodes]);
}
