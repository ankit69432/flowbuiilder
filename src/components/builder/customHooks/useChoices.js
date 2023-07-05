import { useEffect } from "react";

function useChoices(choice, setNodes) {
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === localStorage.getItem("id")) {
          node.data = {
            ...node.data,
            options: [...node.data.options, choice],
          };
        }

        return node;
      })
    );
  }, [choice, setNodes]);
}
export default useChoices;
