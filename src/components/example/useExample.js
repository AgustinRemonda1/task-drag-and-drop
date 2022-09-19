import { useCallback, useState } from "react";

const useExample = () => {
  const [text, setText] = useState("this is a example hook");

  const onChangeText = useCallback((newText) => {
    setText(newText);
  }, []);

  return {
    text,
    onChangeText,
  };
};

export default useExample;
