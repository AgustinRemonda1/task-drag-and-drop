import { useCallback, useState } from "react";

const useExample = () => {
  const [text, setText] = useState<string>("this is a example hook");

  const onChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  return {
    text,
    onChangeText,
  };
};

export default useExample;
