import { useEffect } from "react";
function useUpdateQuestion(question, setNodes) {
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === localStorage.getItem("id")) {
          node.data = {
            ...node.data,
            question: question,
          };
        }

        return node;
      })
    );
  }, [question, setNodes]);
}

export default useUpdateQuestion;
